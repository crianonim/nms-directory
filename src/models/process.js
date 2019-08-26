const fs = require("fs");
const path = require("path");

const resourcesFields = [
  "Name",
  "Abbrev",
  "Category",
  "Rarity",
  "Price",
  "Ver"
];
const cont = fs
  .readFileSync(path.join(__dirname, "raw", "resources.txt"), "utf8")
  .split("\n")
  .filter(line => line !== "|-")
  .map(line =>
    line
      .split("||")
      .slice(1)
      .map(s => s.trim().replace(/[[\]]*/g, ""))
  )
  .filter(line => line.length)
  .map(line =>
    Object.fromEntries(line.map((field, i) => [resourcesFields[i], field]))
  );
fs.writeFileSync(
  path.join(__dirname, "resources.js"),
  "export const resources = " + JSON.stringify(cont, null, 1)
);

const refinery = fs
  .readFileSync(path.join(__dirname, "raw", "refinery.csv"), "utf8")
  .split("\n")
  .map(line => line.split(",").slice(2))
  .map(line => ({
    result: { name: line[0], amount: Number(line[1]) },
    process: { name: line[4], duration: Number(line[3]) },
    ingredients: line.slice(5,11)
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
  }));
  fs.writeFileSync(
    path.join(__dirname, "refiner.js"),
    "export const refiner = " + JSON.stringify(refinery, null, 1)
  );
