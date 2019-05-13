<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header>
            <h4 class="title">Company Details</h4>
          </md-card-header>
          <md-card-content>
            <div class="table-responsive table-upgrade">
              <table class="table" cellspacing="0" id="tblDetails" style="width:95%; margin-left: auto; margin-right: auto;">
                <thead>
                <tr style="font-size: 12pt !important; color: #a2a2a2;">
                  <th class="text-left" width="10%">Permit No.</th>
                  <th class="text-left" width="20%">Company Name</th>
                  <th class="text-left" width="10%">Company No.</th>
                  <th class="text-left" width="35%">Address</th>
                  <th class="text-left" width="10%">Issue Date</th>
                  <th class="text-left" width="5%">Status</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="row in selectedSearchData" :value="row.id" :key="row.id" style="font-weight: 400;">
                  <td class="text-left">{{row.permit_number}}</td>
                  <td class="text-left">{{row.company_name}}</td>
                  <td class="text-left">{{row.holder_number}}</td>
                  <td class="text-left">{{row.address_line_1 + ', ' + row.address_line_2 + ', ' + row.parish + ', ' + row.post_code}}</td>
                  <td class="text-left">{{row.issued_date}}</td>
                  <td class="text-left">{{row.status}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </md-card-content>
        </md-card>
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50" style="float: left;">
          <md-card>
            <md-card-header>
              <h4 class="title">Vehicle Details</h4>
            </md-card-header>
            <md-card-content>
              <div class="md-layout vehicleDetails">
                <div class="display-33">
                  <label for="txtMake" class="permitStep3Label dashLabel">Make</label>
                  <input id="txtMake" class="dashInput" name="make" v-model="selectedSearchData[0].make" readonly />
                </div>
                <div class="display-33">
                  <label for="txtModel" class="permitStep3Label dashLabel">Model</label>
                  <input id="txtModel" class="dashInput" name="model" v-model="selectedSearchData[0].model" readonly />
                </div>
                <div class="display-33">
                  <label for="txtRegNo" class="permitStep3Label dashLabel">Registration Number</label>
                  <input id="txtRegNo" class="dashInput" name="registration_number" v-model="selectedSearchData[0].registration_number" readonly />
                </div>
              </div>
              <div class="md-layout vehicleDetails">
                <div class="display-33">
                  <label for="txtWidth" class="permitStep3Label dashLabel">Width (m)</label>
                  <input id="txtWidth" class="dashInput" name="oversize_vehicle_width" v-model="selectedSearchData[0].oversize_vehicle_width" readonly />
                </div>
                <div class="display-33">
                  <label for="txtHeight" class="permitStep3Label dashLabel">Height (m)</label>
                  <input id="txtHeight" class="dashInput" name="oversize_vehicle_height" v-model="selectedSearchData[0].oversize_vehicle_height" readonly />
                </div>
                <div class="display-33">
                  <label for="txtLength" class="permitStep3Label dashLabel">Length (m)</label>
                  <input id="txtLength" class="dashInput" name="oversize_vehicle_length" v-model="selectedSearchData[0].oversize_vehicle_length" readonly />
                </div>
              </div>
            </md-card-content>
          </md-card>
          <md-card v-if="selectedSearchData[0].comment !== undefined">
            <md-card-header>
              <h4 class="title">Permit Comment</h4>
            </md-card-header>
            <md-card-content>
              <div class="md-layout vehicleDetails">
                <div class="display-33">
                  <label for="txtComment" class="permitStep3Label dashLabel">Comment</label>
                  <textarea col='10' id="txtComment" class="dashInput" name="comment" v-model="selectedSearchData[0].comment" readonly />
                </div>
              </div>
            </md-card-content>
          </md-card>
        </div>
        <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50" style="float: right;">
          <md-card>
            <md-card-header>
              <md-button @click="isEditPermitConditions" class="tableBtn md-raised md-simple" style="color: #FFFFFF !important;">{{ this.editPermitConditionsButton.text }}</md-button>
              <md-button v-if="this.cancelPermitConditionsButton.show" @click="isCancelEditPermitConditions" class="tableBtn md-raised md-simple" style="color: #FFFFFF !important;">Cancel</md-button>
              <h4 class="title rightText">Permit Conditions</h4>
            </md-card-header>
            <md-card-content style="position: static;">
              <div class="table-responsive table-upgrade">
                <table class="table issueConditions" cellspacing="0" id="tblConditions">
                  <tbody>
                  <tr v-for="row in selectedIssueConditions" :value="row.condition_code" :key="row.condition_code">
                    <td class="text-left" style="vertical-align: top;">{{row.condition_code}}</td>
                    <td class="text-left" style="padding-left: 0.5em;">{{row.condition_name}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <multiselect
                id="ddlPermitConditions"
                v-if="this.editPermitConditionsButton.show"
                v-model="selectedIssueConditions"
                :options="$store.getters.getPermitConditionDropDownValues"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                open-direction="above"
                placeholder="Select one or many conditions"
                label="condition_code"
                track-by="condition_code"
                style="margin-top: 1.5em;">
                <template slot="selection" slot-scope="{ values, search, isOpen }">
                  <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span>
                </template>
              </multiselect>
            </md-card-content>
          </md-card>
          <md-card>
            <md-card-header>
              <md-button @click="isEditLaws" class="tableBtn md-raised md-simple" style="color: #FFFFFF !important;">{{ this.editLawsButton.text }}</md-button>
              <md-button v-if="this.cancelLawsButton.show" @click="isCancelEditLaws" class="tableBtn md-raised md-simple" style="color: #FFFFFF !important;">Cancel</md-button>
              <h4 class="title rightText">Laws</h4>
            </md-card-header>
            <md-card-content style="text-align: left !important; margin-left: 1em;">
              <textarea
                id="txtLaws"
                class="dashInput"
                rows="6"
                cols="93"
                v-model="selectedIssueLaws"
                :readonly="( !this.editLawsButton.show )"
                style="padding: 7px 0 0 7px; width: 98%;">
              </textarea>
            </md-card-content>
          </md-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import multiSelect from 'vue-multiselect'
import types from '../../../store/mutation-types'
import {
  IssueRenewPermitModal,
  IssueSuspendPermitModal
} from '@/components'
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'getIssuePermitField',
  mutationType: 'updateIssuePermitField'
})

