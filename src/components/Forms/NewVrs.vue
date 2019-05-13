<template>
  <div>
    <md-card>
      <operational-modal :showOperationalModalProp="this.$store.getters.getShowOperationalModal" />
      <vrs-receipt-modal :showVrsReceiptModalProp="this.$store.getters.getShowVrsReceiptModal" />
      <vrs-schedule-add-modal :showVrsScheduleModal="this.$store.getters.getShowVrsScheduleModal" />
      <md-card-content style="margin-left: 1em; position: relative;">
        <div v-if="showOwnerIdDataVrs" class="box-orange">
          <div v-if="!showRegisterOwnerButton">
            <h4 style="margin-top: 0;"><u>Select Owner</u></h4>
            <div
              v-for="(item, index) in ownerIdDataVrs"
              v-bind:key="index"
              v-bind:id="index"
              @click="setOwnerDocUUID(item)"
              class="box-orange-content">{{returnOwnerSelectDetails(item)}}</div>
          </div>
          <div v-if="showRegisterOwnerButton">
            <h4 style="margin-top: 0;"><u>Owner Not Found</u></h4>
            No user details match the criteria provided, either register a new owner or reset and start again;
            <md-button class="md-raised md-simple" @click="reset()">Reset</md-button>
          </div>
        </div>
        <div class="vrsHeader">Never Registered / Previously Registered</div>
          <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-20">
            <md-field>
              <md-select v-model="previouslyOwned" md-dense>
                <md-option v-for="val in localDdlVehicleOwnership" v-bind:key="val.id" v-bind:value="val.id" style="padding:0.4em 0 0 1em;">{{val.value}}</md-option>
              </md-select>
            </md-field>
          </div>
        </div>
        <div class="vrsHeader">Owner Details<span v-if="ownerDocUUID !== null"> - {{ownerDocUUID}}</span></div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-15">
            <md-field>
              <label class="required">Title</label>
              <md-select v-model="title" md-dense>
                <md-option v-for="val in localDdlTitle" v-bind:key="val.id" v-bind:value="val.id" style="padding:0.4em 0 0 1em;">{{val.value}}</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-20" v-if="!isCompany">
            <md-field>
              <label class="required">Give Names</label>
              <md-input v-model="forenames" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-15" v-if="!isCompany">
            <md-field>
              <label>Initials</label>
              <md-input v-model="initials" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-20">
            <md-field>
              <label class="required">{{surnameLabelTitle}}</label>
              <md-input v-model="surname" type="text"></md-input>
            </md-field>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-15" v-if="!isCompany">
            <md-field>
              <label class="required">Date of Birth</label>
              <md-input v-model="dob" type="text" @keyup="insertDobSlashes"></md-input>
              <span class="md-helper-text">dd/mm/yyyy</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-20" v-if="!isCompany">
          <md-field>
            <label>License No.</label>
            <md-input v-model="licenseNo" type="text"></md-input>
          </md-field>
        </div>
        <div v-if="showFindOwnerButton" class="md-layout-item md-small-size-100 md-size-10">
          <md-button class="md-raised md-simple" @click="getOwnerId">Find Owner</md-button>
        </div>
        </div>
        <div class="vrsHeader">Contact Details</div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-70">
            <md-field>
              <label class="required">Address Line 1</label>
              <md-input v-model="address1" type="text"></md-input>
            </md-field>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-70">
            <md-field>
              <label class="required">Address Line 2</label>
              <md-input v-model="address2" type="text"></md-input>
            </md-field>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-70">
            <md-field>
              <label>Address Line 3</label>
              <md-input v-model="address3" type="text"></md-input>
            </md-field>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-35">
            <md-field>
              <label class="required">Parish</label>
              <md-select v-model="parish" md-dense>
                <md-option v-for="val in localDdlParish" v-bind:key="val.id" v-bind:value="val.id" style="padding:0.4em 0 0 1em;">{{val.value}}</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-35">
            <md-field>
              <label class="required">Post Code</label>
              <md-input v-model="postCode" type="text"></md-input>
            </md-field>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-35">
            <md-field>
              <label class="required">Mobile Phone</label>
              <md-input v-model="mobilePhone" type="tel"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-35">
            <md-field>
              <label>Landline</label>
              <md-input v-model="homePhone" type="tel"></md-input>
            </md-field>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-35">
            <md-field>
              <label class="required">Email Address</label>
              <md-input v-model="emailAddress" type="email"></md-input>
            </md-field>
          </div>
          <div v-if="showRegisterOwnerButton" class="md-layout-item md-small-size-100 md-size-10">
            <md-button class="md-raised md-simple" @click="registerNewOwner">Register New Owner</md-button>
          </div>
        </div>
        <div v-if="!showRegisterOwnerButton">
          <div class="vrsHeader">Vehicle Details</div>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-20">
              <md-field>
                <label class="required">Category</label>
                <md-select v-model="vehicleCategory" md-dense>
                  <md-option v-for="val in localDdlCategories" v-bind:key="val.id" v-bind:value="val.id" style="padding:0.4em 0 0 1em;">{{val.value}}</md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-20">
              <md-field>
                <label class="required">Sub-Category</label>
                <md-select v-model="vehicleSubCategory" md-dense>
                  <md-option v-for="val in localDdlSubCategories" v-bind:key="val.id" v-bind:value="val.id" style="padding:0.4em 0 0 1em;">{{val.value}}</md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-30">
              <md-field>
                <label class="required">Body Type</label>
                <md-input v-model="vehicleBodyType" type="text" v-on:click="$store.dispatch('setVrsDataParameter', 'bodyType')"></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-35">
              <md-field>
                <label class="required">Manufacturer</label>
                <md-input v-model="vehicleMake" type="text" v-on:click="$store.dispatch('setVrsDataParameter', 'manufacturer')"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-35">
              <md-field>
                <label class="required">Model</label>
                <md-input v-model="vehicleModel" type="text"></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout" v-if="this.previouslyOwned === 'previously'">
            <div class="md-layout-item md-small-size-100 md-size-35">
              <md-field>
                <label class="required">Date of First Registration</label>
                <md-input v-model="firstEverRegDate" type="text" @keyup="insertDateFirstRegistrationSlashes"></md-input>
                <span class="md-helper-text">dd/mm/yyyy</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-35">
              <md-field>
                <label class="required">Current Registration Number</label>
                <md-input v-model="previousRegNo" type="text"></md-input>
              </md-field>
            </div>
            <!--<div class="md-layout-item md-small-size-100 md-size-10">-->
              <!--<md-button class="md-raised md-simple" @click="notApplicable()" style="margin-left: -0.5vw;">No Reg No.</md-button>-->
            <!--</div>-->
          </div>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-35">
              <md-field>
                <label class="required">Fuel Type</label>
                <md-select v-model="fuelType" md-dense>
                  <md-option v-for="val in localDdlFuelTypes" v-bind:key="val.id" v-bind:value="val.id" style="padding:0.4em 0 0 1em;">{{val.value}}</md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-35">
              <md-field>
                <label class="required">Colour</label>
                <md-select v-model="primaryColour">
                  <md-option v-for="val in localDdlColour" v-bind:key="val.id" v-bind:value="val.id" :style="{'text-color': val.hex, 'padding': '0.4em 0 0 1em'}">{{val.value}}</md-option>
                </md-select>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-35">
              <md-field>
                <label class="required">VIN / Chassis No.</label>
                <md-input v-model="chassisNo" type="text" md-counter="17" v-on:keypress="isValidVinCharacter"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-35">
              <md-field>
                <label>Engine No.</label>
                <md-input v-model="engineNo" type="text"></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-15" style="margin-top: 1.5vh;">
              <md-checkbox v-model="isTypeApproved">Type approved</md-checkbox>
            </div>
            <div v-if="isTypeApproved" class="md-layout-item md-small-size-100 md-size-20">
              <md-field>
                <label class="required">Type Approval No.</label>
                <md-input v-model="typeApprovalNo" type="text"></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-70">
              <md-checkbox v-model="isLeftHandDrive">Left hand drive</md-checkbox>
              <md-checkbox v-model="isOver25yrs">Over 25 years old</md-checkbox>
              <md-checkbox v-model="isModified">Is modified</md-checkbox>
            </div>
          </div>
        </div>
        <md-card-actions>
          <md-button v-if="this.previouslyOwned === 'previously' && this.ownerDocUUID !== null" class="md-raised md-success" @click="submitFormAndShowScheduleModal(true)" :disabled="!isRequiredComplete">Submit</md-button>
          <md-button v-if="this.previouslyOwned === 'never' && this.ownerDocUUID !== null" class="md-raised md-success" @click="submitFormAndShowScheduleModal(false)" :disabled="!isRequiredComplete">Next</md-button>
          <md-button class="md-raised md-simple" @click="reset()">Reset</md-button>
        </md-card-actions>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import {
  OperationalModal,
  VrsReceiptModal,
  VrsScheduleAddModal,
  RegistrationNoSelectModal
} from '@/components'

