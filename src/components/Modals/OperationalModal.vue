<template>
  <div>
    <md-dialog :md-active.sync="showOperationalModal" :md-backdrop="false" style="width:45%; z-index:10;">
      <md-dialog-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-60">
            <md-field class="md-toolbar-section-end">
              <md-input ref="focus" placeholder="Search..." v-model="searchText" @input="searchFor" />
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-40" style="margin-top: 1.5vh;">
            <md-button class="md-dense md-raised md-success" @click="selectSearch">Select</md-button>
            <md-button class="md-dense md-raised md-simple" @click="clearSearch" style="margin-left: 1em;">Clear</md-button>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-75">
            <table class="table" cellspacing="0" id="firstTable" style="width: 100%;">
              <tbody>
              <tr class="highlightHover" v-if="defaultCount > 0" v-for="row in tableData" :value="row" :key="row" @click="onRowClick(row)">
                <td class="text-left">{{row}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </md-dialog-content>
      <md-dialog-actions class="mdDialogActions">
        <md-button class="md-raised md-simple" @click="close()">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
import { createHelpers } from 'vuex-map-fields'
import types from '../../store/mutation-types'

const { mapFields } = createHelpers({
  getterType: 'getVrsField',
  mutationType: 'updateVrsField'
})

export default {
  name: 'operational-modal',
  props: [ 'showOperationalModalProp' ],
  data () {
    return {
      defaultCount: 0,
      showOperationalModal: false,
      selected: [],
      isVisible: true,
      tableData: [],
      searchText: null
    }
  },
  computed: {
    ...mapFields([
      'vrsDataParameter',
      'vehicleBodyTypes',
      'vehicleManufacturers'
    ])
  },
  methods: {
    selectSearch () {
      this.$store.dispatch('setSpecificVrsData', this.searchText)
      this.close()
    },
    searchFor (toSearch) {
      let results = this.vrsDataParameter === 'manufacturer' ? this.vehicleManufacturers : this.vehicleBodyTypes
      results = results.filter(item => item.toLowerCase().indexOf(toSearch.toLowerCase()) !== -1)
      this.defaultCount = results.length
      this.tableData = results
    },
    clearSearch () {
      this.searchText = null
      this.tableData = null
    },
    onRowClick (value) {
      this.$store.dispatch('setSpecificVrsData', value)
      this.close()
    },
    close () {
      this.searchText = null
      this.tableData = null
      this.$store.commit(types.SET_VRS_DATA_PARAMETER, null)
      this.$store.dispatch('showHideOperationalModal', false)
    }
  },
  watch: {
    showOperationalModalProp () {
      this.showOperationalModal = this.showOperationalModalProp
    }
  }
}
</script>
