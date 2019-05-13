<template>
  <div>
    <md-dialog-confirm
      :md-active.sync="isActive"
      md-title="Confirm Status Update"
      :md-content="popupText"
      md-confirm-text="Confirm"
      md-cancel-text="Cancel"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />
    <div>
      <div class="searchInFlightTextBox">
        <md-field class="md-toolbar-section-end">
          <md-input placeholder="Search..." v-model="searchText" @input="searchFor" />
        </md-field>
      </div>
      <div class="searchInFlightClearButton">
        <md-checkbox v-model="showStuckInFlight">Show Incomplete</md-checkbox>
        <md-button class="md-dense md-raised md-simple" @click="clearSearch">Clear</md-button>
      </div>
    </div>
    <table class="table vrsTable" cellspacing="0" id="firstTable">
      <thead>
      <tr style="color: #f57c00;">
        <th class="text-left dashboard sortHover" width="15%" @click="sort('prev_reg_no')">Reg No.</th>
        <th class="text-left dashboard" width="30%">Owner</th>
        <th class="text-left dashboard sortHover" width="25%" @click="sort('make')">Make</th>
        <th class="text-left dashboard sortHover" width="25%" @click="sort('model')">Models</th>
        <th class="text-left dashboard sortHover" width="5%">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr class="highlightHover" v-for="item in sortedList" :value="item._id" :key="item._id">
        <td class="text-left dashboardRow">{{ item.prev_reg_no }}</td>
        <td class="text-left dashboardRow">{{ concatName(item.title, item.forenames, item.surname) }}</td>
        <td class="text-left dashboardRow">{{ item.make }}</td>
        <td class="text-left dashboardRow">{{ item.model }}</td>
        <td class="text-left dashboardRow">
          <select v-bind:id="'ddl' + item.docUUID" class="form-control dashInput2" @change="onSelected($event, item.docUUID, item.registration_number)">
            <option v-for="(key, val) in ddlStatus" v-bind:key="key" :value="key">{{val}}</option>
          </select>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import * as functions from '../Functions/Functions.js'
import { updateVrsApplicationApi } from '../../api/vrsApi'

const { mapFields } = createHelpers({
  getterType: 'getDashPermitField',
  mutationType: 'updateDashPermitField'
})

export default {
  name: 'maha-inflight-table',
  props: {
    tableHeaderColor: {
      type: String,
      default: ''
    },
    defaultCount: Number
  },
  components: {},
  data () {
    return {
      tableData: [],
      searchText: null,
      ddlStatus: {
        'Please Select': '',
        'Activate': 'Active'
      },
      isActive: false,
      selectedStatus: null,
      selectedDocUUID: null,
      selectedRegNo: null
    }
  },
  computed: {
    ...mapFields([
      'vrsInFlightApplications',
      'showStuckInFlight'
    ]),
    sortedList: function () {
      let array = this.tableData
      return array.sort((a, b) => {
        let modifier = 1
        if (this.currentSortDir === 'desc') {
          modifier = -1
        }
        if (a[this.currentSort] < b[this.currentSort]) {
          return -1 * modifier
        }
        if (a[this.currentSort] > b[this.currentSort]) {
          return 1 * modifier
        }
        return 0
      })
    },
    popupText: function () {
      return this.getPopupText()
    },
    filteredData: function () {
      return this.vrsInFlightApplications.slice(0, this.defaultCount)
    }
  },
  methods: {
    onSelected (event, docUUID, vehicleRegistration) {
      if (event.target.value !== '') {
        this.setVariableValues(event.target.value, docUUID, vehicleRegistration, true)
      }
    },
    async onConfirm () {
      let obj = {
        status: this.selectedStatus,
        docUUID: this.selectedDocUUID
      }
      let response = await updateVrsApplicationApi(obj)
      if (response) {
        await this.$store.dispatch('actionVrsInFlightApplications')
        this.setVariableValues(null, null, null, false)
      }
    },
    onCancel () {
      this.setVariableValues(null, null, null, false)
    },
    setVariableValues (value, docUUID, vehicleRegistration, isActive) {
      this.selectedStatus = value
      this.selectedDocUUID = docUUID
      this.selectedRegNo = vehicleRegistration
      this.isActive = isActive
    },
    getPopupText () {
      return 'Are you sure you want to update the \'Change of Ownership\' of vehicle with registration \'' + this.selectedRegNo + '\' to the status of \'' + this.selectedStatus + '\''
    },
    filterData (output) {
      this.tableData = output.slice(0, this.defaultCount)
    },
    async clearSearch () {
      this.searchText = null
      await this.$store.dispatch('actionVrsInFlightApplications')
      this.filterData(this.vrsInFlightApplications)
    },
    searchFor (toSearch) {
      let results = functions.searchForValueInArray(toSearch, this.vrsInFlightApplications)
      this.filterData(results)
    },
    convertStatus (status) {
      return functions.convertStatus(status)
    },
    concatName (title, forenames, surname) {
      return functions.concatValues([title, forenames, surname], false)
    }
  },
  async mounted () {
    if (this.vrsInFlightApplications.length < 1) {
      await this.$store.dispatch('actionVrsInFlightApplications')
    }
    this.filterData(this.vrsInFlightApplications)
  },
  watch: {
    defaultCount: function () {
      this.searchText = null
      this.filterData(this.vrsInFlightApplications)
    },
    async showStuckInFlight () {
      await this.$store.dispatch('actionVrsInFlightApplications')
      this.filterData(this.vrsInFlightApplications)
    }
  }
}
</script>

<style>
  div.searchInFlightTextBox {
    width: 55%;
    float: left;
    padding-left: 10px;
  }
  div.searchInFlightClearButton {
    float: right;
    margin: 1em 0.3em 0 0;
    padding-right: 5px;
  }
</style>
