
const path = require('path');

const fs = require('fs');

function fnReadJsonFile(sFilePath)
{
  return JSON.parse(fs.readFileSync(sFilePath).toString());
}

function fnWriteJsonFile(sFilePath, oObject)
{
  fs.writeFileSync(sFilePath, JSON.stringify(oObject));
}

const { exec, execSync } = require('child_process');

const sImagesPath = "./src/assets/product-images/";

const iTimeout = 60000;

// var aItems = [];

async function fnDownload(sSearchString)
{
  return new Promise((fnSuccess, fnFail) => {
    // sSearchString = sSearchString.replace(/[,()`.%-/+"<']/g, " ");
    sSearchString = sSearchString.replace(/[,()`/+"<'-]/g, " ");

    var sDirPath = path.join(__dirname, sImagesPath);
    sDirPath = path.join(sDirPath, sSearchString);
  
    if (fs.existsSync(sDirPath)) {
      fnSuccess();
      return;
    }

    var iTimerIndex = setTimeout(() => {
      fnFail("Timeout");
    }, iTimeout);

    var iDotsTimerIndex = null;

    function fnDots() {
      // console.log('.');
      process.stdout.write(".");
      iDotsTimerIndex = setTimeout(fnDots, 1000);
    }

    fnDots();
    
    exec(
      `img-dataset --nb=10 --types=jpg --search="${sSearchString}" --location=${sImagesPath}`,
      (oError) => {
        clearTimeout(iDotsTimerIndex);
        clearTimeout(iTimerIndex);
        process.stdout.write("\n");

        if (oError) {
          fnFail(oError);
          return;
        }

        fnSuccess();
      }
    );  
  });
}

async function fnStart()
{
  var aArray = fnReadJsonFile("./src/statics/fdb_converted.json");

  aArray = aArray.map((v) => v["Food Institute 2009."]);
  
  for (var iIndex in aArray) {
    var sSearchString = aArray[iIndex];
    // aItems = aItems.concat(sItem.replace(/[\w\s]/g, "").split(''));
    
    console.log(iIndex, sSearchString);

    try {
      await fnDownload(sSearchString);
    } catch (oError) {
      console.log(`[E] ${iIndex} ${sSearchString} ${oError}`);
    }
  };
}

fnStart();

// var oSet = new Set(aItems);

// console.log(Array.from(oSet).join(''));