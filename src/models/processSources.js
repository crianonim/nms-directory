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
  .map(line =>
    Object.fromEntries(line.map((field, i) => [resourcesFields[i], field]))
  );

fs.writeFileSync(
  path.join(__dirname, "data","resources.js"),
  "export const resources = " + JSON.stringify(cont, null, 1)
);

const refinery = fs
  .readFileSync(path.join(__dirname, "source", "refiner.csv"), "utf8")
  .split("\n")
  .map(line => line.split(","))
  .filter(line=>line[0])
  .map(line => ({
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
  }));
  fs.writeFileSync(
    path.join(__dirname,"data", "refiner.js"),
    "export const refiner = " + JSON.stringify(refinery, null, 1)
  );
