
import Vue from 'vue';
import { Component, Mixin, Mixins } from 'vue-mixin-decorator';

import { remote } from 'electron'

import { fnReadJsonFile, fnWriteJsonFile } from '../lib/utils';

const path = require('path');
const fs = require('fs');

const sApplicationName = 'appFoodClaculator';
const sHomePath = require('os').homedir();
const sConfigFilePath = path.join(sHomePath, `.${sApplicationName}.config.json`);

@Mixin
export default class Config extends Vue {

  sApplicationName: string = sApplicationName
  
  oConfig: any = {

  }

  fnLoadConfig()
  {
    var oThis = this;

    if (!fs.existsSync(sConfigFilePath)) {
      oThis.fnSaveConfig();
    } else {
      Vue.set(oThis, 'oConfig', fnReadJsonFile(sConfigFilePath));
    }
  }

  fnSaveConfig()
  {
    var oThis = this;
    
    fnWriteJsonFile(sConfigFilePath, oThis.oConfig);
  }

}