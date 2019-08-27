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
  .readFileSync(path.join(__dirname, "raw", "resources.txt"), "utf8")
  .split("\n")
  .filter(line => line !== "|-")
  .map(line =>
    line
      .split("||")
      .slice(1)
      .map(s => s.trim().replace(/[[\]]*/g, "")).join(',')
  )
  .filter(line => line.length).sort().join('\n')
  

fs.writeFileSync(
  path.join(__dirname, "source","resources.csv"),cont
  
);

const refinery = fs
  .readFileSync(path.join(__dirname, "raw", "refinery.csv"), "utf8")
  .split("\n")
  .map(line => line.split(",").slice(2))
  .filter(line=>line[0])
  .map(line =>  [
      line[0],line[1],line[4],line[3],line[5],line[6],line[7],line[8],line[9],line[10]].join(',')).sort().join('\n');
  fs.writeFileSync(
    path.join(__dirname, "source","refiner.csv"),
   refinery
  );
