<template>
  <div>
    <md-card>
      <md-card-content style="margin-left: 1em; position: relative;">
        <div class="vrsHeader">1. Vehicle</div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-20">
            <md-field>
              <label>Registration No.</label>
              <md-input v-model="regNoRetainChangeOwnership.vehicleSearchData.regNo" type="text" v-on:blur="searchRegNo" :disabled="regNoRetainChangeOwnership.vehicleDisabled"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-30">
            <md-button v-if="!regNoRetainChangeOwnership.vehicleDisabled" class="md-raised md-success" @click="searchRegNo">Search</md-button>
            <md-button v-if="regNoRetainChangeOwnership.vehicleDisabled" class="md-raised md-simple" @click="resetRegNo">Reset</md-button>
          </div>
        </div>
        <div class="table-responsive table-upgrade">
          <table v-if="regNoRetainChangeOwnership.showVehicleTable" class="table" cellspacing="0" id="firstTable">
            <thead>
            <tr v-if="$store.getters.getIsRetainChangeOwnerVehicleDataEmpty" style="font-size: 12pt !important; color: #f57c00 !important;">
              <th class="text-left sortHover" width="12%">Reg No.</th>
              <th class="text-left sortHover" width="12%">Make</th>
              <th class="text-left sortHover" width="12%">Models</th>
              <th class="text-left sortHover" width="12%">Chassis No.</th>
              <th class="text-left sortHover" width="12%">Engine No.</th>
              <th class="text-left" width="12%">Reg. Date</th>
              <th class="text-left" width="12%">Trans. Date </th>
              <th class="text-left" width="12%">Name</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="!$store.getters.getIsRetainChangeOwnerVehicleDataEmpty">
              <td colspan="6" class="text-left">No matches found - refine search parameters and try again</td>
            </tr>
            <tr class="highlightHover" v-if="$store.getters.getIsRetainChangeOwnerVehicleDataEmpty" v-for="row in regNoRetainChangeOwnership.vehicleData" :value="row.permit_number" :key="row.permit_number" @click="vehicleSelect(row.docUUID)">
              <td class="text-left">{{row.registration_number}}</td>
              <td class="text-left">{{row.make}}</td>
              <td class="text-left">{{row.model}}</td>
              <td class="text-left">{{row.chassis_number}}</td>
              <td class="text-left">{{row.engine_number}}</td>
              <td class="text-left">{{row.date_of_first_registration === null ? 'N/A' : new Date(row.date_of_first_registration).toLocaleDateString("en-GB")}}</td>
              <td class="text-left">{{row.date_of_last_transfer === null ? 'N/A' : new Date(row.date_of_last_transfer).toLocaleDateString("en-GB")}}</td>
              <td class="text-left">{{(row.forenames !== undefined ? row.forenames : '')  + ' ' + (row.surname !== undefined ? row.surname : '')}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div v-if="$store.getters.getIsRetainChangeOwnerVehicleDataEmpty">
          <div class="vrsHeader">2. Action</div>
          <div class="radioGroupStep2">
            <input class="radio" type="radio" id="radioSurrender" value="surrender" v-model="regNoRetainChangeOwnership.retainChangeOption" />
            <label for="radioSurrender" class="selectStep2">Surrender '{{regNoRetainChangeOwnership.vehicleData[0].registration_number}}'</label>
            <input class="radio" type="radio" id="radioRetain" value="retain" v-model="regNoRetainChangeOwnership.retainChangeOption" />
            <label for="radioRetain" class="selectStep2">Retain '{{regNoRetainChangeOwnership.vehicleData[0].registration_number}}'</label>
            <input class="radio" type="radio" id="radioAllocate" value="allocate" v-model="regNoRetainChangeOwnership.retainChangeOption" />
            <label for="radioAllocate" class="selectStep2">Allocate '{{regNoRetainChangeOwnership.vehicleData[0].registration_number}}' to a third party</label>
          </div>
        </div>
        <div v-if="regNoRetainChangeOwnership.retainChangeOption !== null">
          <div class="vrsHeader">3. Assign New Registration No.</div>
          <div class="md-layout">
            <div v-if="!autoGenerateRegNo" class="md-layout-item md-small-size-100 md-size-15">
              <md-field>
                <label>New Registration No.</label>
                <md-input v-model="regNoRetainChangeOwnership.newRegNo" type="text" v-on:click="$store.dispatch('setVrsRegistrationNumber', 'regNo')"></md-input>
              </md-field>
            </div>
            <div v-if="!autoGenerateRegNo" class="md-layout-item md-small-size-100 md-size-10">
              <md-button class="md-raised md-success" @click="assignRegNo()" style="margin-left: -1vw;">Assign</md-button>
            </div>
            <div v-if="autoGenerateRegNo" class="md-layout-item md-small-size-100 md-size-25">
              <md-field v-if="regNoRetainChangeOwnership.regNoRetainedList.length > 0">
                <label>Retained Registration No.</label>
                <md-select v-model="regNoRetainChangeOwnership.newRegNo" md-dense>
                  <md-option v-for="val in regNoRetainChangeOwnership.regNoRetainedList" v-bind:key="val" v-bind:value="val" style="padding:0.4em 0 0 1em;">{{val}}</md-option>
                </md-select>
              </md-field>
              <div v-if="regNoRetainChangeOwnership.regNoRetainedList.length === 0" style="margin-top: 1.5em; margin-left: 1.5em;">
                <b>No retained registration numbers available</b>
              </div>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-15" style="margin-top: 0.4em;">
              <md-checkbox v-model="autoGenerateRegNo">Use retained</md-checkbox>
            </div>
          </div>
        </div>
        <div v-if="regNoRetainChangeOwnership.retainChangeOption === 'allocate'">
          <div class="vrsHeader">4. Assign to Third Party</div>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-20">
              <md-checkbox v-model="thirdPartyIsCompany">Is Company</md-checkbox>
            </div>
          </div>
          <div class="md-layout">
            <div v-if="!thirdPartyIsCompany" class="md-layout-item md-small-size-100 md-size-20">
              <md-field>
                <label>Forenames</label>
                <md-input v-model="regNoRetainChangeOwnership.thirdPartyOwnerSearch.forenames" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-20">
              <md-field>
                <label>{{this.localLabel}}</label>
                <md-input v-if="!thirdPartyIsCompany" v-model="regNoRetainChangeOwnership.thirdPartyOwnerSearch.surname" type="text"></md-input>
                <md-input v-if="thirdPartyIsCompany" v-model="regNoRetainChangeOwnership.thirdPartyOwnerSearch.business_name" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-30">
              <md-button v-if="!showData" class="md-raised md-success" @click="searchThirdParty">Search</md-button>
              <md-button v-if="showData" class="md-raised md-simple" @click="resetThirdParty" style="margin-left: 1em;">Reset</md-button>
            </div>
          </div>
          <div class="table-responsive table-upgrade">
            <table v-if="showData" class="table" cellspacing="0" id="secondTable" style="width:95%; margin: 1em 1.5em;">
              <thead>
              <tr v-if="ownerIdData.length > 0" style="font-size: 12pt !important; color: rgb(38, 198, 218);">
                <th v-if="!thirdPartyIsCompany" class="text-left sortHover" width="20%" @click="sort('forenames')">Forenames</th>
                <th v-if="!thirdPartyIsCompany" class="text-left sortHover" width="20%" @click="sort('surname')">Surname</th>
                <th v-if="thirdPartyIsCompany" class="text-left sortHover" width="35%" @click="sort('business_name')">Company</th>
                <th v-if="ownerIdData.length > 0" class="text-left sortHover">Address</th>
              </tr>
              </thead>
              <tbody>
              <tr v-if="(ownerIdData.length === null) || ownerIdData.length === 0">
                <td colspan="4" class="text-left">No matches found - refine search parameters and try again</td>
              </tr>
              <tr class="highlightHover"  v-if="ownerIdData !== []" v-for="(row, index) in sortedList" :value="index" :key="index" @click="onRowClick(row)">
                <td v-if="!thirdPartyIsCompany" class="text-left">{{row.forenames}}</td>
                <td v-if="!thirdPartyIsCompany" class="text-left">{{row.surname}}</td>
                <td v-if="thirdPartyIsCompany" class="text-left">{{row.business_name}}</td>
                <td class="text-left">{{concatAddress(row.address_line_1, row.address_line_2, row.address_line_3, row.parish, row.postcode)}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-raised md-success" @click="saveRetainChange()" :disabled="regNoRetainChangeOwnership.retainChangeOption === null">Update</md-button>
        <md-button class="md-raised md-simple" @click="resetRegNo()">Reset</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import { concatValues, setAll } from '../Functions/Functions'
import { getVrsExactFromApi } from '../../api/vrsApi'

import types from '../../store/mutation-types'

const { mapFields } = createHelpers({
  getterType: 'getRegistrationNoField',
  mutationType: 'updateRegistrationNoField'
})

export default {
  name: 'retain-change-ownership',
  data () {
    return {
      assignNo: 0,
      localLabel: 'Surname',
      showData: false
    }
  },
  computed: {
    ...mapFields([
      'ownerIdData',
      'regNoRetainChangeOwnership'
    ]),
    autoGenerateRegNo: {
      get () {
        return this.regNoRetainChangeOwnership.autoGenerateRegNo
      },
      set (newVal) {
        this.regNoRetainChangeOwnership.autoGenerateRegNo = newVal
      }
    },
    thirdPartyIsCompany: {
      get () {
        return this.regNoRetainChangeOwnership.thirdPartyIsCompany
      },
      set (newVal) {
        this.regNoRetainChangeOwnership.thirdPartyIsCompany = newVal
      }
    },
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
    async searchRegNo () {
      let obj = {
        'registration_number': this.regNoRetainChangeOwnership.vehicleSearchData.regNo.toUpperCase()
      }
      this.regNoRetainChangeOwnership.vehicleData = await getVrsExactFromApi(obj)
      if (this.regNoRetainChangeOwnership.vehicleData.length === 1) {
        this.regNoRetainChangeOwnership.selectedVehicleDocUUID = this.regNoRetainChangeOwnership.vehicleData[0].docUUID
        this.regNoRetainChangeOwnership.selectedVehicleMileage = this.regNoRetainChangeOwnership.vehicleData[0].mileage
      }
      this.regNoRetainChangeOwnership.vehicleDisabled = this.regNoRetainChangeOwnership.vehicleData.length === 1
      this.regNoRetainChangeOwnership.showVehicleTable = true
    },
    async assignRegNo () {
      let res = await this.$store.dispatch('getRegistrationNoByTypeDataVrs', { regNoType: 'DEFAULT', count: this.assignNo })
      if (res !== undefined) {
        this.regNoRetainChangeOwnership.newRegNo = res[0].registrationnumber
        this.assignNo = this.assignNo + 1
      }
    },
    async searchThirdParty () {
      let res = await this.$store.dispatch(this.thirdPartyIsCompany ? 'getCompanyDetails' : 'getOwnerIdDetails', { obj: this.regNoRetainChangeOwnership.thirdPartyOwnerSearch, savedAt: types.SET_OWNER_ID_DATA })
      if (res !== null) {
        this.showData = true
      }
    },
    resetThirdParty () {
      this.ownerIdData = []
      this.regNoRetainChangeOwnership.thirdPartyIsCompany = null
      this.showData = false
      setAll(this.regNoRetainChangeOwnership.thirdPartyOwnerSearch, null)
    },
    onRowClick (row) {
      this.ownerIdData = []
      this.ownerIdData.push(row)
    },
    vehicleSelect (docUUID) {
      if (this.regNoRetainChangeOwnership.vehicleData.length > 1) {
        this.regNoRetainChangeOwnership.vehicleData = [this.regNoRetainChangeOwnership.vehicleData.find(a => a.docUUID === docUUID)]
        this.regNoRetainChangeOwnership.selectedVehicleDocUUID = docUUID
        this.regNoRetainChangeOwnership.selectedVehicleMileage = this.regNoRetainChangeOwnership.vehicleData[0].mileage
        this.regNoRetainChangeOwnership.vehicleDisabled = true
      }
    },
    concatAddress (addr1, addr2, addr3, parish, postcode) {
      return concatValues([ addr1, addr2, addr3, parish, postcode ], true)
    },
    saveRetainChange () {
      this.$store.dispatch('retainChangeOwnerShip')
    },
    resetRegNo () {
      this.assignNo = 0
      this.showData = false
      this.$store.dispatch('resetRegistrationNo')
    }
  },
  watch: {
    async autoGenerateRegNo () {
      this.regNoRetainChangeOwnership.newRegNo = null
      this.regNoRetainChangeOwnership.regNoRetainedList = []
      if (this.autoGenerateRegNo) {
        this.regNoRetainChangeOwnership.regNoRetainedList = await this.$store.dispatch('getRegNoRetainedRegNoByOwnerId')
      } else {
        this.assignNo = 0
        this.assignRegNo()
      }
    },
    thirdPartyIsCompany () {
      this.localLabel = this.thirdPartyIsCompany ? 'Company Name' : 'Surname'
    }
  }
}
</script>

<style>
  div.radioGroupStep2 {
    margin-left: 1em;
  }
  label.selectStep2 {
    margin-bottom: 1em;
  }
</style>
