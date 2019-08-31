const fetch = require("node-fetch");
const base = "https://nomanssky.gamepedia.com/";
const fs = require("fs");
const path = require("path");
const parser = require("node-html-parser");

const normalizeName = name => name.replace(/\s/g, "_");

const download = async name => {
  const n = normalizeName(name);
  const result = await fetch(base + n);
  const text = await result.text();
  fs.writeFileSync(path.join(__dirname, "data","html", n), text);
  return text;
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
  fetch(img).then(res =>
    res.body.pipe(fs.createWriteStream(path.join(__dirname,"data","img", name + ".png")))
  );
  const rows = table.querySelectorAll("tr");
  try{

      const category = rows[2].querySelector("td").childNodes[0].rawText.trim();
      
      const type = rows[3].querySelector("td").childNodes[0].rawText.trim();
      const rarity = rows[4].querySelector("td").childNodes[0].rawText.trim();
  const value = rows[5].querySelector("td").childNodes[0].rawText.trim();
  const used = rows[6].querySelector("td").childNodes[0].rawText.trim();
  const symbol = rows[7].querySelector("td").childNodes[0].rawText.trim();
  const release = rows[8].querySelector("td").childNodes[0].rawText.trim();
  const data={name,category,type,rarity,value,used,symbol,release}
  fs.writeFileSync(path.join(__dirname, "data","json", name+".json"), JSON.stringify(data,null,2));
} catch(e){
 console.error(e)
}
  
};
const scrape=async (name)=>{
    let text=await download(name);
    text=extractInfobox(text);
    process(text,name);
}


module.exports = { download, extractInfobox, process,scrape };
