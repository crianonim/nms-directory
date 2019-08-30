const fs = require("fs");
const path = require("path");
const crafting = fs
  .readFileSync('raw/crafting', "utf8")
  .split("\n")
  .map(line =>line.trim() )
  .map(line=>line.replace(/^.*png\s/,""))
  .map(line=>line.replace(/\s-\s/,",,,,"))
  .map(line=>line.replace(/\sx\s/g,","))
  .map(line=>line.replace(/\s\+\s/g,","))
  .map(line=>line.replace(/[()]/g,""))


  .join('\n')
  
  console.log(crafting)
 // RENDER.SHIELDMOD.png Ablative Armour - (Gold x 100 + Sodium Nitrate x 50 + Wiring Loom x 1)