import { insertSlash, concatValues, formatDate } from '../Functions/Functions.js'

import {
  ddlTitle,
  ddlParish,
  ddlCategories,
  ddlSubCategories,
  ddlFuelTypes,
  ddlVehicleOwnership,
  ddlColours
} from '../Functions/DropDownLists.js'

const { mapFields } = createHelpers({
  getterType: 'getVrsField',
  mutationType: 'updateVrsField'
})

export default {
  name: 'new-vrs',
  components: {
    OperationalModal,
    VrsReceiptModal,
    VrsScheduleAddModal,
    RegistrationNoSelectModal
  },
  data () {
    return {
      dteDay: null,
      dteMonth: null,
      dteYear: null,
      localDdlTitle: ddlTitle(),
      localDdlParish: ddlParish(),
      localDdlCategories: ddlCategories(),
      localDdlSubCategories: ddlSubCategories(),
      localDdlFuelTypes: ddlFuelTypes(),
      localDdlVehicleOwnership: ddlVehicleOwnership(),
      localDdlColour: ddlColours(),
      hasMessages: false,
      surnameLabelTitle: 'Surname',
      isCompany: false
    }
  },
  computed: {
    ...mapFields([
      'showFindOwnerButton',
      'showRegisterOwnerButton',
      'ownerIdDataVrs',
      'showOwnerIdDataVrs',
      'isNewVrsApplication',
      'vehicleBodyTypes',
      'vehicleManufacturers',
      'manufactureDay',
      'manufactureMonth',
      'manufactureYear',
      'vrsSelectedSearchData',
      'vrs_data.owner_details.ownerDocUUID',
      'vrs_data.owner_details.title',
      'vrs_data.owner_details.forenames',
      'vrs_data.owner_details.initials',
      'vrs_data.owner_details.surname',
      'vrs_data.owner_details.dob',
      'vrs_data.owner_details.licenseNo',
      'vrs_data.owner_details.address1',
      'vrs_data.owner_details.address2',
      'vrs_data.owner_details.address3',
      'vrs_data.owner_details.parish',
      'vrs_data.owner_details.postCode',
      'vrs_data.owner_details.mobilePhone',
      'vrs_data.owner_details.homePhone',
      'vrs_data.owner_details.emailAddress',
      'vrs_data.vehicle_details.previouslyOwned',
      'vrs_data.vehicle_details.vehicleBodyType',
      'vrs_data.vehicle_details.vehicleMake',
      'vrs_data.vehicle_details.vehicleCategory',
      'vrs_data.vehicle_details.vehicleSubCategory',
      'vrs_data.vehicle_details.vehicleModel',
      'vrs_data.vehicle_details.previousRegNo',
      'vrs_data.vehicle_details.fuelType',
      'vrs_data.vehicle_details.primaryColour',
      'vrs_data.vehicle_details.firstEverRegDate',
      'vrs_data.vehicle_details.chassisNo',
      'vrs_data.vehicle_details.engineNo',
      'vrs_data.vehicle_details.isTypeApproved',
      'vrs_data.vehicle_details.typeApprovalNo',
      'vrs_data.vehicle_details.isLeftHandDrive',
      'vrs_data.vehicle_details.isOver25yrs',
      'vrs_data.vehicle_details.isModified'
    ]),
    isRequiredComplete: function () {
      let previouslyRegistered = this.previouslyOwned === 'never'
      let owner = this.title === 'Com' ? (this.title && this.surname) : (this.title && this.forenames && this.surname && this.dob)
      let contact = (this.address1 && this.address2 && this.parish && this.postCode && (this.mobilePhone || this.homePhone) && this.emailAddress)
      let vehicle = (this.vehicleCategory && this.vehicleSubCategory && this.vehicleBodyType && this.vehicleMake && this.vehicleModel && this.fuelType && this.primaryColour && (previouslyRegistered ? true : this.firstEverRegDate) && this.chassisNo && (this.previousRegNo !== 'n/a' ? this.previousRegNo : true))
      let typeApproved = this.isTypeApproved ? (this.typeApprovalNo) : true
      return (owner && contact && vehicle && typeApproved)
    }
  },
  methods: {
    async submitFormAndShowScheduleModal (hasBeenRegisteredBefore) {
      await this.$store.dispatch('setIssueInitialVrsRegistrationData', hasBeenRegisteredBefore).then((resp) => {
        if (resp.redirect) {
          this.$router.push({ path: '/vrsPartial' })
        }
      })
    },
    async getOwnerId () {
      await this.$store.dispatch('getOwnerIdDetailsVrs')
    },
    async registerNewOwner () {
      await this.$store.dispatch('setOwnerDetailsAndReturnIdForNewVrs')
      // this.showRegisterOwnerButton = false
    },
    returnOwnerSelectDetails (item) {
      if (item.surname !== undefined) {
        return concatValues([ item.title, item.forenames, item.surname ], false) + (item.dob !== null ? ' (' + formatDate(item.dob) + ')' : null)
      } else {
        return item.business_name
      }
    },
    redirect () {
      this.$router.push('vrsPartial')
    },
    reset () {
      this.$store.dispatch('resetVrs')
      this.$store.dispatch('getGenericVehicleReferenceData')
    },
    isValidVinCharacter (event) {
      let charCodeArray = [ 73, 79, 81, 105, 111, 113 ]
      event = event || window.event
      if (charCodeArray.includes(event.which) || event.target.value.length >= 17) {
        event.preventDefault()
      } else {
        return true
      }
    },
    insertDobSlashes () {
      this.dob = insertSlash(this.dob)
    },
    insertDateFirstRegistrationSlashes () {
      this.firstEverRegDate = insertSlash(this.firstEverRegDate)
    },
    setOwnerDocUUID (item) {
      if (item.people_id !== undefined) {
        this.ownerDocUUID = item.people_id
        this.isCompany = false
        this.title = item.title
        this.forenames = item.forenames
        this.surname = item.surname
        this.address1 = item.address_line_1
        this.address2 = item.address_line_2
        this.address3 = item.address_line_3
        this.parish = item.parish
        this.postCode = item.postcode
        this.dob = formatDate(item.dob)
      } else {
        this.ownerDocUUID = item.business_id
        this.isCompany = true
        this.surname = item.business_name
        this.address1 = item.address_line_1
        this.address2 = item.address_line_2
        this.address3 = item.address_line_3
        this.parish = item.parish
        this.postCode = item.postcode
      }

      this.showOwnerIdDataVrs = false
      this.showFindOwnerButton = false
    }
  },
  watch: {
    firstEverRegDate: function (val) {
      if (val !== null && val.length === 10) {
        let firstReg = new Date(val)
        let now = new Date()
        this.isOver25yrs = now.getFullYear() - firstReg.getFullYear() > 25
      }
    },
    title: function () {
      if (this.title === 'Com') {
        this.surnameLabelTitle = 'Company Name'
        this.isCompany = true
      } else {
        this.surnameLabelTitle = 'Surname'
        this.isCompany = false
      }
    },
    previouslyOwned: function () {
      if (this.previouslyOwned === 'previously') {
        this.previousRegNo = ''
      } else {
        this.previousRegNo = 'n/a'
      }
    }
  },
  mounted () {
    // this.$store.dispatch('getGenericVehicleReferenceData')
    this.isNewVrsApplication = true
  }
}

</script>

<style>
  div.md-layout-item label.required:after {
    content:" *";
    color: red;
  }
  .box-orange {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    border-radius: 4px;
    position: absolute;
    background: #FFFFFF;
    padding: 0.75em;
    width: 20vw;
    top: 17.5%;
    left: 72.5%;
    z-index: 1000;
  }
  .box-orange-content {
    padding: 4px;
  }
  .box-orange-content:hover {
    background-color: #d2d2d2;
    border-radius: 3px;
    cursor: pointer;
  }
</style>
