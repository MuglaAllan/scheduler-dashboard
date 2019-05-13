<template>
  <div class="content">
    <div class="md-layout" style="border-radius: 5px;" v-bind:style="{ 'background-color': backgroundColor }">
      <h2 v-if="this.status !== undefined" style="margin-left: 1.5em; font-weight: 200;">Status: {{this.localStatus}}</h2>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50" style="float: right;">
          <md-card>
            <md-card-header class="headerPadding">
              <md-button @click="isEdit(editOwnerDetailsButton, cancelOwnerDetailsButton, 'OwnerDetails')" class="tableBtn md-raised md-simple" style="color: #FFFFFF !important;">{{ this.editOwnerDetailsButton.text }}</md-button>
              <md-button v-if="this.cancelOwnerDetailsButton.show" @click="isCancel(editOwnerDetailsButton, cancelOwnerDetailsButton, 'OwnerDetails')" class="tableBtn md-raised md-simple" style="color: #FFFFFF !important;">Cancel</md-button>
              <h4 class="title">Owner Details</h4>
            </md-card-header>
            <md-card-content>
              <div class="md-layout vehicleDetails">
                <div class="display-33">
                  <label for="ddlTitle" class="permitStep3Label dashLabel">Transmission</label>
                  <select id="ddlTitle" v-model="vrsSelectedSearchData.owner_details.title" class="dashInputVrs" :disabled="editOwnerDetailsButton.show === false">
                    <option v-for="item in localDdlTitle" v-bind:key="item.id" :value="item.id">{{item.value}}</option>
                  </select>
                </div>
                <div class="display-33">
                  <label for="txtForenames" class="permitStep3Label dashLabel">Forenames</label>
                  <input id="txtForenames" class="dashInput" v-model="vrsSelectedSearchData.owner_details.forenames" :readonly="editOwnerDetailsButton.show === false" />
                </div>
                <div class="display-33">
                  <label for="txtSurname" class="permitStep3Label dashLabel">Surname</label>
                  <input id="txtSurname" class="dashInput" v-model="vrsSelectedSearchData.owner_details.surname" :readonly="editOwnerDetailsButton.show === false" />
                </div>
              </div>
              <div class="md-layout vehicleDetails">
                <div class="display-33">
                  <label class="permitStep3Label dashLabel">Address</label>
                  <input id="txtAddress1" class="dashInput" v-model="vrsSelectedSearchData.owner_details.address1" :readonly="editOwnerDetailsButton.show === false" />
                  <input id="txtAddress2" class="dashInput" v-model="vrsSelectedSearchData.owner_details.address2" :readonly="editOwnerDetailsButton.show === false" />
                  <input id="txtAddress3" class="dashInput" v-model="vrsSelectedSearchData.owner_details.address3" :readonly="editOwnerDetailsButton.show === false" />
                  <select id="ddlParish" v-model="vrsSelectedSearchData.owner_details.parish" class="dashInputVrs" :disabled="editOwnerDetailsButton.show === false">
                    <option v-for="item in localDdlParish" v-bind:key="item.id" :value="item.id">{{item.value}}</option>
                  </select>
                  <input id="txtPostCode" class="dashInput" v-model="vrsSelectedSearchData.owner_details.postCode" :readonly="editOwnerDetailsButton.show === false" />
                </div>
                <div class="display-33">
                  <label for="txtDob" class="permitStep3Label dashLabel">Date of Birth</label>
                  <input id="txtDob" class="dashInput" type="text" v-model="vrsSelectedSearchData.owner_details.dob" :readonly="editOwnerDetailsButton.show === false" />
                </div>
                <div class="display-33">
                  <label for="txtLicenseNo" class="permitStep3Label dashLabel">License No.</label>
                  <input id="txtLicenseNo" class="dashInput" v-model="vrsSelectedSearchData.owner_details.licenseNo" :readonly="editOwnerDetailsButton.show === false" />
                </div>
              </div>
              <div class="md-layout vehicleDetails">
                <div class="display-33">
                  <label for="txtMobile" class="permitStep3Label dashLabel">Mobile No.</label>
                  <input id="txtMobile" class="dashInput" v-model="vrsSelectedSearchData.owner_details.mobilePhone" :readonly="editOwnerDetailsButton.show === false" />
                </div>
                <div class="display-33">
                  <label for="txtLandLine" class="permitStep3Label dashLabel">Landline No.</label>
                  <input id="txtLandLine" class="dashInput" v-model="vrsSelectedSearchData.owner_details.homePhone" :readonly="editOwnerDetailsButton.show === false" />
                </div>
                <div class="display-33">
                  <label for="txtEmail" class="permitStep3Label dashLabel">Email</label>
                  <input id="txtEmail" class="dashInput" v-model="vrsSelectedSearchData.owner_details.email" :readonly="editOwnerDetailsButton.show === false" />
                </div>
              </div>
            </md-card-content>
          </md-card>
        </div>
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50" style="float: left;">
          <md-card>
            <md-card-header class="headerPadding">
              <md-button @click="isEdit(editVehicleDetailsButton, cancelVehicleDetailsButton, 'VehicleDetails')" class="tableBtn md-raised md-simple" style="color: #FFFFFF !important;">{{ this.editVehicleDetailsButton.text }}</md-button>
              <md-button v-if="this.cancelVehicleDetailsButton.show" @click="isCancel(editVehicleDetailsButton, cancelVehicleDetailsButton, 'VehicleDetails')" class="tableBtn md-raised md-simple" style="color: #FFFFFF !important;">Cancel</md-button>
              <h4 class="title">Vehicle Details</h4>
            </md-card-header>
            <md-card-content>
              <div class="md-layout vehicleDetails">
                <div class="display-33">
                  <label for="txtRegNo" class="permitStep3Label dashLabel">Registration No.</label>
                  <input id="txtRegNo" class="dashInput" v-model="vrsSelectedSearchData.vehicle_details.regNo" :readonly="editVehicleDetailsButton.show === false" />
                </div>
              </div>
              <div class="md-layout vehicleDetails">
                <div class="display-33">
                  <label for="ddlCategories" class="permitStep3Label dashLabel">Category</label>
                  <select id="ddlCategories" v-model="vrsSelectedSearchData.vehicle_details.vehicleCategory" class="dashInputVrs" :disabled="editVehicleDetailsButton.show === false" style="width: 90%;">
                    <option v-for="item in localDdlCategories" v-bind:key="item.id" :value="item.id">{{item.value}}</option>
                  </select>
                </div>
                <div class="display-33">
                  <label for="ddlSubCategories" class="permitStep3Label dashLabel">Sub-Category</label>
                  <select id="ddlSubCategories" v-model="vrsSelectedSearchData.vehicle_details.vehicleSubCategory" class="dashInputVrs" :disabled="editVehicleDetailsButton.show === false" style="width: 90%;">
                    <option v-for="item in localDdlSubCategories" v-bind:key="item.id" :value="item.id">{{item.value}}</option>
                  </select>
                </div>
                <div class="display-33">
                  <label for="txtBody" class="permitStep3Label dashLabel">Body</label>
                  <input id="txtBody" class="dashInput" v-model="vrsSelectedSearchData.vehicle_details.vehicleBodyType" :readonly="editVehicleDetailsButton.show === false" />
                </div>
              </div>
              <div class="md-layout vehicleDetails">
                <div class="display-33">
                  <label for="txtMake" class="permitStep3Label dashLabel">Make</label>
                  <input id="txtMake" class="dashInput" v-model="vrsSelectedSearchData.vehicle_details.vehicleMake" :readonly="editVehicleDetailsButton.show === false" />
                </div>
                <div class="display-33">
                  <label for="txtModel" class="permitStep3Label dashLabel">Model</label>
                  <input id="txtModel" class="dashInput" v-model="vrsSelectedSearchData.vehicle_details.vehicleModel" :readonly="editVehicleDetailsButton.show === false" />
                </div>
                <div class="display-33">
                  <label for="txtColour" class="permitStep3Label dashLabel">Colour</label>
                  <input id="txtColour" class="dashInput" v-model="vrsSelectedSearchData.vehicle_details.primaryColour" :readonly="editVehicleDetailsButton.show === false" />
                </div>
              </div>
              <div class="md-layout vehicleDetails">
                <div class="display-33">
                  <label for="txtFuel" class="permitStep3Label dashLabel">Fuel</label>
                  <input id="txtFuel" class="dashInput" v-model="vrsSelectedSearchData.vehicle_details.fuelType" :readonly="editVehicleDetailsButton.show === false" />
                </div>
                <div class="display-33">
                  <label for="txtCubicCapacity" class="permitStep3Label dashLabel">CC</label>
                  <input id="txtCubicCapacity" class="dashInput" v-model="vrsSelectedSearchData.vehicle_details.cubicCapacity" :readonly="editVehicleDetailsButton.show === false" />
                </div>
                <div class="display-33">
                  <label for="txtSeating" class="permitStep3Label dashLabel">Seating</label>
                  <input id="txtSeating" class="dashInput" v-model="vrsSelectedSearchData.vehicle_details.seatCapacity" :readonly="editVehicleDetailsButton.show === false" />
                </div>
              </div>
              <div class="md-layout vehicleDetails">
                <div class="display-33">
                  <label for="txtVin" class="permitStep3Label dashLabel">VIN / Chassis No.</label>
                  <input id="txtVin" class="dashInput" v-model="vrsSelectedSearchData.vehicle_details.chassisNo" readonly />
                </div>
                <div class="display-33">
                  <label for="txtEngineNo" class="permitStep3Label dashLabel">Engine No.</label>
                  <input id="txtEngineNo" class="dashInput" v-model="vrsSelectedSearchData.vehicle_details.engineNo" :readonly="editVehicleDetailsButton.show === false" />
                </div>
                <div class="display-33">
                  <label for="txtOdometer" class="permitStep3Label dashLabel">Mileage</label>
                  <input id="txtOdometer" class="dashInput" v-model="vrsSelectedSearchData.vehicle_details.odometer" :readonly="editVehicleDetailsButton.show === false" />
                </div>
              </div>
              <div class="md-layout vehicleDetails">
                <div class="display-33">
                  <label for="txtWeight" class="permitStep3Label dashLabel">Weigth (kg)</label>
                  <input id="txtWeight" class="dashInput" v-model="vrsSelectedSearchData.vehicle_details.weight" :readonly="editVehicleDetailsButton.show === false" />
                </div>
                <div class="display-33">
                  <label for="txtUnladenWeight" class="permitStep3Label dashLabel">Unladen Weight (kg)</label>
                  <input id="txtUnladenWeight" class="dashInput" v-model="vrsSelectedSearchData.vehicle_details.unladenWeight" :readonly="editVehicleDetailsButton.show === false" />
                </div>
                <div class="display-33">
                  <label for="ddlTransmission" class="permitStep3Label dashLabel">Transmission</label>
                  <select id="ddlTransmission" v-model="vrsSelectedSearchData.vehicle_details.transmission" class="dashInputVrs" :disabled="editVehicleDetailsButton.show === false">
                    <option v-for="item in localDdlTransmission" v-bind:key="item.id" :value="item.id">{{item.value}}</option>
                  </select>
                </div>
              </div>
              <div class="md-layout vehicleDetails">
                <div class="display-33">
                  <label for="txtWidth" class="permitStep3Label dashLabel">Width</label>
                  <input id="txtWidth" class="dashInput" v-model="vrsSelectedSearchData.vehicle_details.vehicleWidth" :readonly="editVehicleDetailsButton.show === false" />
                </div>
                <div class="display-33">
                  <label for="txtLength" class="permitStep3Label dashLabel">Length</label>
                  <input id="txtLength" class="dashInput" v-model="vrsSelectedSearchData.vehicle_details.vehicleWidth" :readonly="editVehicleDetailsButton.show === false" />
                </div>
                <div class="display-33">
                  <label for="txtHeight" class="permitStep3Label dashLabel">Height</label>
                  <input id="txtHeight" class="dashInput" v-model="vrsSelectedSearchData.vehicle_details.vehicleHeight" :readonly="editVehicleDetailsButton.show === false" />
                </div>
              </div>
            </md-card-content>
          </md-card>
        </div>
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50" style="float: right;">
          <md-card>
            <md-card-header class="headerPadding">
              <md-button @click="isEdit(editRegistrationDetailsButton, cancelRegistrationDetailsButton, 'RegistrationDetails')" class="tableBtn md-raised md-simple" style="color: #FFFFFF !important;">{{ this.editRegistrationDetailsButton.text }}</md-button>
              <md-button v-if="this.cancelRegistrationDetailsButton.show" @click="isCancel(editRegistrationDetailsButton, cancelRegistrationDetailsButton, 'RegistrationDetails')" class="tableBtn md-raised md-simple" style="color: #FFFFFF !important;">Cancel</md-button>
              <h4 class="title">Registration Details</h4>
            </md-card-header>
            <md-card-content>
              <div class="md-layout vehicleDetails">
                <div class="display-33">
                  <label for="ddlRegStatus" class="permitStep3Label dashLabel">Registration Status</label>
                  <select id="ddlRegStatus" v-model="vrsSelectedSearchData.registration_details.status" class="dashInputVrs" :disabled="editRegistrationDetailsButton.show === false">
                    <option v-for="item in localDdlStatus" v-bind:key="item.id" :value="item.id" :disabled="item.disabled">{{item.value}}</option>
                  </select>
                </div>
              </div>
              <div class="md-layout vehicleDetails">
                <div class="display-33">
                  <label for="txtFirstReg" class="permitStep3Label dashLabel">First Registered</label>
                  <input id="txtFirstReg" class="dashInput" v-model="vrsSelectedSearchData.registration_details.firstEverRegDate"  :readonly="editRegistrationDetailsButton.show === false" />
                </div>
                <div class="display-33">
                  <label for="txtDateRegInJersey" class="permitStep3Label dashLabel">Date Registered In Jersey</label>
                  <input id="txtDateRegInJersey" class="dashInput" v-model="vrsSelectedSearchData.registration_details.dateRegInJersey"  :readonly="editRegistrationDetailsButton.show === false" />
                </div>
              </div>
              <div class="md-layout vehicleDetails">
                <div class="display-33">
                  <label for="txtPrevRegNo" class="permitStep3Label dashLabel">Previous Registration No.</label>
                  <input id="txtPrevRegNo" class="dashInput" v-model="vrsSelectedSearchData.registration_details.prevRegNo"  :readonly="editRegistrationDetailsButton.show === false" />
                </div>
                <div class="display-33">
                  <label for="txtPrevRegCountry" class="permitStep3Label dashLabel">Previous Registration Country</label>
                  <input id="txtPrevRegCountry" class="dashInput" v-model="vrsSelectedSearchData.registration_details.prevRegCountry"  :readonly="editRegistrationDetailsButton.show === false" />
                </div>
                <div class="display-33">
                  <label for="txtPrevRegNoDate" class="permitStep3Label dashLabel">Previous Registration No. Date</label>
                  <input id="txtPrevRegNoDate" class="dashInput" v-model="vrsSelectedSearchData.registration_details.prevRegNoDate"  :readonly="editRegistrationDetailsButton.show === false" />
                </div>
              </div>
            </md-card-content>
          </md-card>
        </div>
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50" style="float: left;">
          <md-card>
            <md-card-header class="headerPadding">
              <md-button @click="isEdit(editMiscellaneousButton, cancelMiscellaneousButton, 'Miscellaneous')" class="tableBtn md-raised md-simple" style="color: #FFFFFF !important;">{{ this.editMiscellaneousButton.text }}</md-button>
              <md-button v-if="this.cancelMiscellaneousButton.show" @click="isCancel(editMiscellaneousButton, cancelMiscellaneousButton, 'Miscellaneous')" class="tableBtn md-raised md-simple" style="color: #FFFFFF !important;">Cancel</md-button>
              <h4 class="title">Miscellaneous</h4>
            </md-card-header>
            <md-card-content>
              <div class="md-layout vehicleDetails">
                <div class="display-33">
                  <label for="txtReceiptNoInspection" class="permitStep3Label dashLabel">Inspection Receipt No.</label>
                  <input id="txtReceiptNoInspection" class="dashInput" v-model="vrsSelectedSearchData.miscellaneous.receiptNoInspection"  :readonly="editMiscellaneousButton.show === false" />
                </div>
                <div class="display-33">
                  <label for="txtReceiptNoRegistration" class="permitStep3Label dashLabel">Registration Receipt No.</label>
                  <input id="txtReceiptNoRegistration" class="dashInput" v-model="vrsSelectedSearchData.miscellaneous.receiptNoRegistration"  :readonly="editMiscellaneousButton.show === false" />
                </div>
                <div class="display-33">
                  <label for="txtAgentCode" class="permitStep3Label dashLabel">Agent Code</label>
                  <input id="txtAgentCode" class="dashInput" v-model="vrsSelectedSearchData.miscellaneous.agentCode"  :readonly="editMiscellaneousButton.show === false" />
                </div>
              </div>
              <div class="md-layout vehicleDetails">
                <div class="display-33">
                  <label for="txtDutyPaid" class="permitStep3Label dashLabel">Duty Paid</label>
                  <input id="txtDutyPaid" class="dashInput" v-model="vrsSelectedSearchData.miscellaneous.dutyPaid"  :readonly="editMiscellaneousButton.show === false" />
                </div>
                <div class="display-33">
                  <label for="txtDutyExemptionNo" class="permitStep3Label dashLabel">Duty Exemption No.</label>
                  <input id="txtDutyExemptionNo" class="dashInput" v-model="vrsSelectedSearchData.miscellaneous.dutyExemptionNo"  :readonly="editMiscellaneousButton.show === false" />
                </div>
                <div class="display-33">
                  <label for="txtDecNo" class="permitStep3Label dashLabel">Declaration No.</label>
                  <input id="txtDecNo" class="dashInput" v-model="vrsSelectedSearchData.miscellaneous.declNo"  :readonly="editMiscellaneousButton.show === false" />
                </div>
              </div>
              <div class="md-layout vehicleDetails">
                <div class="display-33">
                  <label for="txtLinkToOwner" class="permitStep3Label dashLabel">Link to Owner</label>
                  <input id="txtLinkToOwner" class="dashInput" v-model="vrsSelectedSearchData.miscellaneous.linkToOwner"  :readonly="editMiscellaneousButton.show === false" />
                </div>
              </div>
            </md-card-content>
          </md-card>
        </div>
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50" style="float: right;">
          <md-card>
            <md-card-header class="headerPadding">
              <md-button @click="isEdit(editCommentButton, cancelCommentButton, 'Comment')" class="tableBtn md-raised md-simple" style="color: #FFFFFF !important;">{{ this.editCommentButton.text }}</md-button>
              <md-button v-if="this.cancelCommentButton.show" @click="isCancel(editCommentButton, cancelCommentButton, 'Comment')" class="tableBtn md-raised md-simple" style="color: #FFFFFF !important;">Cancel</md-button>
              <h4 class="title">Comments</h4>
            </md-card-header>
            <md-card-content>
              <div class="md-layout vehicleDetails">
                <div>
                  <label for="txtFreeText" class="permitStep3Label dashLabel">Free Text</label>
                  <textarea id="txtFreeText" class="dashInput dashInputVrs" v-model="vrsSelectedSearchData.comments.freeText" :readonly="editCommentButton.show === false" />
                </div>
              </div>
              <div class="md-layout vehicleDetails">
                <div class="display-100">
                  <label for="txtHidden" class="permitStep3Label dashLabel">Hidden Text</label>
                  <textarea id="txtHidden" class="dashInput dashInputVrs" v-model="vrsSelectedSearchData.comments.hidden" :readonly="editCommentButton.show === false" />
                </div>
              </div>
            </md-card-content>
          </md-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import multiSelect from 'vue-multiselect'
