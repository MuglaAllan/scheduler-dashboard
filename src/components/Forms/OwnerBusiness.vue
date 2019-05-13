<template>
  <div>
    <md-card>
      <md-card-content style="margin-left: 1em; position: relative;">
        <div v-if="!showOwnerDetails">
          <div class="vrsHeader">Search Details</div>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-30">
              <md-field>
                <label>Business Name</label>
                <md-input v-model="businessSearchDetails.business_name" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-15">
              <md-field>
                <label class="required">Is Motor Trader</label>
                <md-select v-model="businessSearchDetails.isMotorTrade" md-dense>
                  <md-option v-for="val in localDdlIsActive" v-bind:key="val.id" v-bind:value="val.id" style="padding:0.4em 0 0 1em;">{{val.value}}</md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-30">
              <md-button class="md-raised md-success" @click="search">Search</md-button>
              <md-button class="md-raised md-simple" @click="showUserDetails()" style="margin-left: 1em;">Create New Business</md-button>
            </div>
          </div>
        </div>
        <div v-if="$store.getters.getIsOwnerBusinessArrayListEmpty">
          <table class="table" cellspacing="0">
            <thead>
            <tr v-if="$store.getters.getIsOwnerBusinessArrayListEmpty" style="font-size: 12pt !important; color: #f57c00 !important;">
              <th class="text-left sortHover" width="25%" @click="sort('business_name')">Business Name</th>
              <th class="text-left sortHover">Address</th>
              <th class="text-center sortHover" width="9%" @click="sort('isMotorTrade')">Motor Trader</th>
              <th class="text-center sortHover" width="5.5%" @click="sort('isActive')">Active</th>
              <th class="text-center" width="5%">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr class="highlightHover" v-if="$store.getters.getIsOwnerBusinessArrayListEmpty" v-for="row in sortedList" :value="row.business_id" :key="row.business_id" @click="selectBusinessFromTable(row.business_id)">
              <td class="text-left">{{row.business_name}}</td>
              <td class="text-left">{{concatAddress(row.address_line_1, row.address_line_2, row.address_line_3, row.parish, row.postcode)}}</td>
              <td class="text-center">{{row.isMotorTrade ? 'Yes' : 'No'}}</td>
              <td class="text-center">{{row.isActive ? 'Yes' : 'No'}}</td>
              <td class="text-center">
                <input v-model="ownerBusinessRowChecked" type="radio" v-bind:value="row.business_id" name="group" />
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div v-if="showOwnerDetails">
          <div class="vrsHeader">Business Details<span v-if="ownerBusiness.length !== {}" class="vrsHeader"> - {{ownerBusiness.business_id}}</span></div>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-30">
              <md-field>
                <label class="required">Business Name</label>
                <md-input v-model="ownerBusiness.business_name" type="text"></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-15">
              <md-field>
                <label class="required">Is Motor Trader</label>
                <md-select v-model="ownerBusiness.isMotorTrade" md-dense>
                  <md-option v-for="val in localDdlIsActive" v-bind:key="val.id" v-bind:value="val.id" style="padding:0.4em 0 0 1em;">{{val.value}}</md-option>
                </md-select>
              </md-field>
            </div>
          </div>
          <div class="vrsHeader">Contact Details</div>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-60">
              <md-field>
                <label class="required">Address Line 1</label>
                <md-input v-model="ownerBusiness.address_line_1" type="text"></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-60">
              <md-field>
                <label class="required">Address Line 2</label>
                <md-input v-model="ownerBusiness.address_line_2" type="text"></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-60">
              <md-field>
                <label>Address Line 3</label>
                <md-input v-model="ownerBusiness.address_line_3" type="text"></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-30">
              <md-field>
                <label class="required">Parish</label>
                <md-select v-model="ownerBusiness.parish" md-dense>
                  <md-option v-for="val in localDdlParish" v-bind:key="val.id" v-bind:value="val.id" style="padding:0.4em 0 0 1em;">{{val.value}}</md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-30">
              <md-field>
                <label class="required">Post Code</label>
                <md-input v-model="ownerBusiness.postcode" type="text"></md-input>
              </md-field>
            </div>
          </div>
          <div class="vrsHeader">Account Status</div>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-15">
              <md-field>
                <label class="required">Is Active</label>
                <md-select v-model="ownerBusiness.isActive" md-dense>
                  <md-option v-for="val in localDdlIsActive" v-bind:key="val.id" v-bind:value="val.id" style="padding:0.4em 0 0 1em;">{{val.value}}</md-option>
                </md-select>
              </md-field>
            </div>
          </div>
          <div v-if="assignedTradeLicenses.length > 0">
            <div class="vrsHeader">Trade Licenses</div>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100 md-size-50" style="text-align: left;">
                <span>Assigned: {{concatTradeLicenses()}}</span>
              </div>
            </div>
          </div>
        </div>
        <md-card-actions>
          <md-button v-if="showCreateButton" class="md-raised md-success" @click="create()">Create</md-button>
          <md-button v-if="showUpdateButton" class="md-raised md-success" @click="update()">Update</md-button>
          <md-button class="md-raised md-simple" @click="reset()">Reset</md-button>
        </md-card-actions>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import * as functions from '../Functions/Functions.js'
