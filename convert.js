
const fs = require('fs');

function fnReadJsonFile(sFilePath)
{
  return JSON.parse(fs.readFileSync(sFilePath).toString());
}

function fnWriteJsonFile(sFilePath, oObject)
{
  fs.writeFileSync(sFilePath, JSON.stringify(oObject));
}

var aArray = fnReadJsonFile("./src/statics/fdb.json");

aArray = aArray.slice(1);

aArray = aArray.map((oItem) => {
  for (var sKey in oItem) {
    if ("Food Institute 2009." == sKey) {

    } else {
      if (!oItem[sKey]) {
        oItem[sKey] = 0.0;
      } else {
        oItem[sKey] = parseFloat((oItem[sKey]+"").replace(",", "."));
      }
    }
  }
  return oItem;
});

fnWriteJsonFile("./src/statics/fdb_converted.json", aArray);