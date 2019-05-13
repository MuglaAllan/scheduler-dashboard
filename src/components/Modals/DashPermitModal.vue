<template>
  <div>
    <dash-permit-accept-modal :showIssueAcceptModal="showAcceptModal" />
    <dash-permit-decline-modal :showIssueDeclineModal="showDeclineModal" />
    <dash-permit-reactivate-modal :showIssueDeclineModal="showReactivateModal" />
    <parish-approve-decline-modal :showParishAcceptDeclineModal="showParishAcceptDeclineModal" />
    <div style="position: relative;">
      <md-dialog :md-active.sync="showDialog" :md-backdrop="false" style="width:60%; z-index: 9; min-height: 50%; max-height: 90%;">
        <md-dialog-title style="margin: -0.8em 0 -0.5em -0.5em;">Permit Details</md-dialog-title>
        <hr class="dashSplit">
        <md-dialog-content v-for="item in selectedDashRowData" :value="item.docUUID" v-bind:key="item.docUUID">
          <nav-tabs-card style="position: relative;">
            <template slot="content">
              <md-tabs md-sync-route class="md-success" md-alignment="left">
                <md-tab id="tab-user" md-label="User" md-icon="person">
                  <div>
                    <div class="md-layout">
                      <div class="md-layout-item">
                        <label class="dashLabel">Contact Name</label>
                        <div class="modalDiv">{{ (item.firstnames === undefined ? '' : item.firstnames) + ' ' + (item.surname === undefined ? '' : item.surname) }}</div>
                      </div>
                      <div class="md-layout-item">
                        <label class="dashLabel">Company Details</label>
                        <div class="modalDiv">{{item.company_name}}</div>
                        <div v-if="item.address_line_1 !== undefined" class="modalDiv" name="addr1">{{item.address_line_1}}</div>
                        <div v-if="item.address_line_2 !== undefined" class="modalDiv" name="addr2">{{item.address_line_2}}</div>
                        <div v-if="item.address_line_3 !== undefined" class="modalDiv" name="addr3">{{item.address_line_3}}</div>
                        <div v-if="item.post_code !== undefined" class="modalDiv" name="postCode">{{item.post_code}}</div>
                      </div>
                      <div class="md-layout-item">
                        <label class="dashLabel">Last Updated</label>
                        <div class="modalDiv">{{item.timestamp}}</div>
                      </div>
                    </div>
                    <br />
                    <div class="md-layout">
                      <div class="md-layout-item">
                        <label class="dashLabel">Email</label>
                        <div class="modalDiv"> <a v-bind:href="'mailto:' + item.email">{{item.email}}</a></div>
                      </div>
                      <div class="md-layout-item">
                        <label class="dashLabel">Contact Phone</label>
                        <div class="modalDiv">{{item.contact_phone}}</div>
                      </div>
                      <div class="md-layout-item">
                        <label class="dashLabel">Status</label>
                        <div class="modalDiv">{{item.status}}</div>
                      </div>
                    </div>
                  </div>
                </md-tab>
                <md-tab id="tab-vehicle" md-label="Vehicle" md-icon="directions_car">
                  <div>
                    <div class="md-layout">
                      <div class="md-layout-item">
                        <label class="dashLabel">Make</label>
                        <div class="modalDiv">{{item.make}}</div>
                      </div>
                      <div class="md-layout-item">
                        <label class="dashLabel">Model</label>
                        <div class="modalDiv">{{item.model}}</div>
                      </div>
                      <div class="md-layout-item">
                        <label class="dashLabel">Registration Number</label>
                        <div class="modalDiv">{{item.registration_number}}</div>
                      </div>
                    </div>
                    <br />
                    <div class="md-layout">
                      <div class="md-layout-item">
                        <label class="dashLabel">Width (m)</label>
                        <div class="modalDiv">{{item.oversize_vehicle_width}}</div>
                      </div>
                      <div class="md-layout-item">
                        <label class="dashLabel">Height (m)</label>
                        <div class="modalDiv">{{item.oversize_vehicle_height}}</div>
                      </div>
                      <div class="md-layout-item">
                        <label class="dashLabel">Length (m)</label>
                        <div class="modalDiv">{{item.oversize_vehicle_length}}</div>
                      </div>
                    </div>
                    <br />
                    <div class="md-layout">
                      <div class="md-layout-item">
                        <label class="dashLabel">Gross Vehicle Weight (kg)</label>
                        <div class="modalDiv" name="gross_vehicle_weight">{{item.gross_weight_kg}}</div>
                      </div>
                      <div class="md-layout-item">
                        <label class="dashLabel">Axel Weights (kg)</label>
                        <div class="modalDiv" name="axel_weights">
                          <div v-if="getAxelWeightValue(item.axle_weight_kg_1)">Axel 1 - {{item.axle_weight_kg_1}}</div>
                          <div v-if="getAxelWeightValue(item.axle_weight_kg_2)">Axel 2 - {{item.axle_weight_kg_2}}</div>
                          <div v-if="getAxelWeightValue(item.axle_weight_kg_3)">Axel 3 - {{item.axle_weight_kg_3}}</div>
                          <div v-if="getAxelWeightValue(item.axle_weight_kg_4)">Axel 4 - {{item.axle_weight_kg_4}}</div>
                          <div v-if="getAxelWeightValue(item.axle_weight_kg_5)">Axel 5 - {{item.axle_weight_kg_5}}</div>
                          <div v-if="getAxelWeightValue(item.axle_weight_kg_6)">Axel 6 - {{item.axle_weight_kg_6}}</div>
                        </div>
                      </div>
                      <div class="md-layout-item">
                        <label class="dashLabel">Gross Trailer Weight (kg)</label>
                        <div class="modalDiv" name="gross_trailer_weights">{{item.gross_trailer_weight}}</div>
                      </div>
                    </div>
                  </div>
                </md-tab>
                <md-tab id="tab-permit-details" md-label="Details" md-icon="assignment">
                  <div>
                    <div class="md-layout" v-if="item.permit_period === 'Temporary'">
                      <div class="md-layout-item">
                        <label class="dashLabel">Permit Start Date / Time</label>
                        <div class="modalDiv">{{new Date(item.start_date).toLocaleDateString("en-GB") + ' ' + item.permit_starttime}}</div>
                      </div>
                      <div class="md-layout-item">
                        <label class="dashLabel">Permit End Date / Time</label>
                        <div class="modalDiv">{{new Date(item.end_date).toLocaleDateString("en-GB") + ' ' + item.permit_endtime}}</div>
                      </div>
                      <div class="md-layout-item">
                        <label class="dashLabel">Used on ring road</label>
                        <div class="modalDiv">{{item.townringroad ? 'True' : 'False'}}</div>
                      </div>
                    </div>
                    <br />
                    <div class="md-layout" v-if="item.permit_period !== 'Temporary'">
                      <div class="md-layout-item">
                        <label class="dashLabel">Where company operates from</label>
                        <div class="modalDiv">{{item.operate_from}}</div>
                      </div>
                      <div class="md-layout-item">
                        <label class="dashLabel">Nature of business</label>
                        <div class="modalDiv">{{item.nature_of_business}}</div>
                      </div>
                      <div class="md-layout-item">
                        <label class="dashLabel">Where parked when no in use</label>
                        <div class="modalDiv">{{item.where_parked}}</div>
                      </div>
                    </div>
                    <br />
                    <div class="md-layout" v-if="item.permit_period !== 'Temporary'">
                      <div class="md-layout-item">
                        <label class="dashLabel">Why is permit required</label>
                        <div class="modalDiv">{{item.why_required}}</div>
                      </div>
                      <div class="md-layout-item">
                        <label class="dashLabel">Who is responsible for repairs and maintenance?</label>
                        <div class="modalDiv">{{item.repairs_and_maint}}</div>
                      </div>
                      <div class="md-layout-item">
                        <label class="dashLabel">Measures Taken</label>
                        <div class="modalDiv">{{item.measures_taken}}</div>
                      </div>
                    </div>
                    <br />
                    <div class="md-layout" v-if="item.permit_period === 'Temporary'">
                      <div class="md-layout-item" style="width: 100%; text-align: justify;">
                        <label class="dashLabel">Route Survey</label>
                        <div class="modalDiv">{{item.route_servey}}</div>
                      </div>
                    </div>
                  </div>
                </md-tab>
                <md-tab v-if="item.parish_permission" id="tab-permissions" md-label="Permissions" md-icon="block">
                  <div>
                    <div class="md-layout">
                      <div class="md-layout-item">
                        <label class="dashLabel">Permission by Parish(s)</label>
                        <div class="modalDiv">{{item.parish_permission ? 'True' : 'False'}}</div>
                      </div>
                      <div class="md-layout-item">
                        <label fclass="dashLabel">Parish(es) - Approved: <i>{{parishData()}}%</i></label>
                        <div class="modalDiv divHover"
                             v-for="row in item.parishes" :value="row.parish" :key="row.parish"
                             v-on:click="onParishSelected(row.parish)"
                             v-bind:style="{ 'color': '#' + (row.responded ? '009900' : 'FF0000') }"
                             v-bind:title="'Comment: ' + row.comment">
                          {{parishName.find(a => a.value === row.parish).title}}
                        </div>
                      </div>
                    </div>
                  </div>
                </md-tab>
              </md-tabs>
            </template>
          </nav-tabs-card>
        </md-dialog-content>
        <md-dialog-actions class="mdDialogActions">
          <md-button v-if="isSuspend && !isParish" class="md-raised md-success" @click="reactivate()">Re-Activate</md-button>
          <md-button v-if="!isSuspend && !isParish" class="md-raised md-success" @click="accept()">Approve</md-button>
          <md-button v-if="!isParish" class="md-raised md-danger" @click="decline()">{{ isSuspend ? 'Revoke' : 'Decline'}}</md-button>
          <md-button class="md-raised md-simple" @click="close()">Close</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
  </div>
