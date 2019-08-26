const fs=require('fs')
const path=require('path')

const resourcesFields=['Name','Abbrev','Category','Rarity','Price','Ver']
const cont=fs.readFileSync(path.join(__dirname,'raw','resources.txt'),'utf8')
.split('\n')
.filter(line=>line!=='|-')
.map(line=>line.split('||').slice(1).map(s=>s.trim().replace(/[[\]]*/g,'')))
.filter(line=>line.length)
.map(line=>Object.fromEntries(line.map((field,i)=>[resourcesFields[i],field])))
fs.writeFileSync(path.join(__dirname,'resources.js'), 'export const resources = '+JSON.stringify(cont,null,1))