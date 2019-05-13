<template>
  <div>
    <md-card>
      <md-card-content>
        <div id="vrsLoading" v-if="$store.getters.getIsRegNoDataLoading">
          <img id="spinner" src="../../../assets/img/spinner.gif" style="margin-top: 0.75em;"/>
        </div>
        <div class="table-responsive table-upgrade">
          <table class="table" cellspacing="0" id="firstTable">
            <thead>
            <tr v-if="!$store.getters.getIsOwnerIdDataListEmpty" style="font-size: 12pt !important; color: #f57c00 !important;">
              <th class="text-left sortHover" width="25%" @click="sort('business_name')">Company</th>
              <th class="text-left">Address</th>
              <th class="text-left sortHover" @click="sort('isMotorTrade')">Is Trader</th>
              <th class="text-center" width="5%">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr class="highlightHover" v-if="!$store.getters.getIsOwnerIdDataListEmpty" v-for="row in sortedList" :value="row.permit_number" :key="row.permit_number" @click="regNoCheckedRow = row.business_id">
              <td class="text-left">{{row.business_name}}</td>
              <td class="text-left">{{concatAddress(row.address_line_1, row.address_line_2, row.address_line_3, row.parish, row.postcode)}}</td>
              <td class="text-left">{{showYesNo(row.isMotorTrade)}}</td>
              <td class="text-center">
                <input v-model="regNoCheckedRow" type="radio" v-bind:value="row.business_id" name="group" />
              </td>
            </tr>
            </tbody>
          </table>
          <div v-if="$store.getters.getIsOwnerIdDataListEmpty && !$store.getters.getIsRegNoDataLoading">
            <div style="text-align: left;">
              <h4>No Company Found - Create New Owner</h4>
            </div>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100 md-size-60">
                <md-field>
                  <label>Business Company</label>
                  <md-input v-model="newTradeOwner.company" type="text"></md-input>
                </md-field>
              </div>
            </div>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100 md-size-60">
                <md-field>
                  <label>Address 1</label>
                  <md-input v-model="newTradeOwner.address_line_1" type="text"></md-input>
                </md-field>
              </div>
            </div>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100 md-size-60">
                <md-field>
                  <label>Address 2</label>
                  <md-input v-model="newTradeOwner.address_line_2" type="text"></md-input>
                </md-field>
              </div>
            </div>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100 md-size-60">
                <md-field>
                  <label>Address 3</label>
                  <md-input v-model="newTradeOwner.address_line_3" type="text"></md-input>
                </md-field>
              </div>
            </div>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100 md-size-30">
                <md-field>
                  <label>Parish</label>
                  <md-select v-model="newTradeOwner.parish" md-dense>
                    <md-option v-for="val in localDdlParish" v-bind:key="val.id" v-bind:value="val.id" style="padding:0.4em 0 0 1em;">{{val.value}}</md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-30">
                <md-field>
                  <label>Post Code</label>
                  <md-input v-model="newTradeOwner.postcode" type="text"></md-input>
                </md-field>
              </div>
            </div>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100 md-size-15">
                <md-field>
                  <label>Is Motor Trader</label>
                  <md-select v-model="newTradeOwner.isMotorTrader" md-dense>
                    <md-option v-for="val in localDdlYesNo" v-bind:key="val.value" v-bind:value="val.value" style="padding:0.4em 0 0 1em;">{{val.value}}</md-option>
                  </md-select>
                </md-field>
              </div>
            </div>
          </div>
        </div>
      </md-card-content>
      <div style="float: right; margin: -2px 0 0 -2px;" />
    </md-card>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import types from '../../../store/mutation-types'

import {
  ddlParish,
  ddlYesNo
} from '../../Functions/DropDownLists.js'

import * as functions from '../../Functions/Functions.js'

const { mapFields } = createHelpers({
  getterType: 'getRegistrationNoField',
  mutationType: 'updateRegistrationNoField'
})

export default {
  name: 'Child2',
  components: { },
  props: ['value'],
  data () {
    return {
      currentSort: 'regNo',
      currentSortDir: 'asc',
      companyShortCode: null,
      company: null,
      postCode: null,
      localDdlParish: ddlParish(),
      localDdlYesNo: ddlYesNo()
    }
  },
  computed: {
    ...mapFields([
      'regNoCheckedRow',
      'searchOwnerId',
      'ownerIdData',
      'step',
      'newTradeOwner'
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
          return 1 * modifier
        }
        return 0
      })
    }
  },
  dataBackgroundColor: {
    type: String,
    default: ''
  },
  methods: {
    sort (s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = s
    },
    concatAddress (addr1, addr2, addr3, parish, postcode) {
      let array = [ addr1, addr2, addr3, parish, postcode ]
      return functions.concatValues(array, true)
    },
    showYesNo (item) {
      if (item) {
        return 'Yes'
      } else {
        return 'No'
      }
    }
  },
  mounted: function () {
    this.$store.commit('setRegNoDataLoadingOn')
    if (this.step === 2) {
      this.$store.dispatch('getCompanyDetails', { obj: this.searchOwnerId, savedAt: types.SET_OWNER_ID_DATA })
      this.sort('business_name')
    }
  }
}
</script>
