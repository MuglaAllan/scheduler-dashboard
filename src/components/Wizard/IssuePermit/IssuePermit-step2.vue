<template>
  <div>
    <md-card-content>
      <div class="table-responsive table-upgrade">
        <table class="table" cellspacing="0" id="firstTable" style="width:95%;">
          <thead>
          <tr v-if="$store.getters.getIsPermitListEmpty" style="font-size: 12pt !important; color: #43a047;">
            <th class="text-left sortHover" width="7.5%" @click="sort('permit_number')">Permit No.</th>
            <th class="text-left sortHover" width="7.5%" @click="sort('registration_number')">Reg No.</th>
            <th class="text-left" width="15%">Name</th>
            <th class="text-left sortHover" width="15%" @click="sort('company_name')">Company Name</th>
            <th class="text-left" width="30%">Address</th>
            <th class="text-left" width="10%">Type</th>
            <th class="text-left sortHover" width="10%" @click="sort('status')">Status</th>
            <th class="text-center" width="5%">Action</th>
          </tr>
          </thead>
          <tbody>
            <tr v-if="!$store.getters.getIsPermitListEmpty">
              <td colspan="6" class="text-left">No matches found - refine search parameters and try again</td>
            </tr>
            <tr class="highlightHover" v-if="$store.getters.getIsPermitListEmpty" v-for="row in sortedList" :value="row.permit_number" :key="row.permit_number" @click="issuePermitCheckedRow = row.docUUID">
              <td class="text-left">{{row.permit_number}}</td>
              <td class="text-left">{{row.registration_number}}</td>
              <td class="text-left">{{(row.forenames !== undefined ? row.forenames : '')  + ' ' + (row.surname !== undefined ? row.surname : '')}}</td>
              <td class="text-left">{{row.company_name}}</td>
              <td class="text-left">{{row.address_line_1 + ', ' + row.address_line_2 + (row.address_line_3 !== undefined ? ', ' + row.address_line_3 : '') + ', ' + row.post_code}}</td>
              <td class="text-left">{{row.permit_period}}</td>
              <td class="text-left">{{row.status}}</td>
              <td class="text-center">
                <input v-model="issuePermitCheckedRow" type="radio" v-bind:value="row.docUUID" name="group" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </md-card-content>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'getIssuePermitField',
  mutationType: 'updateIssuePermitField'
})

export default {
  name: 'Child2',
  props: ['value'],
  data () {
    return {
      currentSort: 'permit_number',
      currentSortDir: 'asc'
    }
  },
  computed: {
    ...mapFields([
      'issuePermitCheckedRow',
      'userList'
    ]),
    sortedList: function () {
      let array = this.userList
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
    this.$store.dispatch('getUserListData')
    this.$store.commit('setIssueDataLoadingOn')
  }
}
</script>
