<template>
  <div>
    <md-dialog-confirm
      :md-active.sync="isActive"
      md-title="Confirm Status Update"
      :md-content="popupText"
      md-confirm-text="Confirm"
      md-cancel-text="Cancel"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />
    <md-table
      v-model="filteredData"
      v-if="mahaStatusRecords.length > 0"
      :table-header-color="tableHeaderColor"
      :default-count="defaultCount"
      style="flex-direction: row !important;"
      md-card>
        <md-table-row slot="md-table-row" slot-scope="{ item }" :key="item.docUUID">
          <md-table-cell md-label="Name" width="20%">{{ item.company_name !== null ? item.company_name : item.surname }}</md-table-cell>
          <md-table-cell md-label="Make" width="20%">{{ item.make }}</md-table-cell>
          <md-table-cell md-label="Model" width="20%">{{ item.model }}</md-table-cell>
          <md-table-cell md-label="Registration">{{ item.registration_number }}</md-table-cell>
          <md-table-cell md-label="Action">
            <select v-bind:id="'ddl' + item.docUUID" class="form-control dashInput2" @change="onSelected($event, item.docUUID, item.registration_number, item.permit_type)">
              <option v-for="(key, val) in ddlStatus" v-bind:key="key" :value="key">{{val}}</option>
            </select>
          </md-table-cell>
        </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'getDashPermitField',
  mutationType: 'updateDashPermitField'
})

export default {
  name: 'maha-status-table',
  props: {
    tableHeaderColor: {
      type: String,
      default: ''
    },
    defaultCount: Number
  },
  components: {},
  data () {
    return {
      ddlStatus: {
        'Please Select': '',
        'Approve': 'Approve',
        'Decline': 'Decline',
        'Re-Test': 'Re-Test'
      },
      isActive: false,
      selectedMahaStatusValue: null,
      selectedMahaStatusControlId: null,
      selectedMahaStatusDocUUID: null,
      selectedMahaStatusVehicleRegistration: null,
      selectedMahaStatusPermitType: null
    }
  },
  computed: {
    ...mapFields([
      'mahaStatusRecords'
    ]),
    popupText: function () {
      return this.getPopupText()
    },
    filteredData: function () {
      return this.mahaStatusRecords.slice(0, this.defaultCount)
    }
  },
  methods: {
    onSelected (event, docUUID, vehicleRegistration, permitType) {
      if (event.target.value !== '') {
        this.setVariableValues(event.target.value, event.target.id, docUUID, vehicleRegistration, permitType, true)
      }
    },
    async onConfirm () {
      let obj = {
        registration_number: this.selectedMahaStatusVehicleRegistration,
        maha_inspection_status: this.selectedMahaStatusValue,
        vehicleType: 'P30' // this.selectedMahaStatusPermitType === null ? 'P30' : this.selectedMahaStatusPermitType
      }
      await this.$store.dispatch('setMahaStatus', { obj: obj })
      this.setVariableValues(null, null, null, null, false)
      this.$store.dispatch('actionMahaStatusRecords')
    },
    onCancel () {
      this.setVariableValues(null, null, null, null, false)
    },
    setVariableValues (value, id, docUUID, vehicleRegistration, permitType, isActive) {
      if (value === null) {
        document.getElementById(this.selectedMahaStatusControlId).value = ''
      }
      this.selectedMahaStatusValue = value
      this.selectedMahaStatusControlId = id
      this.selectedMahaStatusDocUUID = docUUID
      this.selectedMahaStatusVehicleRegistration = vehicleRegistration
      this.selectedMahaStatusPermitType = permitType
      this.isActive = isActive
    },
    getPopupText () {
      return 'Are you sure you want to update the vehicle with registration \'' + this.selectedMahaStatusVehicleRegistration + '\' to the status of \'' + this.selectedMahaStatusValue + '\''
    }
  }
}
</script>
