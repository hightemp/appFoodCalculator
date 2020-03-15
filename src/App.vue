<template>
  <div 
    id="q-app" 
    style="width: 100vw; height: 100vh;"
    class="column"
  >
    <q-table
      class="col sticky-header-column-table full-height"      
      dense
      flat
      square
      row-key="index"
      :table-style="'height:100%; max-width: 100vw; max-height: calc(100vh - 43px)'"
      :filter="sFilterString"
      :rows-per-page-options="[0]"
      :pagination.sync="oPagination"
      :data="aFilteredData"
      :columns="aColumns"
      :selected.sync="aSelected"
      selection="multiple"
      virtual-scroll
      :virtual-scroll-item-size="29"
    />
  </div>
</template>

<style lang="sass">
.q-list--separator > div > .q-item-type + .q-item-type, 
.q-list--separator > .q-virtual-scroll__content > div > .q-item-type + .q-item-type,
.q-list--separator > .q-item-type + div
  border-top: 1px solid rgba(0, 0, 0, 0.12)
.sticky-header-column-table
  .q-table__middle
    max-height: 200px
  td
    background-color: #fff !important
  tr th
    position: sticky
    z-index: 2
    background: #fff
  thead tr:last-child th
    top: 48px
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child, 
  tr:first-child th:nth-child(2)
    z-index: 3
  td:first-child, 
  td:nth-child(2)
    z-index: 1
  td:first-child, th:first-child
    position: sticky
    left: 0px
  td:nth-child(2), th:nth-child(2)
    position: sticky
    left: 44px !important
  td:first-child,
  th:first-child
    padding-left: 5px !important
    padding-right: 20px !important
  td:first-child,
  th:first-child,
  td:nth-child(2), 
  th:nth-child(2)
    box-sizing: content-box
    padding: 0px;
    background-color: #eee !important
  th:first-child,
  th:nth-child(2)
    background-color: #ddd !important
</style>

<script lang="ts">
import Vue from 'vue';
import { Watch } from 'vue-property-decorator';
import { Component, Mixin, Mixins } from 'vue-mixin-decorator';

import Config from './mixins/Config';

const aFDB = require("./statics/fdb_converted.json");

// aFDB.length = 5;

var aColumns: any[] = [];

var aKeys = Object.keys(aFDB[0]);

aKeys.forEach((sItem: string, iIndex: number) => {
  // console.log(sItem);
  var oColumn = {
    name: sItem,
    label: sItem,
    align: 'left',
    field: (row: any) => { return row[sItem] },
    format: (val: any) => {
      return JSON.stringify(val);
      return iIndex ? parseFloat((val+'').replace(',', '.')) : val 
    },
    sortable: true
  };

  aColumns.push(oColumn);
})

// Create an interface extending the mixins to provide
interface IMixinInterface extends Config {}

@Component
export default class App extends Mixins<IMixinInterface>(Config) 
{
  aColumns: any[] = []
  aData: any[] = []

  sFilterString: string = ""
  // aFilteredData: any[] = []
  aSelected: any[] = []
  oPagination: any = { rowsPerPage: 0 }
  iRowCount: number = 100000

  @Watch('aSelected')
  fnOn_aSelected_change(mNewValue, mOldValue)
  {
    console.log('aSelected', {mNewValue, mOldValue});
  }

  get aFilteredData()
  {
    var oThis = this;

    if (!oThis.sFilterString) {
      return oThis.aData;
    }

    return oThis.aData.filter((oItem) => {
      return Object.values(oItem).some((v: any) => ~v.indexOf(oThis.sFilterString));
    });
  }

  created()
  {
    var oThis = this;

    Vue.set(oThis, 'aSelected', []);
    Vue.set(oThis, 'aData', aFDB);
    Vue.set(oThis, 'aColumns', aColumns);
  }

}
</script>
