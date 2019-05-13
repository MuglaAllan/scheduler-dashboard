<template>
  <div>
    <div>
      <div class="searchTextBox">
        <md-field class="md-toolbar-section-end">
          <md-input placeholder="Search..." v-model="searchText" @input="searchFor" />
        </md-field>
      </div>
      <div class="searchClearButton">
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
        <th class="text-left dashboard sortHover" width="5%" @click="sort('status')">Status</th>
      </tr>
      </thead>
      <tbody>
      <tr class="highlightHover" v-for="item in sortedList" :value="item._id" :key="item._id" @click="onRowClick(item.docUUID, item.status)">
        <td class="text-left dashboardRow">{{ item.prev_reg_no }}</td>
        <td class="text-left dashboardRow">{{ concatName(item.title, item.forenames, item.surname) }}</td>
        <td class="text-left dashboardRow">{{ item.make }}</td>
        <td class="text-left dashboardRow">{{ item.model }}</td>
        <td class="text-left dashboardRow">{{ convertStatus(item.status) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import * as functions from '../Functions/Functions.js'
import types from '../../store/mutation-types'

const { mapFields } = createHelpers({
  getterType: 'getDashPermitField',
  mutationType: 'updateDashPermitField'
})

export default {
  name: 'vrs-applications-table',
  props: {
    tableHeaderColor: { type: String, default: '' },
    defaultCount: Number
  },
  data () {
    return {
      selected: [],
      isVisible: true,
      tableData: [],
      searchText: null,
      currentSort: 'regNo',
      currentSortDir: 'asc'
    }
  },
  computed: {
    ...mapFields([
      'vrsApplications',
      'isBackgroundVisible',
      'isParish'
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
    }
  },
  methods: {
    async onRowClick (docUUID, status) {
      // if (status === 'approved') {
      this.$store.commit(types.SET_VRS_CHECKEC_ROW, docUUID)
      if (this.vrsApplications.length < 1) {
        await this.$store.dispatch('actionVrsApplications')
      }
      let filterData = this.vrsApplications.filter(a => a.docUUID === docUUID)[0]
      if (filterData !== undefined) {
        this.$store.commit(types.SET_VRS_ARRAY, this.vrsApplications.filter(a => a.docUUID === docUUID)[0])
        this.$store.dispatch('getGenericVehicleReferenceData')
        this.$router.push('vrsPartial')
      }
      // }
    },
    searchFor (toSearch) {
      let results = functions.searchForValueInArray(toSearch, this.vrsApplications)
      this.filterData(results)
    },
    filterData (output) {
      this.tableData = output.slice(0, this.defaultCount)
    },
    async clearSearch () {
      this.searchText = null
      await this.$store.dispatch('actionVrsApplications')
      this.filterData(this.vrsApplications)
    },
    convertStatus (status) {
      return functions.convertStatus(status)
    },
    concatName (title, forenames, surname) {
      return functions.concatValues([title, forenames, surname], false)
    },
    sort: function (s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = s
    }
  },
  watch: {
    defaultCount: function () {
      this.searchText = null
      this.filterData(this.vrsApplications)
    }
  },
  async mounted () {
    if (this.vrsApplications.length < 1) {
      await this.$store.dispatch('actionVrsApplications')
    }
    this.filterData(this.vrsApplications)
  }
}
</script>

<style>
  div.searchTextBox {
    width: 80%;
    float: left;
    padding-left: 10px;
  }
  div.searchClearButton {
    float: right;
    margin: 1em 0.3em 0 0;
    padding-right: 5px;
  }
  table.vrsTable {
    width: 96%;
    margin-left: 0.5vw;
  }
  th.dashboard {
    font-weight: 100;
    font-size: 12pt !important;
    padding-bottom: 7px;
    border-bottom: 1px solid #d2d2d2;
  }
  tr.highlightHover:hover {
    cursor: pointer;
  }
  td.dashboardRow {
    padding: 7px 0 7px 0;
    border-top: 1px solid #d2d2d2;
  }
  td.dashboardRow:first-child {
    padding-left: 3px;
  }
  td.dashboardRow:last-child {
    padding-right: 5px;
  }
</style>
