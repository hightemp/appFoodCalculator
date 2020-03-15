
const fs = require('fs');

export function fnReadJsonFile(sFilePath: string): any
{
  return JSON.parse(fs.readFileSync(sFilePath).toString());
}

export function fnWriteJsonFile(sFilePath: string, oObject: any)
{
  fs.writeFileSync(sFilePath, JSON.stringify(oObject));
}