import { createHelpers } from 'vuex-map-fields'
import {
  ddlTitle,
  ddlParish,
  ddlTransmission,
  ddlVrsStatus,
  ddlYesNo,
  ddlCategories,
  ddlSubCategories,
  ddlFuelTypes,
  ddlVehicleOwnership,
  ddlColours
} from '../../Functions/DropDownLists.js'

const { mapFields } = createHelpers({
  getterType: 'getVrsField',
  mutationType: 'updateVrsField'
})

export default {
  name: 'Child3',
  components: {
    'multiselect': multiSelect
  },
  props: ['value'],
  data () {
    return {
      editVehicleDetailsButton: { show: false, text: 'Edit' },
      cancelVehicleDetailsButton: { show: false },
      editOwnerDetailsButton: { show: false, text: 'Edit' },
      cancelOwnerDetailsButton: { show: false },
      editRegistrationDetailsButton: { show: false, text: 'Edit' },
      cancelRegistrationDetailsButton: { show: false },
      editMiscellaneousButton: { show: false, text: 'Edit' },
      cancelMiscellaneousButton: { show: false },
      editCommentButton: { show: false, text: 'Edit' },
      cancelCommentButton: { show: false },
      localDdlTitle: ddlTitle(),
      localDdlParish: ddlParish(),
      localDdlTransmission: ddlTransmission(),
      localDdlStatus: ddlVrsStatus([ 'new', 'approved', 'paymentconfirm', 'passinspection' ]),
      localDdlCategories: ddlCategories(),
      localDdlSubCategories: ddlSubCategories(),
      localDdlFuelTypes: ddlFuelTypes(),
      localDdlVehicleOwnership: ddlVehicleOwnership(),
      localDdlColour: ddlColours(),
      localDdlYesNo: ddlYesNo(),
      backgroundColor: '#FFFFFF'
    }
  },
  computed: {
    ...mapFields([
      'vrsSelectedSearchData',
      'vrsSelectedSearchData.registration_details.status'
    ]),
    localStatus: {
      get: function () {
        if (this.status === undefined) {
          return undefined
        } else {
          let x = ddlVrsStatus([])
          return x.find(a => a.id === this.status).value
        }
      },
      set: function (newValue) {
        return newValue
      }
    }
  },
  methods: {
    isEdit (editButton, cancelButton, sectionTitle) {
      if (editButton.show) {
        this.$store.dispatch('setVrsDataBySection', sectionTitle)
        this.setButtonText(editButton, 'Edit')
      } else {
        this.setButtonText(editButton, 'Save')
      }
      this.setButtonState(editButton, cancelButton)
    },
    isCancel (editButton, cancelButton, title) {
      this.determineWhatAction(title)
      this.setButtonText(editButton, 'Edit')
      this.setButtonState(editButton, cancelButton)
    },
    determineWhatAction (sectionTitle) {
      this.$store.dispatch('resetVrsDataBySection', sectionTitle)
    },
    setButtonText (obj, text) {
      obj.text = text
    },
    setButtonState (obj1, obj2) {
      obj1.show = !obj1.show
      obj2.show = obj1.show
    },
    determineBackGroundColour () {
      let defaultColour = '#FFFFFF'
      if (this.localStatus === undefined) {
        this.backgroundColor = defaultColour
      } else {
        let badStatus = ['writeooff', 'removed', 'stolen', 'scrapped', 'permanentlyexported']
        this.backgroundColor = badStatus.includes(this.status) ? '#FF6464' : defaultColour
      }
    }
  },
  watch: {
    status () {
      let y = ddlVrsStatus([])
      if (this.status === undefined) {
        this.localStatus = undefined
      } else {
        this.localStatus = y.find(a => a.id === this.status).value
      }
      this.determineBackGroundColour()
    }
  }
}
</script>

<style>
  .headerPadding {
    padding-bottom: 1.8em !important;
  }
  .headerPadding h4 {
    margin: 0.4em 0 -0.2em 0 !important;
  }
</style>
