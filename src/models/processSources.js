const fs = require("fs");
const path = require("path");

const resourcesFields = [
  "name",
  "abbreviation",
  "category",
  "rarity",
  "price",
  "ver"
];
const cont = fs
  .readFileSync(path.join(__dirname, "source", "resources.csv"), "utf8")
  .split("\n")
  .map(line =>line.split(",")
  )
  .filter(line => line.length)
  .map( (line,id) =>
    Object.fromEntries(line.map((field, i) => [resourcesFields[i], field]).concat([['id',id]])));

fs.writeFileSync(
  path.join(__dirname, "data","resources.js"),
  "export const resources = " + JSON.stringify(cont, null, 1)
);

let current=null;
let id=0;
const refinery = fs
  .readFileSync(path.join(__dirname, "source", "refiner.csv"), "utf8")
  .split("\n")
  .map(line => line.split(","))
  .filter(line=>line[0])
  .map((line) =>{
    if (line[0]!==current){
      current=line[0];
      id=0
    }
    id++;
    return ({
    id:current+"_ref_"+id,
    result: { name: line[0], amount: Number(line[1]) },
    process: { name: line[3], duration: Number(line[2]) },
    ingredients: line.slice(4,10)
      .reduce((prev, curr, i) => {
          if (!curr)return prev
        const even = i % 2 === 0;
        if (even ) {
            prev.push({name:curr});
        } else {
            prev[prev.length - 1].amount = Number(curr);
        }
        return prev;
      }, [])
  })}
  );
  fs.writeFileSync(
    path.join(__dirname,"data", "refiner.js"),
    "export const refiner = " + JSON.stringify(refinery, null, 1)
  );

  current=null;
  id=0;
  const crafting = fs
    .readFileSync(path.join(__dirname, "source", "crafting.csv"), "utf8")
    .split("\n")
    .map(line => line.split(","))
    .filter(line=>line[0])
    .map((line) =>{
      if (line[0]!==current){
        current=line[0];
        id=0
      }
      id++;
      return ({
      id:current+"_cra_"+id,
      result: { name: line[0], amount:1 },
      process: { name: 'crafting', duration: 0 },
      ingredients: line.slice(4,10)
        .reduce((prev, curr, i) => {
            if (!curr)return prev
          const even = i % 2 === 0;
          if (even ) {
              prev.push({name:curr});
          } else {
              prev[prev.length - 1].amount = Number(curr);
          }
          return prev;
        }, [])
    })}
    );
    fs.writeFileSync(
      path.join(__dirname,"data", "crafting.js"),
      "export const crafting = " + JSON.stringify(crafting, null, 1)
    );
  