</template>
<script>
import {
  NavTabsCard,
  DashPermitDeclineModal,
  DashPermitAcceptModal,
  DashPermitReactivateModal,
  ParishApproveDeclineModal
} from '@/components'

import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'getDashPermitField',
  mutationType: 'updateDashPermitField'
})

export default {
  name: 'dash-permit-modal',
  props: [ 'showIssueModal' ],
  components: {
    NavTabsCard,
    DashPermitDeclineModal,
    DashPermitAcceptModal,
    DashPermitReactivateModal,
    ParishApproveDeclineModal
  },
  data () {
    return {
      ddlStatus: {
        'Approved': true,
        'Declined': false
      },
      parishName: [
        { value: 'sthelier', title: 'St Helier' },
        { value: 'grouville', title: 'Grouville' },
        { value: 'stbrelade', title: 'St Brelade' },
        { value: 'stclement', title: 'St Clement' },
        { value: 'stjohn', title: 'St John' },
        { value: 'stlawrence', title: 'St Lawrence' },
        { value: 'stmartin', title: 'St Martin' },
        { value: 'stmary', title: 'St Mary' },
        { value: 'stouen', title: 'St Ouen' },
        { value: 'stpeter', title: 'St Peter' },
        { value: 'stsaviour', title: 'St Saviour' },
        { value: 'trinity', title: 'Trinity' }
      ],
      showDialog: false
    }
  },
  computed: {
    ...mapFields([
      'selectedDashRowData',
      'showAcceptModal',
      'showDeclineModal',
      'showReactivateModal',
      'showParishAcceptDeclineModal',
      'isSuspend',
      'selectedParish',
      'selectedParishDisplay',
      'selectedParishStatus',
      'selectedParishComment',
      'isBackgroundVisible',
      'isParish'
    ])
  },
  watch: {
    showIssueModal () {
      this.showDialog = this.showIssueModal
    }
  },
  methods: {
    accept () {
      this.$store.dispatch('actionShowAcceptModal')
    },
    decline () {
      this.$store.dispatch('actionShowDeclineModal')
    },
    reactivate () {
      this.$store.dispatch('actionShowReactivateModal')
    },
    close () {
      this.$store.dispatch('actionHideDashModal')
      this.isBackgroundVisible = true
    },
    onParishSelected (parish) {
      this.selectedParish = parish
      this.selectedParishDisplay = this.parishName.find(a => a.value === parish).title
      let parishData = this.selectedDashRowData[0].parishes.find(b => b.parish === parish)
      this.selectedParishStatus = parishData.responded
      this.selectedParishComment = parishData.comment
      this.$store.dispatch('actionShowParishAcceptDeclineModal')
    },
    parishData () {
      let parishData = this.selectedDashRowData[0].parishes
      if (parishData !== undefined && parishData.length > 0) {
        let parishFilteredData = parishData.filter(function (item) {
          return item.responded === true
        }).length
        return Math.round(((parishFilteredData / parishData.length) * 100))
      } else {
        return 0
      }
    },
    getAxelWeightValue (value) {
      return (value !== undefined && value > 0)
    }
  },
  beforeCreate: function () {
    this.$options.components.DashPermitAcceptModal = require('./DashPermitAcceptModal.vue').default
    this.$options.components.DashPermitDeclineModal = require('./DashPermitDeclineModal.vue').default
    this.$options.components.ParishApproveDeclineModal = require('./ParishApproveDeclineModal.vue').default
  }
}
</script>
