<template>
  <div>
    <md-card>
      <md-card-content style="margin-left: 1em; position: relative;">
        <div class="vrsHeader">1. Vehicle<span v-if="vrsChangeOwnership.selectedVehicleDocUUID !== null"> - {{vrsChangeOwnership.selectedVehicleDocUUID}}</span></div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-20">
            <md-field>
              <label>Registration No.</label>
              <md-input v-model="vrsChangeOwnership.vehicleSearchData.regNo" type="text" v-on:blur="searchRegNo" :disabled="vrsChangeOwnership.vehicleDisabled"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-30">
            <md-button v-if="!vrsChangeOwnership.vehicleDisabled" class="md-raised md-success" @click="searchRegNo">Search</md-button>
            <md-button v-if="vrsChangeOwnership.vehicleDisabled" class="md-raised md-simple" @click="resetRegNo">Reset</md-button>
          </div>
        </div>
        <div class="table-responsive table-upgrade">
          <table v-if="vrsChangeOwnership.showVehicleTable" class="table" cellspacing="0" id="firstTable">
            <thead>
              <tr v-if="isVehicleDataEmpty" style="font-size: 12pt !important; color: #f57c00 !important;">
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
              <tr v-if="!isVehicleDataEmpty">
                <td colspan="6" class="text-left">No matches found - refine search parameters and try again</td>
              </tr>
              <tr class="highlightHover" v-if="isVehicleDataEmpty" v-for="row in vrsChangeOwnership.vehicleData" :value="row.permit_number" :key="row.permit_number" @click="vehicleSelect(row.docUUID)">
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
        <div class="vrsHeader">2. New Owner<span v-if="vrsChangeOwnership.selectedOwnerId !== null"> - {{vrsChangeOwnership.selectedOwnerId}}</span></div>
        <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-15">
              <md-checkbox v-model="vrsChangeOwnership.isCompany" :disabled="vrsChangeOwnership.ownerDisabled">Is Company</md-checkbox>
            </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-20" v-if="!vrsChangeOwnership.isCompany">
            <md-field>
              <label>First Name</label>
              <md-input v-model="vrsChangeOwnership.ownerSearchData.forenames" type="text" :disabled="vrsChangeOwnership.ownerDisabled"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-20" v-if="!vrsChangeOwnership.isCompany">
            <md-field>
              <label>Surname</label>
              <md-input v-model="vrsChangeOwnership.ownerSearchData.surname" type="text" v-on:blur="searchNewOwner" :disabled="vrsChangeOwnership.ownerDisabled"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-20" v-if="vrsChangeOwnership.isCompany">
            <md-field>
              <label>Company Name</label>
              <md-input v-model="vrsChangeOwnership.ownerSearchData.business_name" type="text" v-on:blur="searchNewOwner" :disabled="vrsChangeOwnership.ownerDisabled"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-20">
            <md-button v-if="!vrsChangeOwnership.ownerDisabled" class="md-raised md-success" @click="searchNewOwner">Search</md-button>
            <md-button v-if="vrsChangeOwnership.ownerDisabled" class="md-raised md-simple" @click="resetNewOwner">Reset</md-button>
          </div>
        </div>
        <div class="table-responsive table-upgrade">
          <table v-if="vrsChangeOwnership.showOwnerTable" class="table" cellspacing="0" id="secondTable">
            <thead>
            <tr v-if="vrsChangeOwnership.ownerData.length > 0" style="font-size: 12pt !important; color: rgb(38, 198, 218);">
              <th v-if="!vrsChangeOwnership.isCompany" class="text-left sortHover" width="20%">Forenames</th>
              <th v-if="!vrsChangeOwnership.isCompany" class="text-left sortHover" width="20%">Surname</th>
              <th v-if="vrsChangeOwnership.isCompany" class="text-left sortHover" width="25%">Company</th>
              <th v-if="vrsChangeOwnership.ownerData.length > 0" class="text-left sortHover">Address</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="(vrsChangeOwnership.ownerData.length === null) || vrsChangeOwnership.ownerData.length === 0">
              <td colspan="4" class="text-left">No matches found - refine search parameters and try again</td>
            </tr>
            <tr class="highlightHover"  v-if="vrsChangeOwnership.ownerData !== []" v-for="(row, index) in vrsChangeOwnership.ownerData" :value="index" :key="index" @click="ownerSelect(index)">
              <td v-if="!vrsChangeOwnership.isCompany" class="text-left">{{row.forenames}}</td>
              <td v-if="!vrsChangeOwnership.isCompany" class="text-left">{{row.surname}}</td>
              <td v-if="vrsChangeOwnership.isCompany" class="text-left">{{row.business_name}}</td>
              <td class="text-left">{{concatAddress(row.address_line_1, row.address_line_2, row.address_line_3, row.parish, row.postcode)}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div v-if="vrsChangeOwnership.vehicleDisabled && vrsChangeOwnership.ownerDisabled">
          <div class="vrsHeader">3. Additional Information</div>
          <div class="md-layout spacing">
            <div class="md-layout-item md-small-size-100 md-size-50">
              <input id="rdoSectionA" class="radio" type="radio" v-model="vrsChangeOwnership.vrdFromPart" value="active" />
              <label for="rdoSectionA" class="radioLbl">Part A</label>
              <input id="rdoSectionB" class="radio" type="radio" v-model="vrsChangeOwnership.vrdFromPart" value="inflighttransfer" />
              <label for="rdoSectionB" class="radioLbl">Part B</label>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-15">
              <md-field>
                <label>Date of Transfer</label>
                <md-input v-model="vrsChangeOwnership.changeOwnerAdditionalData.dateTransfered" type="text" @keyup="insertDobSlashes"></md-input>
                <span class="md-helper-text">dd/mm/yyyy</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-15">
              <md-field>
                <label>Mileage</label>
                <md-input v-model="vrsChangeOwnership.changeOwnerAdditionalData.mileage" type="text"></md-input>
                <span class="md-helper-text">Last Recorded: {{vrsChangeOwnership.selectedVehicleMileage}}</span>
              </md-field>
            </div>
          </div>
<!--          <div v-if="vrsChangeOwnership.vrdFromPart === 'part-a'">-->
<!--            <div class="md-layout spacingTop">-->
<!--              <div class="md-layout-item md-small-size-100 md-size-20">-->
<!--                <md-checkbox v-model="vrsChangeOwnership.changeOwnerAdditionalData.isToBeScrappedExported">To be Scrapped / Exported</md-checkbox>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div v-if="vrsChangeOwnership.changeOwnerAdditionalData.isToBeScrappedExported" class="md-layout spacing">-->
<!--              <div class="md-layout-item md-small-size-100 md-size-15">-->
<!--                <md-field>-->
<!--                  <label>Status</label>-->
<!--                  <md-select v-model="vrsChangeOwnership.changeOwnerAdditionalData.status" md-dense>-->
<!--                    <md-option v-for="item in localDdlStatus" v-bind:key="item.id" v-bind:value="item.id" style="padding:0.4em 0 0 1em;">{{item.value}}</md-option>-->
<!--                  </md-select>-->
<!--                </md-field>-->
<!--              </div>-->
<!--              <div class="md-layout-item md-small-size-100 md-size-15">-->
<!--                <md-field>-->
<!--                  <label>Date Exported / Scrapped</label>-->
<!--                  <md-input v-model="vrsChangeOwnership.changeOwnerAdditionalData.dateExportedScrapped" type="text" @keyup="insertDobSlashes"></md-input>-->
<!--                  <span class="md-helper-text">dd/mm/yyyy</span>-->
<!--                </md-field>-->
<!--              </div>-->
<!--              <div class="md-layout-item md-small-size-100 md-size-20 spacingTop">-->
<!--                <md-checkbox v-model="vrsChangeOwnership.changeOwnerAdditionalData.requireCertOfExport">Requires Certificate of Export</md-checkbox>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div v-if="vrsChangeOwnership.vrdFromPart === 'part-a'" class="md-layout">-->
<!--              <div class="md-layout-item md-small-size-100 md-size-20">-->
<!--                <md-checkbox v-model="vrsChangeOwnership.changeOwnerAdditionalData.changeOfVehicleParticulars">Change of Vehicle Particulars</md-checkbox>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div v-if="vrsChangeOwnership.changeOwnerAdditionalData.changeOfVehicleParticulars" class="md-layout">-->
<!--              <div class="md-layout-item md-small-size-100 md-size-50">-->
<!--                <label>Enter changes</label>-->
<!--                <textarea v-model="vrsChangeOwnership.changeOwnerAdditionalData.vehicleChanges" class="dashInput" rows="6" cols="75"></textarea>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
        </div>
      </md-card-content>
      <md-card-actions>
        <md-button  class="md-raised md-success" @click="save()" :disabled="!this.$store.getters.getCanChangeOwner">Update</md-button>
        <md-button class="md-raised md-simple" @click="reset()">Reset</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import { insertSlash, concatValues, convertToUnixLong } from '../Functions/Functions.js'
import { ddlVrsStatus } from '../Functions/DropDownLists'

import { getVrsExactFromApi } from '../../api/vrsApi'
import { getOwnerDetailsApi } from '../../api/ownerApi'

const { mapFields } = createHelpers({
  getterType: 'getVrsField',
  mutationType: 'updateVrsField'
})

export default {
  name: 'change-ownership',
  data () { return {} },
  computed: {
    ...mapFields([
      'vrsChangeOwnership'
    ]),
    isVehicleDataEmpty () {
      if (this.vrsChangeOwnership.vehicleData === []) {
        return false
      }
      return this.vrsChangeOwnership.vehicleData.length > 0
    },
    localDdlStatus () {
      let output = []
      let ddl = ddlVrsStatus(['new', 'approved', 'paymentconfirm', 'passinspection', 'active', 'writeooff', 'removed', 'stolen'])
      ddl.forEach(function (item) {
        if (item.disabled === undefined) {
          output.push(item)
        }
      })
      return output
    }
  },
  methods: {
    async searchRegNo () {
      let obj = {
        'registration_number': this.vrsChangeOwnership.vehicleSearchData.regNo.toUpperCase()
      }
      this.vrsChangeOwnership.vehicleData = await getVrsExactFromApi(obj)
      if (this.vrsChangeOwnership.vehicleData.length === 1) {
        this.vrsChangeOwnership.selectedVehicleDocUUID = this.vrsChangeOwnership.vehicleData[0].docUUID
        this.vrsChangeOwnership.selectedVehicleMileage = this.vrsChangeOwnership.vehicleData[0].mileage
      }
      this.vrsChangeOwnership.vehicleDisabled = this.vrsChangeOwnership.vehicleData.length === 1
      this.vrsChangeOwnership.showVehicleTable = true
    },
    resetRegNo () {
      this.vrsChangeOwnership.vehicleData = []
      this.vrsChangeOwnership.vehicleSearchData = []
      this.vrsChangeOwnership.vrsChangeOwnership = null
      this.vrsChangeOwnership.vehicleDisabled = false
      this.vrsChangeOwnership.showVehicleTable = false
    },
    vehicleSelect (id, docUUID) {
      if (this.vrsChangeOwnership.vehicleData.length > 1) {
        this.vrsChangeOwnership.vehicleData = [this.vrsChangeOwnership.vehicleData.find(a => a.docUUID === docUUID)]
        this.vrsChangeOwnership.selectedVehicleDocUUID = docUUID
        this.vrsChangeOwnership.selectedVehicleMileage = this.vrsChangeOwnership.vehicleData[0].mileage
        this.vrsChangeOwnership.vehicleDisabled = true
      }
    },
    async searchNewOwner () {
      this.vrsChangeOwnership.ownerData = await getOwnerDetailsApi(this.vrsChangeOwnership.ownerSearchData, this.vrsChangeOwnership.isCompany ? 'business' : 'people', true)
      if (this.vrsChangeOwnership.ownerData.length === 1) {
        this.vrsChangeOwnership.selectedOwnerId = this.vrsChangeOwnership.isCompany ? this.vrsChangeOwnership.ownerData[0].business_id : this.vrsChangeOwnership.ownerData[0].people_id
      }
      this.vrsChangeOwnership.ownerDisabled = this.vrsChangeOwnership.ownerData.length === 1
      this.vrsChangeOwnership.showOwnerTable = true
    },
    resetNewOwner () {
      this.vrsChangeOwnership.ownerData = []
      this.vrsChangeOwnership.ownerSearchData = []
      this.vrsChangeOwnership.selectedOwnerId = null
      this.vrsChangeOwnership.isCompany = null
      this.vrsChangeOwnership.showOwnerTable = false
      this.vrsChangeOwnership.ownerDisabled = false
    },
    ownerSelect (index) {
      if (this.vrsChangeOwnership.ownerData.length > 1) {
        this.vrsChangeOwnership.ownerData = [this.vrsChangeOwnership.ownerData[index]]
        this.vrsChangeOwnership.selectedOwnerId = this.vrsChangeOwnership.isCompany ? this.vrsChangeOwnership.ownerData[0].business_id : this.vrsChangeOwnership.ownerData[0].people_id
        this.vrsChangeOwnership.ownerDisabled = true
      }
    },
    concatAddress: function (addr1, addr2, addr3, parish, postcode) {
      return concatValues([ addr1, addr2, addr3, parish, postcode ], true)
    },
    insertDobSlashes () {
      this.vrsChangeOwnership.changeOwnerAdditionalData.dateTransfered = insertSlash(this.vrsChangeOwnership.changeOwnerAdditionalData.dateTransfered)
    },
    save () {
      let transferDate = this.vrsChangeOwnership.changeOwnerAdditionalData.dateTransfered === undefined ? new Date() : this.vrsChangeOwnership.changeOwnerAdditionalData.dateTransfered
      let obj = {
        docUUID: this.vrsChangeOwnership.selectedVehicleDocUUID,
        is_company: this.vrsChangeOwnership.isCompany,
        status: this.vrsChangeOwnership.vrdFromPart,
        title: this.vrsChangeOwnership.ownerData[0].title,
        initials: this.vrsChangeOwnership.ownerData[0].initials,
        forenames: this.vrsChangeOwnership.ownerData[0].forenames,
        surname: this.vrsChangeOwnership.ownerData[0].surname,
        address_line_1: this.vrsChangeOwnership.ownerData[0].address_line_1,
        address_line_2: this.vrsChangeOwnership.ownerData[0].address_line_2,
        address_line_3: this.vrsChangeOwnership.ownerData[0].address_line_3,
        parish: this.vrsChangeOwnership.ownerData[0].parish,
        postCode: this.vrsChangeOwnership.ownerData[0].postcode,
        registration_number: this.vrsChangeOwnership.vehicleData[0].registration_number,
        mileage: this.vrsChangeOwnership.changeOwnerAdditionalData.mileage,
        date_of_last_transfer: convertToUnixLong(transferDate)
      }
      this.$store.dispatch('setChangeOfOwner', obj)
    },
    reset () {
      this.$store.dispatch('resetVrs')
    }
  },
  watch: {
    isCompany () {
      if (this.vrsChangeOwnership.isCompany) {
        this.vrsChangeOwnership.ownerSearchData.forenames = null
        this.vrsChangeOwnership.ownerSearchData.surname = null
      } else {
        this.vrsChangeOwnership.ownerSearchData.business_name = null
      }
    }
  }
}
</script>

<style>
  input.radio {
    float: left;
    clear: none;
    margin: 5px 5px 0 2px;
  }
  label.radioLbl {
    float: left;
    clear: none;
    display: block;
    padding: 1px 1em 0 0;
  }
  div.spacing {
    margin-bottom: 1em;
  }
  div.spacingTop {
    margin-top: 1.5em;
  }
</style>
