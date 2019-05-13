<template>
  <div>
    <md-dialog :md-active.sync="showRegistrationNoSelectModal" :md-backdrop="false" style="width:40%; z-index:10;">
      <md-dialog-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-60">
            <md-field class="md-toolbar-section-end">
              <md-input placeholder="Search..." v-model="searchText" @input="searchFor" />
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-40" style="margin-top: 1.5vh;">
            <md-button class="md-dense md-raised md-simple" @click="clearSearch" style="margin-left: 1em;">Clear</md-button>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-75">
            <table class="table" cellspacing="0" id="firstTable" style="width: 100%;">
              <tbody>
              <tr class="highlightHover" v-if="defaultCount > 0" v-for="row in tableData" :value="row.registrationId" :key="row.registrationId" @click="onRowClick(row.registrationnumber)">
                <td class="text-left">{{row.registrationnumber}}</td>
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
  name: 'registration-no-select-modal',
  props: [ 'showRegistrationNoSelectModalProp' ],
  data () {
    return {
      defaultCount: 25,
      showRegistrationNoSelectModal: false,
      selected: [],
      tableData: [],
      isVisible: true,
      searchText: 'J'
    }
  },
  computed: {
    ...mapFields([
      'vrsDataParameter',
      'registrationNoSelect'
    ])
  },
  methods: {
    searchFor (toSearch) {
      let results = this.registrationNoSelect
      results = results.filter(item => item.registrationnumber.toLowerCase().indexOf(toSearch.toLowerCase()) !== -1)
      this.defaultCount = results.length
      this.tableData = results
    },
    clearSearch () {
      this.searchText = 'J'
      this.defaultCount = 25
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
      this.$store.dispatch('showHideRegistrationNoSelectModal', false)
    }
  },
  watch: {
    showRegistrationNoSelectModalProp () {
      this.showRegistrationNoSelectModal = this.showRegistrationNoSelectModalProp
    }
  }
}
</script>
