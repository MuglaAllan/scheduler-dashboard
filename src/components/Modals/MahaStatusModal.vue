<template>
  <div>
    <md-dialog :md-active.sync="showDialog" :md-backdrop="false" style="width:70%; z-index: 9;">
      <md-dialog-title style="margin: -0.8em 0 -0.5em -0.5em;">Permit Details</md-dialog-title>
      <hr class="dashSplit">
      <md-dialog-content v-for="item in selectedMahaStatusRowData" :value="item.docUUID" v-bind:key="item.docUUID">
        <div class="md-layout">
          <div class="md-layout-item">
            <label class="dashLabel">Company Number</label>
            <div class="modalDiv">{{item.company_number}}</div>
          </div>
          <div class="md-layout-item">
            <label class="dashLabel">Company Details</label>
            <div class="modalDiv">{{item.company_name}}</div>
            <div class="modalDiv" name="addr1">{{item.address_line_1}}</div>
            <div class="modalDiv" name="addr2">{{item.address_line_2}}</div>
            <div class="modalDiv" name="addr3">{{item.address_line_3}}</div>
            <div class="modalDiv" name="postCode">{{item.post_code}}</div>
          </div>
          <div class="md-layout-item">
            <label class="dashLabel">Application Date</label>
            <div class="modalDiv">{{item.timestamp}}</div>
          </div>
        </div>
        <br />
        <div class="md-layout">
          <div class="md-layout-item">
            <label class="dashLabel">Contact Name</label>
            <div class="modalDiv">{{item.surname}}</div>
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
        <hr class="dashSplit">
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
            <label class="dashLabel">Gross Weight (kg)</label>
            <div class="modalDiv">{{item.oversize_vehicle_gross_weight}}</div>
          </div>
          <div class="md-layout-item">
            <label class="dashLabel">Gross Trailer Weight (kg)</label>
            <div class="modalDiv">{{item.oversize_vehicle_trailer_gross_weight}}</div>
          </div>
          <div class="md-layout-item">
            <label class="dashLabel">Axels</label>
            <div class="modalDiv">{{item.axel_count}}</div>
          </div>
        </div>
        <hr class="dashSplit">
        <div class="md-layout">
          <div class="md-layout-item">
            <label class="dashLabel">Permission by Parish(s)</label>
            <div class="modalDiv">{{item.parish_permission}}</div>
          </div>
          <div class="md-layout-item">
            <label fclass="dashLabel">Parish(s)</label>
            <div class="modalDiv">{{item.parishs}}</div>
          </div>
          <div class="md-layout-item">
            <label class="dashLabel">Used on ring road</label>
            <div class="modalDiv">{{item.ring_road}}</div>
          </div>
        </div>
        <br />
        <div class="md-layout">
          <div class="md-layout-item">
            <label class="dashLabel">Where company operates from</label>
            <div class="modalDiv">{{item.operate_from}}</div>
          </div>
          <div class="md-layout-item">
            <label class="dashLabel">Where parked when no in use</label>
            <div class="modalDiv">{{item.where_parked}}</div>
          </div>
          <div class="md-layout-item">
            <label class="dashLabel">Why is permit required</label>
            <div class="modalDiv">{{item.why_required}}</div>
          </div>
        </div>
        <br />
        <div class="md-layout">
          <div class="md-layout-item">
            <label class="dashLabel">Who is responsible for repairs and maintenance?</label>
            <div class="modalDiv">{{item.repairs_and_maint}}</div>
          </div>
          <div class="md-layout-item">
            <label class="dashLabel">Nature of business</label>
            <div class="modalDiv">{{item.nature_of_business}}</div>
          </div>
          <div class="md-layout-item">
            <label class="dashLabel">Measures Taken</label>
            <div class="modalDiv">{{item.measures_taken}}</div>
          </div>
        </div>
      </md-dialog-content>

      <md-dialog-actions class="mdDialogActions">
        <md-button class="md-raised md-success" @click="accept()">{{ 'Approve' }}</md-button>
        <md-button class="md-raised md-warning" @click="decline()">{{ 'Re-Test' }}</md-button>
        <md-button class="md-raised md-danger" @click="decline()">{{ 'Decline' }}</md-button>
        <md-button class="md-raised md-simple" @click="close()">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'getDashPermitField',
  mutationType: 'updateDashPermitField'
})

export default {
  name: 'maha-status-modal',
  props: [ 'showMahaStatusModal' ],
  data () {
    return {
      showDialog: false
    }
  },
  computed: {
    ...mapFields([
      'selectedMahaStatusRowData'
    ])
  },
  watch: {
    showMahaStatusModal () {
      this.showDialog = this.showMahaStatusModal
    }
  },
  methods: {
    accept () {
      this.$store.dispatch('actionShowAcceptModal')
    },
    decline () {
      this.$store.dispatch('actionShowDeclineModal')
    },
    close () {
      this.$store.dispatch('actionHideDashModal')
    }
  },
  beforeCreate: function () {
    this.$options.components.DashPermitAcceptModal = require('./DashPermitAcceptModal.vue').default
    this.$options.components.DashPermitDeclineModal = require('./DashPermitDeclineModal.vue').default
  }
}
</script>
