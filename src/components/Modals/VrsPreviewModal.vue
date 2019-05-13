<template>
  <div class="previewForm">
    <md-dialog :md-active.sync="showVrsPreviewModal" :md-backdrop="false" style="width:70%; z-index:10;">
      <md-dialog-content>
        <nav-tabs-card style="position: relative;">
          <template slot="content">
            <md-tabs md-sync-route class="md-warning" md-alignment="left">
              <md-tab id="tab-owner" md-label="Owner Details" md-icon="person">
                <div class="md-layout belowPadding">
                  <div class="md-layout-item md-small-size-100 md-size-25">
                    <label>Title</label>
                    <select id="ddlTitle" v-model="vrsSelectedSearchData.owner_details.title" class="dashInputVrs" :disabled="editOwnerDetailsButton.show === false">
                      <option v-for="item in localDdlTitle" v-bind:key="item.id" :value="item.id">{{item.value}}</option>
                    </select>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-25" v-if="!isCompany">
                    <label>Give Names</label>
                    <input v-model="vrsSelectedSearchData.owner_details.forenames" class="dashInput" type="text" :readonly="editOwnerDetailsButton.show === false" />
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-25" v-if="!isCompany">
                    <label>Initials</label>
                    <input v-model="vrsSelectedSearchData.owner_details.initials" class="dashInput" type="text" :readonly="editOwnerDetailsButton.show === false" />
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-25">
                    <label>{{surnameLabelTitle}}</label>
                    <input v-model="vrsSelectedSearchData.owner_details.surname" class="dashInput" type="text" :readonly="editOwnerDetailsButton.show === false" />
                  </div>
                </div>
                <div class="md-layout belowPadding">
                  <div class="md-layout-item md-small-size-100 md-size-25">
                    <label>Date of Birth</label>
                    <input v-model="vrsSelectedSearchData.owner_details.dob" class="dashInput" type="text" :readonly="editOwnerDetailsButton.show === false" />
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-25">
                    <label>Email</label>
                    <input v-model="vrsSelectedSearchData.owner_details.emailAddress" class="dashInput" type="text" :readonly="editOwnerDetailsButton.show === false" />
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-25">
                    <label>Mobile Phone No.</label>
                    <input v-model="vrsSelectedSearchData.owner_details.mobilePhone" class="dashInput" type="text" :readonly="editOwnerDetailsButton.show === false" />
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-25">
                    <label>Landline No.</label>
                    <input v-model="vrsSelectedSearchData.owner_details.homePhone" class="dashInput" type="text" :readonly="editOwnerDetailsButton.show === false" />
                  </div>
                </div>
                <div class="md-layout belowPadding">
                  <div class="md-layout-item md-small-size-100 md-size-20">
                    <label class="permitStep3Label dashLabel">Address</label>
                    <input id="txtAddress1" class="dashInput" v-model="vrsSelectedSearchData.owner_details.address1" :readonly="editOwnerDetailsButton.show === false" />
                    <input id="txtAddress2" class="dashInput" v-model="vrsSelectedSearchData.owner_details.address2" :readonly="editOwnerDetailsButton.show === false" />
                    <input id="txtAddress3" class="dashInput" v-model="vrsSelectedSearchData.owner_details.address3" :readonly="editOwnerDetailsButton.show === false" />
                    <select id="ddlParish" v-model="vrsSelectedSearchData.owner_details.parish" class="dashInputVrs" :disabled="editOwnerDetailsButton.show === false">
                      <option v-for="item in localDdlParish" v-bind:key="item.id" :value="item.id">{{item.value}}</option>
                    </select>
                    <input id="txtPostCode" class="dashInput" v-model="vrsSelectedSearchData.owner_details.postCode" :readonly="editOwnerDetailsButton.show === false" />
                  </div>
                </div>
                <div class="md-layout belowPadding">
                  <div class="md-layout-item md-small-size-100 md-size-25">
                    <label>License No.</label>
                    <input v-model="vrsSelectedSearchData.owner_details.licenseNo" class="dashInput" type="text" :readonly="editOwnerDetailsButton.show === false" />
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-25">
                    <label>First Registered on VRD1</label>
                    <input v-model="vrsSelectedSearchData.owner_details.firstRegOnVrd1" class="dashInput" type="text" :readonly="editOwnerDetailsButton.show === false" />
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-25">
                    <label>Is For Sale</label>
                    <input v-model="vrsSelectedSearchData.owner_details.isForSale" class="dashInput" type="text" :readonly="editOwnerDetailsButton.show === false" />
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-25">
                    <label>Is For Hire</label>
                    <input v-model="vrsSelectedSearchData.owner_details.isForHire" class="dashInput" type="text" :readonly="editOwnerDetailsButton.show === false" />
                  </div>
                </div>
                <div class="buttonDiv">
                  <md-button @click="isEdit(editOwnerDetailsButton, cancelOwnerDetailsButton, 'OwnerDetails')" class="tableBtn md-raised" v-bind:class="editOwnerDetailsButton.class" style="margin-right: 1em;">{{ this.editOwnerDetailsButton.text }}</md-button>
                  <md-button v-if="this.cancelOwnerDetailsButton.show" @click="isCancel(editOwnerDetailsButton, cancelOwnerDetailsButton, 'OwnerDetails')" class="tableBtn md-raised md-simple">Cancel</md-button>
                </div>
              </md-tab>
              <md-tab id="tab-vehicle" md-label="Vehicle Details" md-icon="directions_car">
                <div>
                  <div class="md-layout belowPadding">
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Registration No.</label>
                      <input v-model="vrsSelectedSearchData.vehicle_details.regNo" class="dashInput" type="text" :readonly="editVehicleDetailsButton.show === false" />
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Category</label>
                      <select id="ddlCategories" v-model="vrsSelectedSearchData.vehicle_details.vehicleCategory" class="dashInputVrs" :disabled="editVehicleDetailsButton.show === false">
                        <option v-for="item in localDdlCategories" v-bind:key="item.id" :value="item.id">{{item.value}}</option>
                      </select>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Sub-Category</label>
                      <select id="ddlSubCategories" v-model="vrsSelectedSearchData.vehicle_details.vehicleSubCategory" class="dashInputVrs" :disabled="editVehicleDetailsButton.show === false">
                        <option v-for="item in localDdlSubCategories" v-bind:key="item.id" :value="item.id">{{item.value}}</option>
                      </select>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Body Type</label>
                      <input v-model="vrsSelectedSearchData.vehicle_details.vehicleBodyType" class="dashInput" type="text" :readonly="editVehicleDetailsButton.show === false" />
                    </div>
                  </div>
                  <div class="md-layout belowPadding">
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Make</label>
                      <input v-model="vrsSelectedSearchData.vehicle_details.vehicleMake" class="dashInput" type="text" :readonly="editVehicleDetailsButton.show === false" />
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Model</label>
                      <input v-model="vrsSelectedSearchData.vehicle_details.vehicleModel" type="text" :readonly="editVehicleDetailsButton.show === false" />
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Manufacture Year</label>
                      <input v-model="vrsSelectedSearchData.vehicle_details.vehicleManufactureDate" class="dashInput" type="text" :readonly="editVehicleDetailsButton.show === false" />
                    </div>
                  </div>
                  <div class="md-layout belowPadding">
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Width (m)</label>
                      <input v-model="vrsSelectedSearchData.vehicle_details.vehicleWidth" class="dashInput" type="text" :readonly="editVehicleDetailsButton.show === false" />
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Height (m)</label>
                      <input v-model="vrsSelectedSearchData.vehicle_details.vehicleHeight" class="dashInput" type="text" :readonly="editVehicleDetailsButton.show === false" />
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Length (m)</label>
                      <input v-model="vrsSelectedSearchData.vehicle_details.vehicleLength" class="dashInput" type="text" :readonly="editVehicleDetailsButton.show === false" />
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Colour</label>
                      <select id="ddlColour" v-model="vrsSelectedSearchData.vehicle_details.primaryColour" class="dashInputVrs" :disabled="editVehicleDetailsButton.show === false">
                        <option v-for="item in localDdlColour" v-bind:key="item.id" :value="item.id">{{item.value}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="md-layout belowPadding">
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>CC</label>
                      <input v-model="vrsSelectedSearchData.vehicle_details.cubicCapacity" class="dashInput" type="text" :readonly="editVehicleDetailsButton.show === false" />
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>CO2</label>
                      <input v-model="vrsSelectedSearchData.vehicle_details.co2" class="dashInput" type="text" :readonly="editVehicleDetailsButton.show === false" />
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Transmission</label>
                      <select id="ddlTransmission" v-model="vrsSelectedSearchData.vehicle_details.transmission" class="dashInputVrs" :disabled="editVehicleDetailsButton.show === false">
                        <option v-for="item in localDdlTransmission" v-bind:key="item.id" :value="item.id">{{item.value}}</option>
                      </select>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Fuel Type</label>
                      <select id="ddlFuelType" v-model="vrsSelectedSearchData.vehicle_details.fuelType" class="dashInputVrs" :disabled="editVehicleDetailsButton.show === false">
                        <option v-for="item in localDdlFuelTypes" v-bind:key="item.id" :value="item.id">{{item.value}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="md-layout belowPadding">
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>VIN / Chassis No.</label>
                      <input v-model="vrsSelectedSearchData.vehicle_details.chassisNo" class="dashInput" type="text" :readonly="editVehicleDetailsButton.show === false" />
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Engine No.</label>
                      <input v-model="vrsSelectedSearchData.vehicle_details.engineNo" class="dashInput" type="text" :readonly="editVehicleDetailsButton.show === false" />
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Weight</label>
                      <input v-model="vrsSelectedSearchData.vehicle_details.weight" class="dashInput" type="text" :readonly="editVehicleDetailsButton.show === false" />
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Unladen Weight</label>
                      <input v-model="vrsSelectedSearchData.vehicle_details.unladenWeight" class="dashInput" type="text" :readonly="editVehicleDetailsButton.show === false" />
                    </div>
                  </div>
                  <div class="md-layout belowPadding">
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Door No.</label>
                      <input v-model="vrsSelectedSearchData.vehicle_details.doorNo" class="dashInput" type="text" :readonly="editVehicleDetailsButton.show === false" />
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Is Type Approved</label>
                      <select id="ddlIsTypeApproved" v-model="vrsSelectedSearchData.vehicle_details.isTypeApproved" class="dashInputVrs" :disabled="editVehicleDetailsButton.show === false">
                        <option v-for="item in localDdlYesNo" v-bind:key="item.id" :value="item.id">{{item.value}}</option>
                      </select>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25" v-if="vrsSelectedSearchData.vehicle_details.isTypeApproved === true">
                      <label>Type Approved No.</label>
                      <input v-model="vrsSelectedSearchData.vehicle_details.typeApprovalNo" class="dashInput" type="text" :readonly="editVehicleDetailsButton.show === false" />
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Odometer</label>
                      <input v-model="vrsSelectedSearchData.vehicle_details.odometer" class="dashInput" type="text" :readonly="editVehicleDetailsButton.show === false" />
                    </div>
                  </div>
                  <div class="md-layout belowPadding">
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Seating Capacity</label>
                      <input v-model="vrsSelectedSearchData.vehicle_details.seatCapacity" class="dashInput" type="text" :readonly="editVehicleDetailsButton.show === false" />
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Is Vehicle over 25 years</label>
                      <select id="ddlIsVehicleOver25" v-model="vrsSelectedSearchData.vehicle_details.isOver25yrs" class="dashInputVrs" :disabled="editVehicleDetailsButton.show === false">
                        <option v-for="item in localDdlYesNo" v-bind:key="item.id" :value="item.id">{{item.value}}</option>
                      </select>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Is Vehicle Left Hand Drive</label>
                      <select id="ddlIsVehicleLeftHandDrive" v-model="vrsSelectedSearchData.vehicle_details.isLeftHandDrive" class="dashInputVrs" :disabled="editVehicleDetailsButton.show === false">
                        <option v-for="item in localDdlYesNo" v-bind:key="item.id" :value="item.id">{{item.value}}</option>
                      </select>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Is Vehicle Modified</label>
                      <select id="ddlIsVehicleModified" v-model="vrsSelectedSearchData.vehicle_details.isModified" class="dashInputVrs" :disabled="editVehicleDetailsButton.show === false">
                        <option v-for="item in localDdlYesNo" v-bind:key="item.id" :value="item.id">{{item.value}}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="buttonDiv">
                  <md-button @click="isEdit(editVehicleDetailsButton, cancelVehicleDetailsButton, 'VehicleDetails')" class="tableBtn md-raised" v-bind:class="editVehicleDetailsButton.class" style="margin-right: 1em;">{{ this.editVehicleDetailsButton.text }}</md-button>
                  <md-button v-if="this.cancelVehicleDetailsButton.show" @click="isCancel(editVehicleDetailsButton, cancelVehicleDetailsButton, 'VehicleDetails')" class="tableBtn md-raised md-simple">Cancel</md-button>
                </div>
              </md-tab>
              <md-tab id="tab-registration" md-label="Registration Details" md-icon="assignment">
                <div>
                  <div class="md-layout belowPadding">
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Status</label>
                      <!--<input v-model="vrsSelectedSearchData.registration_details.status" class="dashInput" type="text" :readonly="editRegistrationDetailsButton.show === false" />-->
                      <select id="ddlRegStatus" v-model="vrsSelectedSearchData.registration_details.status" class="dashInputVrs" :disabled="editRegistrationDetailsButton.show === false">
                        <option v-for="item in localDdlStatus" v-bind:key="item.id" :value="item.id" :disabled="item.disabled">{{item.value}}</option>
                      </select>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Previous Registration No.</label>
                      <input v-model="vrsSelectedSearchData.registration_details.prevRegNo" class="dashInput" type="text" :readonly="editRegistrationDetailsButton.show === false" />
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>First Ever Registration Date</label>
                      <input v-model="vrsSelectedSearchData.registration_details.firstEverRegDate" class="dashInput" type="text" :readonly="editRegistrationDetailsButton.show === false" />
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Date Registered in Jersey</label>
                      <input v-model="vrsSelectedSearchData.registration_details.dateRegInJersey" class="dashInput" type="text" :readonly="editRegistrationDetailsButton.show === false" />
                    </div>
                  </div>
                  <div class="md-layout belowPadding">
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Previous Registration No. Date</label>
                      <input v-model="vrsSelectedSearchData.registration_details.prevRegNoDate" class="dashInput" type="text" :readonly="editRegistrationDetailsButton.show === false" />
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Previous Registration Country</label>
                      <input v-model="vrsSelectedSearchData.registration_details.prevRegCountry" class="dashInput" type="text" :readonly="editRegistrationDetailsButton.show === false" />
                    </div>
                  </div>
                </div>
                <div class="buttonDiv">
                  <md-button @click="isEdit(editRegistrationDetailsButton, cancelRegistrationDetailsButton, 'RegistrationDetails')" class="tableBtn md-raised" v-bind:class="editRegistrationDetailsButton.class" style="margin-right: 1em;">{{ this.editRegistrationDetailsButton.text }}</md-button>
                  <md-button v-if="this.cancelRegistrationDetailsButton.show" @click="isCancel(editRegistrationDetailsButton, cancelRegistrationDetailsButton, 'RegistrationDetails')" class="tableBtn md-raised md-simple">Cancel</md-button>
                </div>
              </md-tab>
              <md-tab id="tab-comment" md-label="Comments" md-icon="message">
                <div>
                  <div class="md-layout belowPaddingXtra">
                    <div class="md-layout-item md-small-size-100 md-size-50">
                      <label>Free Text</label>
                      <textarea id="txtFreeText" class="dashInput dashInputVrsPreview" v-model="vrsSelectedSearchData.comments.freeText" :readonly="editCommentButton.show === false"></textarea>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                      <label>Hidden</label>
                      <textarea id="txtHidden" class="dashInput dashInputVrsPreview" v-model="vrsSelectedSearchData.comments.hidden" :readonly="editCommentButton.show === false"></textarea>
                    </div>
                  </div>
                  <div class="md-layout belowPadding">
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>Kit Built</label>
                      <input v-model="vrsSelectedSearchData.comments.kitBuilt" class="dashInput" type="text" :readonly="editCommentButton.show === false" />
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>No. V55 Not New</label>
                      <input v-model="vrsSelectedSearchData.comments.noV55NotNew" class="dashInput" type="text" :readonly="editCommentButton.show === false" />
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-25">
                      <label>P30</label>
                      <input v-model="vrsSelectedSearchData.comments.p30" class="dashInput" type="text" :readonly="editCommentButton.show === false" />
                    </div>
                  </div>
                </div>
                <div class="buttonDiv">
                  <md-button @click="isEdit(editCommentButton, cancelCommentButton, 'Comment')" class="tableBtn md-raised" v-bind:class="editCommentButton.class" style="margin-right: 1em;">{{ this.editCommentButton.text }}</md-button>
                  <md-button v-if="this.cancelCommentButton.show" @click="isCancel(editCommentButton, cancelCommentButton, 'Comment')" class="tableBtn md-raised md-simple">Cancel</md-button>
                </div>
              </md-tab>
              <md-tab id="tab-miscellaneous" md-label="Miscellaneous" md-icon="stars">
                <div>
                  <div class="md-layout belowPadding">
                    <div class="md-layout-item md-small-size-100 md-size-33">
                      <label>Agent Code</label>
                      <input v-model="vrsSelectedSearchData.miscellaneous.agentCode" class="dashInput" type="text" :readonly="editMiscellaneousButton.show === false" />
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-33">
                      <label>Link to Owner</label>
                      <input v-model="vrsSelectedSearchData.miscellaneous.linkToOwner" class="dashInput" type="text" :readonly="editMiscellaneousButton.show === false" />
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-33">
                      <label>Declaration No.</label>
                      <input v-model="vrsSelectedSearchData.miscellaneous.declNo" class="dashInput" type="text" :readonly="editMiscellaneousButton.show === false" />
                    </div>
                  </div>
                  <div class="md-layout">
                    <div class="md-layout-item md-small-size-100 md-size-33">
                      <label>Duty Paid</label>
                      <input v-model="vrsSelectedSearchData.miscellaneous.dutyPaid" class="dashInput" type="text" :readonly="editMiscellaneousButton.show === false" />
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-33">
                      <label>Inspection Receipt No.</label>
                      <input v-model="vrsSelectedSearchData.miscellaneous.receiptNoInspection" class="dashInput" type="text" :readonly="editMiscellaneousButton.show === false" />
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-33">
                      <label>Inspection Receipt No.</label>
                      <input v-model="vrsSelectedSearchData.miscellaneous.receiptNoRegistration" class="dashInput" type="text" :readonly="editMiscellaneousButton.show === false" />
                    </div>
                  </div>
                </div>
                <div class="buttonDiv">
                  <md-button @click="isEdit(editMiscellaneousButton, cancelMiscellaneousButton, 'Miscellaneous')" class="tableBtn md-raised" v-bind:class="editMiscellaneousButton.class" style="margin-right: 1em;">{{ this.editMiscellaneousButton.text }}</md-button>
                  <md-button v-if="this.cancelMiscellaneousButton.show" @click="isCancel(editMiscellaneousButton, cancelMiscellaneousButton, 'Miscellaneous')" class="tableBtn md-raised md-simple">Cancel</md-button>
                </div>
              </md-tab>
            </md-tabs>
          </template>
        </nav-tabs-card>
        <md-button class="md-raised md-simple" @click="close()" style="float: right; margin: -0.5em 0.5em -0.5em 0;">Close</md-button>
      </md-dialog-content>
    </md-dialog>
  </div>
</template>
<script>
import { createHelpers } from 'vuex-map-fields'
import { NavTabsCard } from '@/components'
import types from '../../store/mutation-types'
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
} from '../Functions/DropDownLists.js'

const { mapFields } = createHelpers({
  getterType: 'getVrsField',
  mutationType: 'updateVrsField'
})

export default {
  name: 'vrs-preview-modal',
  props: [ 'showVrsPreviewModalProp' ],
  components: { NavTabsCard },
  data () {
    return {
      editOwnerDetailsButton: { show: false, text: 'Edit', class: 'md-simple' },
      cancelOwnerDetailsButton: { show: false },
      editVehicleDetailsButton: { show: false, text: 'Edit', class: 'md-simple' },
      cancelVehicleDetailsButton: { show: false },
      editRegistrationDetailsButton: { show: false, text: 'Edit', class: 'md-simple' },
      cancelRegistrationDetailsButton: { show: false },
      editCommentButton: { show: false, text: 'Edit', class: 'md-simple' },
      cancelCommentButton: { show: false },
      editMiscellaneousButton: { show: false, text: 'Edit', class: 'md-simple' },
      cancelMiscellaneousButton: { show: false },
      showVrsPreviewModal: false,
      receiptNo: null,
      surnameLabelTitle: 'Surname',
      isCompany: false,
      localDdlTitle: ddlTitle(),
      localDdlParish: ddlParish(),
      localDdlTransmission: ddlTransmission(),
      localDdlStatus: ddlVrsStatus([]),
      localDdlCategories: ddlCategories(),
      localDdlSubCategories: ddlSubCategories(),
      localDdlFuelTypes: ddlFuelTypes(),
      localDdlVehicleOwnership: ddlVehicleOwnership(),
      localDdlColour: ddlColours(),
      localDdlYesNo: ddlYesNo()
    }
  },
  computed: {
    ...mapFields([
      'vrsSelectedSearchData'
    ])
  },
  watch: {
    showVrsPreviewModalProp () {
      this.showVrsPreviewModal = this.showVrsPreviewModalProp
    }
  },
  methods: {
    close () {
      this.$store.commit(types.SET_SHOW_VRS_PREVIEW_MODAL, false)
    },
    isEdit (editButton, cancelButton) {
      if (editButton.show) {
        // this.$store.dispatch('setVrsDataBySection', sectionTitle)
        this.setButtonText(editButton, 'Edit', 'md-simple')
      } else {
        this.setButtonText(editButton, 'Confirm', 'md-success')
      }
      this.setButtonState(editButton, cancelButton)
    },
    isCancel (editButton, cancelButton, title) {
      this.determineWhatAction(title)
      this.setButtonText(editButton, 'Edit', 'md-simple')
      this.setButtonState(editButton, cancelButton)
    },
    determineWhatAction (sectionTitle) {
      this.$store.dispatch('resetVrsDataBySection', sectionTitle)
    },
    setButtonText (obj, text, btnClass) {
      obj.text = text
      obj.class = btnClass
    },
    setButtonState (obj1, obj2) {
      obj1.show = !obj1.show
      obj2.show = obj1.show
    }
  }
}
</script>

<style>
  div.previreForm input, label {
    display:block;
  }
  div.belowPadding {
    margin-bottom: 1.5em;
  }
  div.belowPaddingXtra {
    margin-bottom: 2.5em;
  }
  div.buttonDiv {
    float: right;
    margin-top: 1em;
    margin-bottom: 0.5em;
  }
  input {
    border: none;
    font-size: 11pt;
  }
</style>
