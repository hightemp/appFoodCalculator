
const fs = require('fs');
const path = require('path');

const sBuildPath = 'src/assets/product-images-build';
const sBuildFullPath = path.join(__dirname, sBuildPath);

console.log(sBuildFullPath);
var aBuildImagesFiles = fs.readdirSync(sBuildFullPath);

aBuildImagesFiles.forEach((sFilePath) => {
  var sFullFilePath = path.join(sBuildFullPath, sFilePath);
  fs.unlinkSync(sFullFilePath);
});

const sMinPath = 'src/assets/product-images-min';
const sMinFullPath = path.join(__dirname, sMinPath);

console.log(sMinFullPath);
var aMinImagesFiles = fs.readdirSync(sMinFullPath);

aMinImagesFiles.forEach((sFilePath) => {
  var sFullFilePath = path.join(sMinFullPath, sFilePath);
  fs.unlinkSync(sFullFilePath);
});


const sImagesPath = 'src/assets/product-images';
const sImagesFullPath = path.join(__dirname, sImagesPath);

console.log(sImagesFullPath);
var aImagesDirs = fs.readdirSync(sImagesFullPath);
var aImagesToCopy = [];

aImagesDirs.forEach((sPath) => {
  var sFullPath = path.join(sImagesFullPath, sPath);
  var aImagesFiles = fs.readdirSync(sFullPath);
  console.log(sFullPath);

  var iMaxSize = 0;
  var sImagePath = '';

  aImagesFiles.forEach((sImageFileName) => {
    var sImageFullPath = path.join(sFullPath, sImageFileName);
    var iSize = fs.statSync(sImageFullPath).size;
    iMaxSize = Math.max(iMaxSize, iSize);

    if (iSize==iMaxSize) {
      sImagePath = sImageFullPath;
    }
  });

  console.log(sImagePath);
  aImagesToCopy.push(sImagePath);
});

aImagesToCopy.forEach((sFilePath) => {
  var sBaseName = path.basename(sFilePath).replace(/_\d+\./, '.');
  var sNewFilePath = path.join(sBuildPath, sBaseName);
  fs.copyFileSync(sFilePath, sNewFilePath);
});

var compress_images = require('compress-images');
 
var sBuildPathGlob = path.join(sBuildPath, '*.{jpg,JPG,jpeg,JPEG}');

compress_images(
  sBuildPathGlob, 
  sMinPath+'/', 
  {compress_force: true, statistic: false, autoupdate: true}, 
  false,
  {jpg: {engine: 'mozjpeg', command: ['-quality', '50']}},
  {png: {engine: 'pngquant', command: ['--quality=20-50']}},
  {svg: {engine: 'svgo', command: '--multipass'}},
  {gif: {engine: 'gifsicle', command: ['--colors', '64', '--use-col=web']}}, 
  function(error, completed, statistic)
  {
    console.log('-------------');
    console.log(error);
    console.log(completed);
    console.log(statistic);
    console.log('-------------');                                   
  }
);

/*
const imagemin = require('imagemin');
// const imageminJpegtran = require('imagemin-jpegtran');

import imageminJpegtran from 'imagemin-jpegtran'
 
(async () => {
  try {
    const files = await imagemin(['src/assets/product-images-build/*.jpg'], {
      destination: 'src/assets/product-images-min/',
      plugins: [
        imageminJpegtran()
      ]
    });
  } catch (oError) {
    console.log(oError+"");
  }
 
  // console.log(files);
  //=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
})();
*/