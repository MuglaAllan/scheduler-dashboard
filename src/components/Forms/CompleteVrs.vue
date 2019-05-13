<template>
  <div style="margin-top: -4em; width: 75%;">
    <registration-no-select-modal :showRegistrationNoSelectModalProp="this.$store.getters.getShowRegistrationNoSelectModal" />
    <vrs-receipt-modal :showVrsReceiptModalProp="this.$store.getters.getShowVrsReceiptModal" />
    <vrs-preview-modal :showVrsPreviewModalProp="this.$store.getters.getShowVrsPreviewModal" />
    <md-card>
      <md-card-content>
        <div>{{this.title + ' ' + this.forenames + ' ' + this.surname + (this.regNo !== undefined ? ' - ' + this.regNo : '')}}</div>
        <div class="vrsHeader">Miscellaneous</div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-40">
            <md-field>
              <label>Agent Code</label>
              <md-input v-model="agentCode" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-40">
            <md-field>
              <label>Link to Owner</label>
              <md-input v-model="linkToOwner" type="text"></md-input>
            </md-field>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-40">
            <md-field>
              <label>Duty Paid</label>
              <md-input v-model="dutyPaid" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-40">
            <md-field>
              <label>Declaration No.</label>
              <md-input v-model="declNo" type="text"></md-input>
            </md-field>
          </div>
        </div>
        <div class="vrsHeader">Registration Details</div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-40">
            <md-field>
              <label class="required">Date Registered in Jersey</label>
              <md-input v-model="dateRegInJersey" type="text" @keyup="insertDateRegInJerseySlashes"></md-input>
              <span class="md-helper-text">dd/mm/yyyy</span>
            </md-field>
          </div>
          <div v-if="!useRetained" class="md-layout-item md-small-size-100 md-size-20">
            <md-field>
              <label>New Registration No.</label>
              <md-input v-model="regNo" type="text" v-on:click="$store.dispatch('setVrsRegistrationNumber', 'regNo')"></md-input>
            </md-field>
          </div>
          <div v-if="!useRetained" class="md-layout-item md-small-size-100 md-size-10">
            <md-button class="md-raised md-success" @click="assignRegNo()" style="margin-left: -1vw;">Assign</md-button>
          </div>
          <div v-if="useRetained" class="md-layout-item md-small-size-100 md-size-30">
            <md-field v-if="retainedList.length > 0">
              <label>Retained Registration No.</label>
              <md-select v-model="regNo" md-dense>
                <md-option v-for="val in retainedList" v-bind:key="val" v-bind:value="val" style="padding:0.4em 0 0 1em;">{{val}}</md-option>
              </md-select>
            </md-field>
            <div v-if="retainedList.length === 0" style="margin-top: 1.5em; margin-left: 1.5em;">
              <b>No retained registration numbers available</b>
            </div>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-20" style="margin-top: 0.4em;">
            <md-checkbox v-model="useRetained">Use retained</md-checkbox>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-40">
            <md-field>
              <label>Previous Registration No.</label>
              <md-input v-model="prevRegNo" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-40">
            <md-field>
              <label class="required">Previous Registration No. Date</label>
              <md-input v-model="prevRegNoDate" type="text" @keyup="insertPrevRegNoDateSlashes"></md-input>
              <span class="md-helper-text">dd/mm/yyyy</span>
            </md-field>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-40">
            <md-field>
              <label>Previous Registration Country</label>
              <md-input v-model="prevRegCountry" type="text"></md-input>
            </md-field>
          </div>
        </div>
        <div class="vrsHeader">Owner Details</div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-field>
              <label>First Registration on VRD1</label>
              <md-select v-model="firstRegOnVrd1" md-dense>
                <md-option v-for="val in localDdlFirstRegOnVrd1" v-bind:key="val.id" v-bind:value="val.id" style="padding:0.4em 0 0 1em;">{{val.value}}</md-option>
              </md-select>
            </md-field>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-40">
            <md-checkbox v-model="isForSale">Is For Re-Sale</md-checkbox>
            <md-checkbox v-model="isForHire">Is For Hire</md-checkbox>
          </div>
        </div>
        <div class="vrsHeader">Vehicle Details</div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-20">
            <md-field>
              <label>Width (mm)</label>
              <md-input v-model="vehicleWidth" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-20">
            <md-field>
              <label>Length (mm)</label>
              <md-input v-model="vehicleLength" type="text"></md-input>
            </md-field>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-20">
            <md-field>
              <label>Weight (Kg)</label>
              <md-input v-model="weight" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-20">
            <md-field>
              <label>Unladen Weight (Kg)</label>
              <md-input v-model="unladenWeight" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-20">
            <md-field>
              <label>CO2</label>
              <md-input v-model="co2" type="text"></md-input>
            </md-field>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-20">
            <md-field>
              <label>Odometer</label>
              <md-input v-model="odometer" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-20">
            <md-field>
              <label>CC</label>
              <md-input v-model="cubicCapacity" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-20">
            <md-field>
              <label>Door Count</label>
              <md-select v-model="doorNo" md-dense>
                <md-option v-for="val in localDdlDoorNo" v-bind:key="val.id" v-bind:value="val.id" style="padding:0.4em 0 0 1em;">{{val.value}}</md-option>
              </md-select>
            </md-field>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-20">
            <md-field>
              <label>Transmission</label>
              <md-select v-model="transmission" md-dense>
                <md-option v-for="val in localDllTransmission" v-bind:key="val.id" v-bind:value="val.id" style="padding:0.4em 0 0 1em;">{{val.value}}</md-option>
              </md-select>
            </md-field>
          </div>
        </div>
        <div class="vrsHeader">Comments</div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-60">
            <md-field>
              <label>Free Text</label>
              <md-textarea v-model="freeText" type="text"></md-textarea>
            </md-field>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-60">
            <md-field>
              <label>Hidden Text</label>
              <md-textarea v-model="hidden" type="text"></md-textarea>
            </md-field>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-25" style="margin-top: 1.5vh;">
            <md-checkbox v-model="localIsKitBuilt">Is the car kit built?</md-checkbox>
          </div>
          <div v-if="localIsKitBuilt" class="md-layout-item md-small-size-100 md-size-20">
            <md-field>
              <label>Kit Built</label>
              <md-select v-model="kitBuilt" md-dense>
                <md-option v-for="val in localDdlKitBuilt" v-bind:key="val.id" v-bind:value="val.id" style="padding:0.4em 0 0 1em;">{{val.value}}</md-option>
              </md-select>
            </md-field>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-80">
            <md-checkbox v-model="noV55NotNew">Not new / Not previously registered</md-checkbox>
            <md-checkbox v-model="p30">At change of ownership: no road use until exemption permits granted by the inspector of motor traffic</md-checkbox>
          </div>
        </div>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-raised md-warning" @click="back()">Back</md-button>
        <md-button class="md-raised md-simple" @click="preview()">Preview</md-button>
        <md-button class="md-raised md-success" @click="submitFormAndShowScheduleModal()" :disabled="!hasPreviewBeenViewed">Submit</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import { RegistrationNoSelectModal, VrsReceiptModal, VrsPreviewModal } from '@/components'
