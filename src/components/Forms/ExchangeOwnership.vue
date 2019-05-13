<template>
  <div>
    <md-card>
      <md-card-content style="margin-left: 1em; position: relative;">
        <div class="vrsHeader">1. Vehicle</div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-20">
            <md-field>
              <label>Registration No.</label>
              <md-input v-model="regNoExchangeOwnership.vehicleSearchData1.regNo" type="text" v-on:blur="searchRegNo(1)" :disabled="regNoExchangeOwnership.vehicleDisabled1"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-30">
            <md-button v-if="!regNoExchangeOwnership.vehicleDisabled1" class="md-raised md-success" @click="searchRegNo(1)">Search</md-button>
            <md-button v-if="regNoExchangeOwnership.vehicleDisabled1" class="md-raised md-simple" @click="resetRegNo(1)">Reset</md-button>
          </div>
        </div>
        <div class="table-responsive table-upgrade">
          <table v-if="regNoExchangeOwnership.showVehicleTable1" class="table" cellspacing="0" id="firstTable">
            <thead>
            <tr v-if="$store.getters.getIsExchangeOwnerVehicleData1Empty" style="font-size: 12pt !important; color: #f57c00 !important;">
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
            <tr v-if="!$store.getters.getIsExchangeOwnerVehicleData1Empty">
              <td colspan="6" class="text-left">No matches found - refine search parameters and try again</td>
            </tr>
            <tr class="highlightHover" v-if="$store.getters.getIsExchangeOwnerVehicleData1Empty" v-for="row in regNoExchangeOwnership.vehicleData1" :value="row.permit_number" :key="row.permit_number" @click="vehicleSelect(1, row.docUUID)">
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
        <div class="vrsHeader">2. Vehicle</div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-20">
            <md-field>
              <label>Registration No.</label>
              <md-input v-model="regNoExchangeOwnership.vehicleSearchData2.regNo" type="text" v-on:blur="searchRegNo(2)" :disabled="regNoExchangeOwnership.vehicleDisabled2"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-30">
            <md-button v-if="!regNoExchangeOwnership.vehicleDisabled2" class="md-raised md-success" @click="searchRegNo(2)">Search</md-button>
            <md-button v-if="regNoExchangeOwnership.vehicleDisabled2" class="md-raised md-simple" @click="resetRegNo(2)">Reset</md-button>
          </div>
        </div>
        <div class="table-responsive table-upgrade">
          <table v-if="regNoExchangeOwnership.showVehicleTable2" class="table" cellspacing="0" id="SecondTable">
            <thead>
            <tr v-if="$store.getters.getIsExchangeOwnerVehicleData2Empty" style="font-size: 12pt !important; color: #f57c00 !important;">
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
            <tr v-if="!$store.getters.getIsExchangeOwnerVehicleData2Empty">
              <td colspan="6" class="text-left">No matches found - refine search parameters and try again</td>
            </tr>
            <tr class="highlightHover" v-if="$store.getters.getIsExchangeOwnerVehicleData2Empty" v-for="row in regNoExchangeOwnership.vehicleData2" :value="row.permit_number" :key="row.permit_number" @click="vehicleSelect(2, row.docUUID)">
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
      </md-card-content>
      <md-card-actions>
        <md-button  class="md-raised md-success" @click="saveExchange()" :disabled="!this.$store.getters.getCanExchangeOwner">Exchange</md-button>
        <md-button class="md-raised md-simple" @click="resetExchange()">Reset</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'

import { getVrsExactFromApi } from '../../api/vrsApi'

const { mapFields } = createHelpers({
  getterType: 'getRegistrationNoField',
  mutationType: 'updateRegistrationNoField'
})

export default {
  name: 'exchange-ownership',
  data () { return {} },
  computed: {
    ...mapFields([
      'regNoExchangeOwnership'
    ])
  },
  methods: {
    async searchRegNo (id) {
      let obj = {
        'registration_number': this.regNoExchangeOwnership['vehicleSearchData' + id].regNo.toUpperCase()
      }
      this.regNoExchangeOwnership['vehicleData' + id] = await getVrsExactFromApi(obj)
      if (this.regNoExchangeOwnership['vehicleData' + id].length === 1) {
        this.regNoExchangeOwnership['selectedVehicleDocUUID' + id] = this.regNoExchangeOwnership['vehicleData' + id][0].docUUID
        this.regNoExchangeOwnership['selectedVehicleMileage' + id] = this.regNoExchangeOwnership['vehicleData' + id][0].mileage
      }
      this.regNoExchangeOwnership['vehicleDisabled' + id] = this.regNoExchangeOwnership['vehicleData' + id].length === 1
      this.regNoExchangeOwnership['showVehicleTable' + id] = true
    },
    resetRegNo (id) {
      this.regNoExchangeOwnership['vehicleData' + id] = []
      this.regNoExchangeOwnership['vehicleSearchData' + id] = []
      this.regNoExchangeOwnership['selectedVehicleDocUUID' + id] = null
      this.regNoExchangeOwnership['regNoExchangeOwnership' + id] = null
      this.regNoExchangeOwnership['vehicleDisabled' + id] = false
      this.regNoExchangeOwnership['showVehicleTable' + id] = false
    },
    vehicleSelect (id, docUUID) {
      if (this.regNoExchangeOwnership['vehicleData' + id].length > 1) {
        this.regNoExchangeOwnership['vehicleData' + id] = [this.regNoExchangeOwnership['vehicleData' + id].find(a => a.docUUID === docUUID)]
        this.regNoExchangeOwnership['selectedVehicleDocUUID' + id] = docUUID
        this.regNoExchangeOwnership['selectedVehicleMileage' + id] = this.regNoExchangeOwnership['vehicleData' + id][0].mileage
        this.regNoExchangeOwnership['vehicleDisabled' + id] = true
      }
    },
    saveExchange () {
      this.$store.dispatch('exchangeRegNo')
    },
    resetExchange () {
      this.$store.dispatch('resetVrs')
    }
  }
}
</script>