export default {
  name: 'Child3',
  components: {
    IssueRenewPermitModal,
    IssueSuspendPermitModal,
    'multiselect': multiSelect
  },
  props: ['value'],
  data () {
    return {
      editPermitConditionsButton: {
        show: false,
        text: 'Edit'
      },
      cancelPermitConditionsButton: {
        show: false
      },
      editLawsButton: {
        show: false,
        text: 'Edit'
      },
      cancelLawsButton: {
        show: false
      },
      permitTempRoute: ''
    }
  },
  computed: {
    ...mapFields([
      'selectedIssueConditions',
      'selectedIssueLaws',
      'selectedSearchData'
    ])
  },
  methods: {
    isEditPermitConditions () {
      if (this.editPermitConditionsButton.show) {
        this.$store.dispatch('setPermitConditions')
        this.setButtonText(this.editPermitConditionsButton, 'Edit')
      } else {
        this.setButtonText(this.editPermitConditionsButton, 'Save')
      }
      this.setButtonState(this.editPermitConditionsButton, this.cancelPermitConditionsButton)
    },
    isCancelEditPermitConditions () {
      this.$store.commit(types.RESET_ISSUE_PERMIT_CONDITIONS.toString())
      this.setButtonText(this.editPermitConditionsButton, 'Edit')
      this.setButtonState(this.editPermitConditionsButton, this.cancelPermitConditionsButton)
    },
    isEditLaws () {
      if (this.editLawsButton.show) {
        this.$store.dispatch('setPermitLaws')
        this.setButtonText(this.editLawsButton, 'Edit')
      } else {
        this.setButtonText(this.editLawsButton, 'Save')
      }
      this.setButtonState(this.editLawsButton, this.cancelLawsButton)
    },
    isCancelEditLaws () {
      this.$store.commit(types.RESET_ISSUE_PERMIT_LAWS.toString())
      this.setButtonText(this.editLawsButton, 'Edit')
      this.setButtonState(this.editLawsButton, this.cancelLawsButton)
    },
    setButtonText (obj, text) {
      obj.text = text
    },
    setButtonState (obj1, obj2) {
      obj1.show = !obj1.show
      obj2.show = obj1.show
    }
  },
  created () {
    this.$store.dispatch('actionGetPermitConditionsIssue')
  },
  mounted: function () {
    this.$store.dispatch('actionSetStep3ButtonArray')
  }
}
</script>