import { ddlTitle, ddlParish, ddlYesNo } from '../Functions/DropDownLists.js'

const { mapFields } = createHelpers({
  getterType: 'getOwnerField',
  mutationType: 'updateOwnerField'
})

export default {
  name: 'owner-business',
  components: { },
  data () {
    return {
      dteDay: null,
      dteMonth: null,
      dteYear: null,
      localDdlTitle: ddlTitle(),
      localDdlParish: ddlParish(),
      localDdlIsActive: ddlYesNo(),
      hasMessages: false,
      surnameLabelTitle: 'Surname',
      isCompany: false,
      currentSort: 'business_name',
      currentSortDir: 'asc'
    }
  },
  computed: {
    ...mapFields([
      'showOwnerDetails',
      'showOwnerNoDetailsFound',
      'showCreateButton',
      'showUpdateButton',
      'businessSearchDetails',
      'ownerBusinessArray',
      'ownerBusinessRowChecked',
      'ownerBusiness',
      'assignedTradeLicenses'
    ]),
    sortedList: function () {
      let array = this.ownerBusinessArray
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
  methods: {
    search () {
      this.$store.dispatch('getOwnerBusinesses')
    },
    selectBusinessFromTable (id) {
      this.ownerBusinessRowChecked = id
      this.$store.dispatch('selectOwnerBusinessDetails')
    },
    sort: function (s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = s
    },
    concatAddress (addr1, addr2, addr3, parish, postcode) {
      return functions.concatValues([ addr1, addr2, addr3, parish, postcode ], true)
    },
    concatTradeLicenses () {
      let arr = []
      this.assignedTradeLicenses.forEach(function (item) {
        arr.push(item.tradelicense_number)
      })
      return functions.concatValues(arr, true)
    },
    insertDobSlashes () {
      this.ownerBusiness.dob = functions.insertSlash(this.ownerBusiness.dob)
    },
    showUserDetails () {
      this.ownerBusiness.business_name = this.businessSearchDetails.business_name
      this.showOwnerDetails = true
      this.showCreateButton = true
      this.showOwnerNoDetailsFound = false
    },
    create () {
      this.$store.dispatch('createNewBusiness')
    },
    update () {
      this.$store.dispatch('updateBusiness')
    },
    reset () {
      this.$store.dispatch('resetOwner')
    }
  },
  watch: { },
  mounted () { }
}
</script>

<style>
  div.noMatches {
    margin: 1em 0 2em 1em;
  }
  div.md-layout-item label.required:after {
    content:" *";
    color: red;
  }
</style>
