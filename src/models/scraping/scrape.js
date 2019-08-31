const fetch = require("node-fetch");
const base = "https://nomanssky.gamepedia.com/";
const fs = require("fs");
const path = require("path");
const parser = require("node-html-parser");
let downloadCount = 0
const normalizeName = name => name.replace(/\s/g, "_");

const download = async (name, force) => {
  const n = normalizeName(name);
  const htmlFilePath = path.join(__dirname, "data", "html", n);
  return new Promise((resolve, reject) => {
    fs.readFile(htmlFilePath, "utf8", async (err, text) => {
      if (err) {
        console.log("Download", htmlFilePath,++downloadCount);
        const result = await fetch(base + n);
        text = await result.text();
        fs.writeFileSync(htmlFilePath, text);
      } else {
        console.log("File", htmlFilePath, "exists");
      }
      resolve(text);
    });
  });
};
const extractInfobox = text => {
  const beginning = text.indexOf(`<table class="infoboxtable">`);
  const end = text.indexOf(`</table>`, beginning);
  return text.slice(beginning, end + 8);
};
const process = (text, name) => {
  name = normalizeName(name);
  const table = parser.parse(text);
  const img = table.querySelector("a.image img").attributes.src;
  const imgPath = path.join(__dirname, "data", "img", name + ".png");
  if (fs.existsSync(imgPath)) {
    console.log("Image", imgPath, "exists");
  } else {
      console.log("Download image",imgPath)
    fetch(img).then(res => res.body.pipe(fs.createWriteStream(imgPath)));
  }
  const rows = table.querySelectorAll("tr");
  const data = {};
  try {
    rows.slice(0).forEach((row, i) => {
      // console.log(row)
      const keyEl = row.querySelector("th");
      let key;
      if (keyEl) {
        key = keyEl.childNodes[0].rawText.trim();
      } else {
        key = row;
      }
      const valueEl = row.querySelector("td");
      let value;
      if (valueEl) {
        value = valueEl.childNodes[0].rawText.trim();
      } else {
        value = "";
      }
      data[key] = value;
    });
  } catch (e) {
    console.error(e);
  }
  fs.writeFileSync(
    path.join(__dirname, "data", "json", name + ".json"),
    JSON.stringify(data, null, 2)
  );
};
const scrape = async name => {
  let text = await download(name);
  text = extractInfobox(text);
  process(text, name);
};

const createResourceFile=()=>{
  let result=[]
  const files=fs.readdirSync(path.join(__dirname,'data','json'));
  let counter=files.length;
  
  files.forEach(fileName=>{
    const fileNamePath=path.join(__dirname,"data","json",fileName)
    fs.readFile(fileNamePath,'utf8',(err,contents)=>{
      if (err){
        console.log(err)
      }
      const fileData=JSON.parse(contents);
      const dataObj={
        name:fileName.split('.')[0].replace(/_/g,' ')
      }
      const keys=Object.keys(fileData);
      keys.forEach(key=>{
        if (key.toLowerCase().includes('value')){
          dataObj.price=Number(fileData[key].split('.')[0].replace(",",""))
        }    
        if (key.toLowerCase()==='category'){
          dataObj.category=fileData[key];
        }
        if (key.toLowerCase()==='type'){
          dataObj.type=fileData[key];
        }
        if (key.toLowerCase()==='rarity'){
          dataObj.rarity=fileData[key];
        }
        if (key.toLowerCase()==='symbol'){
          dataObj.abbreviation=fileData[key];
        }
        if (key.toLowerCase()==='used for'){
          dataObj.usedFor=fileData[key];
        }
      })
      

      result.push(dataObj)
      counter--;
      if (counter===0){
        console.log(`export const resources = `+JSON.stringify(result,null,1));
      }

    })
  })
}

module.exports = { download, extractInfobox, process, scrape, createResourceFile };