import { insertSlash } from '../Functions/Functions.js'
import types from '../../store/mutation-types'

import {
  ddlFirstRegOnVrd1,
  ddlIsKitBuilt,
  ddlNumber,
  ddlTransmission
} from '../Functions/DropDownLists.js'

const { mapFields } = createHelpers({
  getterType: 'getVrsField',
  mutationType: 'updateVrsField'
})

export default {
  name: 'complete-vrs',
  components: { RegistrationNoSelectModal, VrsReceiptModal, VrsPreviewModal },
  data () {
    return {
      dteDay: null,
      dteMonth: null,
      dteYear: null,
      hasMessages: false,
      localDdlFirstRegOnVrd1: ddlFirstRegOnVrd1(),
      localDdlKitBuilt: ddlIsKitBuilt(),
      localDdlDoorNo: ddlNumber(),
      localDllTransmission: ddlTransmission(),
      localIsKitBuilt: false,
      hasPreviewBeenViewed: false,
      assignNo: 0
    }
  },
  computed: {
    ...mapFields([
      'vrsPreviewHistory',
      'vehicleBodyTypes',
      'vehicleManufacturers',
      'manufactureDay',
      'manufactureMonth',
      'manufactureYear',
      'vrsSelectedSearchData',
      'vrsSelectedSearchDataDocUUID',
      'useRetained',
      'retainedList',
      // case 'Miscellaneous':
      'vrsSelectedSearchData.miscellaneous.agentCode',
      'vrsSelectedSearchData.miscellaneous.linkToOwner',
      'vrsSelectedSearchData.miscellaneous.declNo',
      'vrsSelectedSearchData.miscellaneous.dutyPaid',
      // case 'RegistrationDetails':
      'vrsSelectedSearchData.registration_details.storeObj.status',
      'vrsSelectedSearchData.registration_details.firstEverRegDate',
      'vrsSelectedSearchData.registration_details.dateRegInJersey',
      'vrsSelectedSearchData.registration_details.prevRegNo',
      'vrsSelectedSearchData.registration_details.prevRegNoDate', // Maybe not required
      'vrsSelectedSearchData.registration_details.prevRegCountry',
      // case 'OwnerDetails':
      'vrsSelectedSearchData.owner_details.title',
      'vrsSelectedSearchData.owner_details.initials',
      'vrsSelectedSearchData.owner_details.forenames',
      'vrsSelectedSearchData.owner_details.surname',
      'vrsSelectedSearchData.owner_details.dob',
      'vrsSelectedSearchData.owner_details.emailAddress',
      'vrsSelectedSearchData.owner_details.mobilePhone',
      'vrsSelectedSearchData.owner_details.homePhone',
      'vrsSelectedSearchData.owner_details.address1',
      'vrsSelectedSearchData.owner_details.address2',
      'vrsSelectedSearchData.owner_details.address3',
      'vrsSelectedSearchData.owner_details.parish',
      'vrsSelectedSearchData.owner_details.postCode',
      'vrsSelectedSearchData.owner_details.licenseNo',
      'vrsSelectedSearchData.owner_details.firstRegOnVrd1',
      'vrsSelectedSearchData.owner_details.isForSale',
      'vrsSelectedSearchData.owner_details.isForHire',
      // case 'VehicleDetails'
      'vrsSelectedSearchData.vehicle_details.regNo',
      'vrsSelectedSearchData.vehicle_details.vehicleCategory',
      'vrsSelectedSearchData.vehicle_details.vehicleBodyType',
      'vrsSelectedSearchData.vehicle_details.vehicleMake',
      'vrsSelectedSearchData.vehicle_details.vehicleModel',
      'vrsSelectedSearchData.vehicle_details.vehicleManufactureDate',
      'vrsSelectedSearchData.vehicle_details.vehicleWidth',
      'vrsSelectedSearchData.vehicle_details.vehicleHeight',
      'vrsSelectedSearchData.vehicle_details.vehicleLength',
      'vrsSelectedSearchData.vehicle_details.primaryColour',
      'vrsSelectedSearchData.vehicle_details.secondaryColour',
      'vrsSelectedSearchData.vehicle_details.cubicCapacity',
      'vrsSelectedSearchData.vehicle_details.transmission',
      'vrsSelectedSearchData.vehicle_details.co2',
      'vrsSelectedSearchData.vehicle_details.engineNo',
      'vrsSelectedSearchData.vehicle_details.chassisNo',
      'vrsSelectedSearchData.vehicle_details.weight',
      'vrsSelectedSearchData.vehicle_details.unladenWeight',
      'vrsSelectedSearchData.vehicle_details.fuelType',
      'vrsSelectedSearchData.vehicle_details.doorNo',
      'vrsSelectedSearchData.vehicle_details.isTypeApproved',
      'vrsSelectedSearchData.vehicle_details.typeApprovalNo',
      'vrsSelectedSearchData.vehicle_details.odometer',
      'vrsSelectedSearchData.vehicle_details.seatCapacity',
      'vrsSelectedSearchData.vehicle_details.isOver25yrs',
      'vrsSelectedSearchData.vehicle_details.isLeftHandDrive',
      'vrsSelectedSearchData.vehicle_details.isModified',
      // case 'Comment':
      'vrsSelectedSearchData.comments.freeText',
      'vrsSelectedSearchData.comments.hidden',
      'vrsSelectedSearchData.comments.kitBuilt',
      'vrsSelectedSearchData.comments.noV55NotNew',
      'vrsSelectedSearchData.comments.p30'
    ])
  },
  methods: {
    submitFormAndShowScheduleModal () {
      this.$store.dispatch('setCompleteVrsRegistrationData')
    },
    back () {
      this.$router.go(-1)
    },
    preview () {
      this.$store.commit(types.SET_SHOW_VRS_PREVIEW_MODAL, true)
      this.hasPreviewBeenViewed = true
    },
    insertPrevRegNoDateSlashes () {
      this.prevRegNoDate = insertSlash(this.prevRegNoDate)
    },
    insertDateRegInJerseySlashes () {
      this.dateRegInJersey = insertSlash(this.dateRegInJersey)
    },
    async assignRegNo () {
      let res = await this.$store.dispatch('getRegistrationNoByTypeDataVrs', { regNoType: 'DEFAULT', count: this.assignNo })
      if (res !== undefined) {
        this.regNo = res[0].registrationnumber
        this.assignNo = this.assignNo + 1
      }
    }
  },
  watch: {
    useRetained () {
      this.regNo = null
      this.retainedList = []
      if (this.useRetained) {
        this.$store.dispatch('getVrsRetainedRegNoByOwnerId')
      } else {
        this.assignNo = 0
        this.assignRegNo()
      }
    }
  },
  mounted () {
    this.isNewVrsApplication = false
  },
  destroyed () {
    this.$store.dispatch('resetVrs')
  }
}

</script>
