<template>
  <div style="margin-left: auto; margin-right: auto; width: 98%;">
    <md-card>
      <md-card-content>
        <div class="md-layout-item md-small-size-100 md-size-20" style="margin-left: 1em; float: left;">
          <md-field>
            <label>Registration No. Type</label>
            <md-select v-model="vehicleRegistrationNoType" @md-selected="getData(true)" md-dense>
              <md-option
                style="padding:0.4em 0 0 1em;"
                v-for="item in localDdlRegNoClassification"
                v-bind:key="item.id"
                v-bind:value="item.id">{{item.value}}</md-option>
            </md-select>
          </md-field>
        </div>
        <div style="margin-left: 1em; float: right; margin-top: 1em;">
          <div v-if="regNoAllocationData.length > 0">
            <md-button class="md-dense md-raised md-default" v-on:click="exportData(false)">Export Filtered</md-button>
            <md-button class="md-dense md-raised md-default" v-on:click="exportData(true)" style="margin-left: 1em;">Export All</md-button>
          </div>
        </div>
        <md-table v-model="tableData" v-if="regNoAllocationData.length > 0" :table-header-color="tableHeaderColor" style="flex-direction: row !important; margin-top: 1em; padding: 0 1em 0 1em; border: none !important;" md-card>
          <md-table-toolbar>
            <div style="width: 25%;">
              <md-field class="md-toolbar-section-end">
                <md-input placeholder="Search..." v-model="searchText" @input="searchFor" />
              </md-field>
            </div>
            <div style="margin-left: 1.5vw;">
              <md-button class="md-dense md-raised md-simple" @click="clearSearch">Clear</md-button>
              <md-button class="md-dense md-raised md-default" v-on:click="paging(false)" :disabled="this.vehicleRegistrationNoViewPage === 0" style="margin-left: 1em;">Prev</md-button>
              <md-button class="md-dense md-raised md-default" v-on:click="paging(true)" :disabled="tableData.length < vehicleRegistrationNoViewCount" style="margin: 0 1em 0 1em;">Next</md-button>
              {{vehicleRegistrationNoViewPage + 1}} /
              <select v-model="vehicleRegistrationNoViewCount" class="form-control dashInput tableRowCountDdl" @change="getData(false)" style="text-align-last:center; padding: 0.5em;">
                <option v-for="val in ddlRowCount" v-bind:key="val" :value="val">{{val}}</option>
              </select>
            </div>
          </md-table-toolbar>
          <md-table-row slot="md-table-row" slot-scope="{ item }" :key="item.index" style="text-align: left;">
            <md-table-cell md-label="Registration No.">{{ item.regNo }}</md-table-cell>
            <md-table-cell md-label="Date First Registered">{{ item.firstRegistered  }}</md-table-cell>
            <md-table-cell v-if="vehicleRegistrationNoType === 'HELD'" md-label="Retained Months" md-alignment-top-center>{{ monthDifference(item.firstRegistered) }}</md-table-cell>
            <!--<md-table-cell md-label="Action">-->
              <!--<md-button @click="isEdit(item.index)" class="md-raised md-success" style="color: #FFFFFF !important;">{{ item.editButton.text }}</md-button>&nbsp;-->
              <!--<md-button v-if="item.cancelButton.show" @click="isCancelEdit(item.index)" id="" class="md-raised md-warning" style="color: #FFFFFF !important;">Cancel</md-button>-->
            <!--</md-table-cell>-->
          </md-table-row>
        </md-table>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import { searchForValueInArray, sortArray, downloadCSV, monthDiff } from '../Functions/Functions.js'
import { ddlRegNoClassification } from '../Functions/DropDownLists.js'

const { mapFields } = createHelpers({
  getterType: 'getRegistrationNoField',
  mutationType: 'updateRegistrationNoField'
})

export default {
  name: 'registration-no-by-type-table',
  props: {
    tableHeaderColor: { type: String, default: '' }
  },
  data () {
    return {
      tableData: [],
      ddlRowCount: [ '50', '100', '250', '500', '1000' ],
      localDdlRegNoClassification: ddlRegNoClassification(),
      searchText: null
    }
  },
  computed: {
    ...mapFields([
      'regNoAllocationData',
      'regNoAllExportData',
      'search.vehicleRegistrationNoType',
      'search.vehicleRegistrationNo',
      'search.vehicleRegistrationNoViewCount',
      'search.vehicleRegistrationNoViewPage'
    ])
  },
  methods: {
    async getData (isClassificationChange) {
      if (this.vehicleRegistrationNoType !== null) {
        if (isClassificationChange) {
          this.vehicleRegistrationNoViewPage = 0
          this.vehicleRegistrationNoViewCount = 50
        }
        await this.$store.dispatch('getRegistrationNoByTypeData')
        this.updateTableData(this.regNoAllocationData)
      }
    },
    searchFor (toSearch) {
      let results = searchForValueInArray(toSearch, this.regNoAllocationData)
      this.updateTableData(results)
    },
    clearSearch () {
      this.searchText = null
      this.updateTableData(this.regNoAllocationData)
    },
    async paging (isNext) {
      if (isNext) {
        this.vehicleRegistrationNoViewPage = this.vehicleRegistrationNoViewPage + 1
      } else {
        this.vehicleRegistrationNoViewPage = this.vehicleRegistrationNoViewPage - 1
      }
      await this.$store.dispatch('getRegistrationNoByTypeData')
      this.updateTableData(this.regNoAllocationData)
    },
    monthDifference (rowDate) {
      let arr = rowDate.split('/')
      return monthDiff(new Date(), new Date(arr[2], (arr[1] - 1), arr[0]))
    },
    updateTableData (data) {
      if (data[0] !== undefined) {
        data.sort(sortArray)
        let arr = []
        data.forEach(function (item, i) {
          let obj = {
            index: i,
            id: item.registrationId,
            regNo: item.registrationnumber,
            firstRegistered: item.timestamp === null ? 'N/A' : new Date(item.timestamp).toLocaleDateString('en-GB'),
            owner: item.owner_docuuid,
            cancelButton: { show: false },
            editButton: { show: false, text: 'Edit' }
          }
          arr.push(obj)
        })
        this.tableData = arr.slice(0, this.vehicleRegistrationNoViewCount)
      }
    },
    isEdit (index) {
      let tableRow = this.tableData[index]
      if (tableRow.editButton.show) {
        let date = new Date()
        let obj = {
          name: tableRow.name,
          charges: parseFloat(tableRow.charges),
          last_raised: ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear()
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
    isCancelEdit (index) {
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
    },
    async exportData (isAllData) {
      let filename = isAllData ? 'Export_All_RegNo_' : 'Export_Filtered_RegNo_'
      if (isAllData) {
        await this.$store.dispatch('getRegistrationNoAllByTypeData')
      }
      downloadCSV({ filename: filename + new Date().toLocaleDateString('en-GB') + '.csv', dataArray: isAllData ? this.regNoAllExportData : this.tableData })
      this.regNoAllExportData = []
    }
  },
  watch: {
    vehicleRegistrationNoViewCount () {
      this.searchFor(this.searchText)
    }
  },
  mounted () {
    this.$store.dispatch('resetRegistrationNo')
  },
  destroyed () {
    this.$store.dispatch('resetRegistrationNo')
  }
}
</script>

<style>
  select.tableRowCountDdl {
    margin: -2px 1em 0 0;
    border: 1px solid #acacac !important;
    border-radius: 5px !important;
    text-align: center;
  }
</style>
