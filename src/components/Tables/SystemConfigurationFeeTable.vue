<template>
  <div style="padding: 1em;">
    <md-table
      v-model="tableData"
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
        </div>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }" :key="item.index">
        <md-table-cell class="tableCell" md-label="Name" style="width: 65%;">{{ item.name.replace(/_/g, ' ') }}</md-table-cell>
        <md-table-cell class="tableCell" md-label="Fee (£)">
          <input id="txtFee" class="dashInput" name="fee" v-model="item.charges" :readonly="!item.cancelButton.show" />
        </md-table-cell>
        <md-table-cell class="tableCell" md-label="Last Updated">{{ item.last_raised }}</md-table-cell>
        <md-table-cell class="tableCell" md-label="Action" style="width: 19%;">
          <md-button @click="isFee(item.index)" class="md-raised md-success" style="color: #FFFFFF !important;">{{ item.editButton.text }}</md-button>&nbsp;
          <md-button v-if="item.cancelButton.show" @click="isCancelFee(item.index)" id="" class="md-raised md-warning" style="color: #FFFFFF !important;">Cancel</md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import { searchForValueInArray, sortArray } from '../Functions/Functions.js'

const { mapFields } = createHelpers({
  getterType: 'getSystemConfigurationField',
  mutationType: 'updateSystemConfigurationField'
})

export default {
  name: 'system-configuration-fee-table',
  props: { },
  data () {
    return {
      tableData: [],
      searchText: null
    }
  },
  computed: {
    ...mapFields([
      'systemConfigFeeData',
      'originalRowDataFee'
    ])
  },
  methods: {
    searchFor (toSearch) {
      let results = searchForValueInArray(toSearch, this.systemConfigFeeData)
      this.updateTableData(results)
    },
    async clearSearch () {
      this.searchText = null
      await this.$store.dispatch('actionGetSystemConfigurationFees')
      this.updateTableData(this.systemConfigFeeData)
    },
    updateTableData (data) {
      data.sort(sortArray)
      let arr = []
      data.forEach(function (item, i) {
        let charge = item.charges
        charge = charge.toFixed(2)

        let obj = {
          index: i,
          id: item.id,
          name: item.name,
          charges: charge,
          last_raised: item.last_raised,
          cancelButton: { show: false },
          editButton: { show: false, text: 'Edit' }
        }
        arr.push(obj)
      })
      this.tableData = arr
    },
    isFee (index) {
      let tableRow = this.tableData[index]
      if (tableRow.editButton.show) {
        let date = new Date()
        let obj = {
          select: {
            name: tableRow.name
          },
          values: {
            charges: parseFloat(tableRow.charges),
            last_raised: ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear()
          }
        }
        if (tableRow.charges !== this.originalRowDataFee) {
          this.$store.dispatch('setSystemConfigurationFee', { obj: obj })
        }
        this.setButtonText(tableRow.editButton, 'Edit')
      } else {
        this.originalRowDataFee = tableRow.charges
        this.setButtonText(tableRow.editButton, 'Save')
      }
      this.setButtonState(tableRow.editButton, tableRow.cancelButton)
    },
    isCancelFee (index) {
      let tableRow = this.tableData[index]
      this.setButtonText(tableRow.editButton, 'Edit')
      this.setButtonState(tableRow.editButton, tableRow.cancelButton)
      tableRow.charges = this.originalRowDataFee
      this.originalRowDataFee = null
    },
    setButtonText (obj, text) {
      obj.text = text
    },
    setButtonState (obj1, obj2) {
      obj1.show = !obj1.show
      obj2.show = obj1.show
    }
  },
  async created () {
    if (this.systemConfigFeeData !== undefined && this.systemConfigFeeData.length < 1) {
      await this.$store.dispatch('actionGetSystemConfigurationFees')
    }
    this.updateTableData(this.systemConfigFeeData)
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
