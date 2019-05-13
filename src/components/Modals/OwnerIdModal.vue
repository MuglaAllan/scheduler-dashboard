<template>
  <div>
    <md-dialog :md-active.sync="showOperationalModal" :md-backdrop="false" style="width:60%;">
      <md-dialog-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-20">
            <md-checkbox v-model="selectedOwnerIsCompany">Is Company</md-checkbox>
          </div>
        </div>
        <div class="md-layout" v-if="!selectedOwnerIsCompany">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Forenames</label>
              <md-input v-model="searchOwnerId.forenames" type="text"></md-input>
            </md-field>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>{{this.localLabel}}</label>
              <md-input v-if="!selectedOwnerIsCompany" v-model="searchOwnerId.surname" type="text"></md-input>
              <md-input v-if="selectedOwnerIsCompany" v-model="searchOwnerId.business_name" type="text"></md-input>
            </md-field>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Post Code</label>
              <md-input v-model="searchOwnerId.postcode" type="text"></md-input>
            </md-field>
          </div>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-100" style="margin-top: 1.5vh; text-align: right;">
          <md-button class="md-dense md-raised md-success" @click="search" style="margin-right: 1em;">Search</md-button>
          <md-button class="md-dense md-raised md-simple" @click="clear">Clear</md-button>
        </div>
        <table v-if="showData" class="table" cellspacing="0" id="firstTable" style="width:95%; margin: 1em 1.5em;">
          <thead>
          <tr v-if="ownerIdData.length > 0" style="font-size: 12pt !important; color: rgb(38, 198, 218);">
            <th v-if="!selectedOwnerIsCompany" class="text-left sortHover" width="5%">Title</th>
            <th v-if="!selectedOwnerIsCompany" class="text-left sortHover" width="20%" @click="sort('forenames')">Forenames</th>
            <th v-if="!selectedOwnerIsCompany" class="text-left sortHover" width="20%" @click="sort('surname')">Surname</th>
            <th v-if="selectedOwnerIsCompany" class="text-left sortHover" width="25%" @click="sort('business_name')">Company</th>
            <th v-if="ownerIdData.length > 0" class="text-left sortHover">Address</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="(ownerIdData.length === null) || ownerIdData.length === 0">
            <td colspan="4" class="text-left">No matches found - refine search parameters and try again</td>
          </tr>
          <tr class="highlightHover"  v-if="ownerIdData !== []" v-for="(row, index) in sortedList" :value="index" :key="index" @click="onRowClick(row)">
            <td v-if="!selectedOwnerIsCompany" class="text-left">{{row.title}}</td>
            <td v-if="!selectedOwnerIsCompany" class="text-left">{{row.forenames}}</td>
            <td v-if="!selectedOwnerIsCompany" class="text-left">{{row.surname}}</td>
            <td v-if="selectedOwnerIsCompany" class="text-left">{{row.business_name}}</td>
            <td class="text-left">{{concatAddress(row.address_line_1, row.address_line_2, row.address_line_3, row.parish, row.postcode)}}</td>
          </tr>
          </tbody>
        </table>
      </md-dialog-content>
      <md-dialog-actions class="mdDialogActions">
        <thead>
          <tr></tr>
        </thead>
        <md-button class="md-raised md-simple" @click="close()">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
import { createHelpers } from 'vuex-map-fields'
import { concatValues } from '../Functions/Functions.js'
import { ddlNumber } from '../Functions/DropDownLists.js'

import types from '../../store/mutation-types'

const { mapFields } = createHelpers({
  getterType: 'getRegistrationNoField',
  mutationType: 'updateRegistrationNoField'
})

export default {
  name: 'owner-id-modal',
  props: [ 'showOperationalModalProp' ],
  data () {
    return {
      currentSort: 'regNo',
      currentSortDir: 'asc',
      showData: false,
      showOperationalModal: false,
      localSelect: null,
      localDdlYesNo: ddlNumber(),
      localLabel: 'Surname'
    }
  },
  computed: {
    ...mapFields([
      'isHistorySaveButtonVisible',
      'regNoHistoryData',
      'ownerIdData',
      'selectedOwnerId',
      'searchOwnerId',
      'selectedOwnerIsCompany'
    ]),
    sortedList: function () {
      let array = this.ownerIdData
      return array.sort((a, b) => {
        let modifier = 1
        if (this.currentSortDir === 'desc') {
          modifier = -1
        }
        if (a[this.currentSort] < b[this.currentSort]) {
          return -1 * modifier
        }
        if (a[this.currentSort] > b[this.currentSort]) {
          return modifier
        }
        return 0
      })
    }
  },
  methods: {
    onRowClick (data) {
      let obj = {
        data: [{
          title: data.title,
          forenames: data.forenames,
          surname: data.surname,
          business_name: data.business_name,
          address_line_1: data.address_line_1,
          address_line_2: data.address_line_2,
          address_line_3: data.address_line_3,
          parish: data.postcode,
          postcode: data.parish
        }]
      }
      this.regNoHistoryData[0].Owner_Details = obj
      this.selectedOwnerId = this.selectedOwnerIsCompany ? data.business_id : data.people_id
      this.isHistorySaveButtonVisible = true
      this.clear()
      this.$store.dispatch('showHideRegistrationNoOwnerIdSelectModal')
    },
    sort: function (s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = s
    },
    async search () {
      let res = await this.$store.dispatch(this.selectedOwnerIsCompany ? 'getCompanyDetails' : 'getOwnerIdDetails', { obj: this.searchOwnerId, savedAt: types.SET_OWNER_ID_DATA })
      if (res !== null) {
        this.showData = true
      }
    },
    concatAddress: function (addr1, addr2, addr3, parish, postcode) {
      return concatValues([ addr1, addr2, addr3, parish, postcode ], true)
    },
    clear () {
      this.searchOwnerId = { }
      this.ownerIdData = []
      this.selectedOwnerIsCompany = false
      this.showData = false
      this.localSelect = null
    },
    close () {
      this.clear()
      this.$store.dispatch('showHideRegistrationNoOwnerIdSelectModal')
    }
  },
  watch: {
    showOperationalModalProp () {
      this.showOperationalModal = this.showOperationalModalProp
    },
    selectedOwnerIsCompany () {
      this.localLabel = this.selectedOwnerIsCompany ? 'Company Name' : 'Surname'
    }
  }
}
</script>
