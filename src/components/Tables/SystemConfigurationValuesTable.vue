<template>
  <div style="padding: 1em;">
    <div class="md-layout">
      <div class="md-layout-item md-small-size-100 md-size-20">
        <md-field>
          <label>Operational Value Type</label>
          <md-select v-model="systemConfigValuesDdl" @md-selected="getData(true)" md-dense>
            <md-option v-for="val in localDdlOperationalValueType" v-bind:key="val.id" v-bind:value="val.id" style="padding:0.4em 0 0 1em;">{{val.value}}</md-option>
          </md-select>
        </md-field>
      </div>
    </div>
    <md-table
      v-model="tableData"
      v-if="systemConfigValuesData.length > 0"
      style="flex-direction: row !important; margin-top: 1em; padding: 0 1em 0 1em;"
      md-card>
      <md-table-toolbar>
        <div style="width: 25%;">
          <md-field class="md-toolbar-section-end">
            <md-input placeholder="Search..." v-model="searchText" @input="searchFor" />
          </md-field>
        </div>
        <div style="margin-left: 1.5vw;">
          <md-button class="md-dense md-raised md-simple" @click="clearSearch">Clear</md-button>
          <md-button v-if="systemConfigValuesDdl !== 'parish'" class="md-dense md-raised md-success" @click="showAddModal" style="margin-left: 1em;">Add</md-button>
        </div>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }" :key="item.index">
        <md-table-cell class="tableCell" md-label="Value" style="width: 83%;">
          <input id="txtValue" class="dashInput" name="fee" v-model="item.value" :readonly="!item.cancelButton.show" style="padding-left: 5px;" />
        </md-table-cell>
        <md-table-cell class="tableCell" md-label="Action" style="width: 17%;">
          <md-button @click="isUpdate(item.index)" class="md-raised md-success" style="color: #FFFFFF !important;">{{ item.editButton.text }}</md-button>&nbsp;
          <md-button v-if="item.cancelButton.show" @click="isCancel(item.index)" id="" class="md-raised md-warning" style="color: #FFFFFF !important;">Cancel</md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'

import { ddlOperationalValueType } from '../Functions/DropDownLists.js'
import { searchForValueInArray, sortArrayByValue } from '../Functions/Functions.js'

const { mapFields } = createHelpers({
  getterType: 'getSystemConfigurationField',
  mutationType: 'updateSystemConfigurationField'
})

export default {
  name: 'system-configuration-values-table',
  components: {
  },
  data () {
    return {
      tableData: [],
      searchText: null,
      localDdlOperationalValueType: ddlOperationalValueType(),
      showModal: false
    }
  },
  computed: {
    ...mapFields([
      'systemConfigValuesDdl',
      'systemConfigValuesData',
      'originalRowDataValue'
    ])
  },
  methods: {
    async getData () {
      await this.$store.dispatch('actionGetSystemConfigurationValues')
      this.updateTableData(this.systemConfigValuesData)
    },
    searchFor (toSearch) {
      let results = searchForValueInArray(toSearch, this.systemConfigValuesData)
      this.updateTableData(results)
    },
    async clearSearch () {
      this.searchText = null
      await this.$store.dispatch('actionGetSystemConfigurationValues')
      this.updateTableData(this.systemConfigValuesData)
    },
    showAddModal () {
      this.showModal = this.$store.dispatch('setShowSystemConfigValueAddModal')
    },
    updateTableData (data) {
      data.sort(sortArrayByValue)
      let arr = []
      data.forEach(function (item, i) {
        let obj = {
          index: i,
          value: item.value,
          cancelButton: { show: false },
          editButton: { show: false, text: 'Edit' }
        }
        arr.push(obj)
      })
      this.tableData = arr
    },
    isUpdate (index) {
      let tableRow = this.tableData[index]
      if (tableRow.editButton.show) {
        if (tableRow.value !== this.originalRowDataValue) {
          this.$store.dispatch('setSystemConfigurationValue', { oldValue: this.originalRowDataValue, newValue: tableRow.value })
        }
        this.setButtonText(tableRow.editButton, 'Edit')
      } else {
        this.originalRowDataValue = tableRow.value
        this.setButtonText(tableRow.editButton, 'Save')
      }
      this.setButtonState(tableRow.editButton, tableRow.cancelButton)
    },
    isCancel (index) {
      let tableRow = this.tableData[index]
      this.setButtonText(tableRow.editButton, 'Edit')
      this.setButtonState(tableRow.editButton, tableRow.cancelButton)
      tableRow.value = this.originalRowDataValue
      this.originalRowDataValue = null
    },
    setButtonText (obj, text) {
      obj.text = text
    },
    setButtonState (obj1, obj2) {
      obj1.show = !obj1.show
      obj2.show = obj1.show
    }
  }
}
</script>

<style>
  input.dashInput {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-size: 14px !important;
    line-height: 1.5em;
    text-shadow: 0 0 0 #000000;
    resize: none;
    border-radius: 5px;
    border: 1px solid #e8e8e8;
    color: #35495e;
    /*width: 4.5em;*/
    text-align: left;
  }
  td.tableCell {
    vertical-align: middle !important;
  }
</style>
