 node rawCrafting.js | sort | uniq > source/crafting2.csv 
 cat source/crafting1.csv source/crafting2.csv | sort | uniq > source/crafting.csv
 npm run process_models