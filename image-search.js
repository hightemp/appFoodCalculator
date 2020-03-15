
const path = requrie('path');

const fs = require('fs');

function fnReadJsonFile(sFilePath)
{
  return JSON.parse(fs.readFileSync(sFilePath).toString());
}

function fnWriteJsonFile(sFilePath, oObject)
{
  fs.writeFileSync(sFilePath, JSON.stringify(oObject));
}

var aArray = fnReadJsonFile("./src/statics/fdb_converted.json");

aArray = aArray.map((v) => v["Food Institute 2009."]);


