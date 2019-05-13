<template>
  <div>
    <md-table
      v-model="tableData"
      :table-header-color="tableHeaderColor"
      :default-count="defaultCount"
      style="flex-direction: row !important; margin-top: 1em;"
      md-card>
      <md-table-toolbar>
        <div style="width: 79%;">
          <md-field class="md-toolbar-section-end">
            <md-input placeholder="Search..." v-model="searchText" @input="searchFor" />
          </md-field>
        </div>
        <div style="margin-left: 1.5vw;">
          <md-button class="md-dense md-raised md-simple" @click="clearSearch">Clear</md-button>
        </div>
      </md-table-toolbar>
        <md-table-row slot="md-table-row" slot-scope="{ item }" :key="item._id" @click="onRowClick(item.docUUID)">
          <md-table-cell md-label="Name">{{ item.company_name }}</md-table-cell>
          <md-table-cell md-label="Permit Type">{{ item.permit_type }}</md-table-cell>
          <md-table-cell md-label="Period">{{ item.permit_period }}</md-table-cell>
          <md-table-cell md-label="Submission Date">{{ new Date(item.timestamp).toLocaleDateString("en-GB") }}</md-table-cell>
          <md-table-cell md-label="Status">{{ item.status }}</md-table-cell>
        </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import { searchForValueInArray } from '../Functions/Functions.js'

const { mapFields } = createHelpers({
  getterType: 'getDashPermitField',
  mutationType: 'updateDashPermitField'
})

export default {
  name: 'permit-queue-table',
  props: {
    tableHeaderColor: { type: String, default: '' },
    defaultCount: Number
  },
  data () {
    return {
      selected: [],
      isVisible: true,
      tableData: [],
      searchText: null
    }
  },
  methods: {
    onRowClick (docUUID) {
      this.$store.dispatch('actionGetPermitConditions')
      this.$store.dispatch('actionShowDashModal', { docUUID: docUUID, isSuspendValue: false })
      this.isBackgroundVisible = false
    },
    searchFor (toSearch) {
      let results = searchForValueInArray(toSearch, this.permitsInQueue)
      this.filterParishData(results)
    },
    filterParishData (output) {
      if (this.isParish) {
        output = output.filter(function (el) { return (el.parish_permission === true) })
      }
      this.tableData = output.slice(0, this.defaultCount)
    },
    async clearSearch () {
      this.searchText = null
      await this.$store.dispatch('actionPermitsInQueue')
      this.filterParishData(this.permitsInQueue)
    }
  },
  watch: {
    defaultCount: function () {
      this.searchText = null
      this.filterParishData(this.permitsInQueue)
    }
  },
  computed: {
    ...mapFields([
      'permitsInQueue',
      'isBackgroundVisible',
      'isParish'
    ])
  },
  async mounted () {
    if (this.permitsInQueue.length < 1) {
      await this.$store.dispatch('actionPermitsInQueue')
    }
    this.filterParishData(this.permitsInQueue)
  }
}
</script>
