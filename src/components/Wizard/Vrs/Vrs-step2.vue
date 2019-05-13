<template>
  <div>
    <md-card>
      <md-card-content>
        <div id="vrsLoading" v-if="$store.getters.getIsVrsDataLoading">
          <img id="spinner" src="../../../assets/img/spinner.gif" style="margin-top: 0.75em;"/>
        </div>
        <div class="table-responsive table-upgrade">
          <table class="table" cellspacing="0" id="firstTable">
            <thead>
              <tr v-if="$store.getters.getIsVrsSearchListEmpty" style="font-size: 12pt !important; color: #f57c00 !important;">
                <th class="text-left sortHover" width="12%" @click="sort('registration_number')">Reg No.</th>
                <th class="text-left sortHover" width="12%" @click="sort('make')">Make</th>
                <th class="text-left sortHover" width="12%" @click="sort('model')">Models</th>
                <th class="text-left sortHover" width="12%" @click="sort('chassis_number')">Chassis No.</th>
                <th class="text-left sortHover" width="12%" @click="sort('engine_number')">Engine No.</th>
                <th class="text-left" width="12%">Reg. Date</th>
                <th class="text-left" width="12%">Trans. Date </th>
                <th class="text-left" width="12%">Name</th>
                <th class="text-center" width="5%">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!$store.getters.getIsVrsSearchListEmpty && !$store.getters.getIsVrsDataLoading">
                <td colspan="6" class="text-left">No matches found - refine search parameters and try again</td>
              </tr>
              <tr class="highlightHover" v-if="$store.getters.getIsVrsSearchListEmpty" v-for="row in sortedList" :value="row.permit_number" :key="row.permit_number" @click="vrsCheckedRow = row.docUUID">
                <td class="text-left">{{row.registration_number}}</td>
                <td class="text-left">{{row.make}}</td>
                <td class="text-left">{{row.model}}</td>
                <td class="text-left">{{row.chassis_number}}</td>
                <td class="text-left">{{row.engine_number}}</td>
                <td class="text-left">{{row.date_of_first_registration === null ? 'N/A' : new Date(row.date_of_first_registration).toLocaleDateString("en-GB")}}</td>
                <td class="text-left">{{row.date_of_last_transfer === null ? 'N/A' : new Date(row.date_of_last_transfer).toLocaleDateString("en-GB")}}</td>
                <td class="text-left">{{(row.forenames !== undefined ? row.forenames : '')  + ' ' + (row.surname !== undefined ? row.surname : '')}}</td>
                <td class="text-center">
                  <input v-model="vrsCheckedRow" type="radio" v-bind:value="row.docUUID" name="group" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </md-card-content>
      <div style="float: right; margin: -2px 0 0 -2px;" />
    </md-card>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'getVrsField',
  mutationType: 'updateVrsField'
})

export default {
  name: 'Child2',
  components: { },
  props: ['value'],
  data () {
    return {
      currentSort: 'regNo',
      currentSortDir: 'asc'
    }
  },
  computed: {
    ...mapFields([
      'vrsCheckedRow',
      'vrsSearchList',
      'step'
    ]),
    sortedList: function () {
      let array = this.vrsSearchList
      return array.sort((a, b) => {
        let modifier = 1
        if (this.currentSortDir === 'desc') {
          modifier = -1
        }
        if (a[this.currentSort] < b[this.currentSort]) {
          return -1 * modifier
        }
        if (a[this.currentSort] > b[this.currentSort]) {
          return 1 * modifier
        }
        return 0
      })
    }
  },
  dataBackgroundColor: {
    type: String,
    default: ''
  },
  methods: {
    sort: function (s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = s
    }
  },
  mounted: function () {
    this.$store.commit('setVrsDataLoadingOn')
    if (this.step === 2) {
      this.$store.dispatch('getVrsListData', true)
    }
  }
}
</script>
