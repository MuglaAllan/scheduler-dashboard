<template>
  <div>
    <md-card>
      <md-card-content style="margin-left: 1em; position: relative;">
        <div v-if="!showOwnerDetails">
          <div class="vrsHeader">Search Details</div>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-20">
              <md-field>
                <label>First Name</label>
                <md-input v-model="personSearchDetails.forenames" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-20">
              <md-field>
                <label>Surname</label>
                <md-input v-model="personSearchDetails.surname" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-30">
              <md-button class="md-raised md-success" @click="search">Search</md-button>
              <md-button class="md-raised md-simple" @click="showUserDetails()" style="margin-left: 1em;">Create New Person</md-button>
            </div>
          </div>
        </div>
        <div v-if="$store.getters.getIsOwnerPersonArrayListEmpty">
          <table class="table" cellspacing="0">
            <thead>
            <tr v-if="$store.getters.getIsOwnerPersonArrayListEmpty" style="font-size: 12pt !important; color: #f57c00 !important;">
              <th class="text-left sortHover" width="20%" @click="sort('forenames')">Forenames</th>
              <th class="text-left sortHover" width="20%" @click="sort('surname')">Surname</th>
              <th class="text-left sortHover">Address</th>
              <th class="text-center sortHover" width="5.5%" @click="sort('isActive')">Active</th>
              <th class="text-center" width="5%">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr class="highlightHover" v-if="$store.getters.getIsOwnerPersonArrayListEmpty" v-for="row in sortedList" :value="row.people_id" :key="row.people_id" @click="selectUserFromTable(row.people_id)">
              <td class="text-left">{{row.forenames}}</td>
              <td class="text-left">{{row.surname}}</td>
              <td class="text-left">{{concatAddress(row.address_line_1, row.address_line_2, row.address_line_3, row.parish, row.postcode)}}</td>
              <td class="text-center">{{row.isActive ? 'Yes' : 'No'}}</td>
              <td class="text-center">
                <input v-model="ownerPersonRowChecked" type="radio" v-bind:value="row.people_id" name="group" />
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div v-if="showOwnerDetails">
          <div class="vrsHeader">Personal Details<span v-if="ownerPerson.length !== {}" class="vrsHeader"> - {{ownerPerson.people_id}}</span></div>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-10">
              <md-field>
                <label class="required">Title</label>
                <md-select v-model="ownerPerson.title" md-dense>
                  <md-option v-for="val in localDdlTitle" v-bind:key="val.id" v-bind:value="val.id" style="padding:0.4em 0 0 1em;">{{val.value}}</md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-20">
              <md-field>
                <label class="required">Give Names</label>
                <md-input v-model="ownerPerson.forenames" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-10">
              <md-field>
                <label>Initials</label>
                <md-input v-model="ownerPerson.initials" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-20">
              <md-field>
                <label class="required">Surname</label>
                <md-input v-model="ownerPerson.surname" type="text"></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-10">
              <md-field>
                <label class="required">Date of Birth</label>
                <md-input v-model="ownerPerson.dob" type="text" @keyup="insertDobSlashes"></md-input>
              </md-field>
            </div>
          </div>
          <div class="vrsHeader">Contact Details</div>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-60">
              <md-field>
                <label class="required">Address Line 1</label>
                <md-input v-model="ownerPerson.address_line_1" type="text"></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-60">
              <md-field>
                <label class="required">Address Line 2</label>
                <md-input v-model="ownerPerson.address_line_2" type="text"></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-60">
              <md-field>
                <label>Address Line 3</label>
                <md-input v-model="ownerPerson.address_line_3" type="text"></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-30">
              <md-field>
                <label class="required">Parish</label>
                <md-select v-model="ownerPerson.parish" md-dense>
                  <md-option v-for="val in localDdlParish" v-bind:key="val.id" v-bind:value="val.id" style="padding:0.4em 0 0 1em;">{{val.value}}</md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-30">
              <md-field>
                <label class="required">Post Code</label>
                <md-input v-model="ownerPerson.postcode" type="text"></md-input>
              </md-field>
            </div>
          </div>
          <div class="vrsHeader">Account Status</div>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-15">
              <md-field>
                <label class="required">Is Active</label>
                <md-select v-model="ownerPerson.isActive" md-dense>
                  <md-option v-for="val in localDdlIsActive" v-bind:key="val.id" v-bind:value="val.id" style="padding:0.4em 0 0 1em;">{{val.value}}</md-option>
                </md-select>
              </md-field>
            </div>
          </div>
          <div class="vrsHeader">Registration No.</div>
          <div><b>Retained: </b>{{concatRegNo(retainedRegNo)}}</div>
          <div><b>Held: </b>{{concatRegNo(heldRegNo)}}</div>
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
  name: 'owner-person',
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
      currentSort: 'forenames',
      currentSortDir: 'asc'
    }
  },
  computed: {
    ...mapFields([
      'showOwnerDetails',
      'showOwnerNoDetailsFound',
      'showCreateButton',
      'showUpdateButton',
      'personSearchDetails',
      'ownerPersonArray',
      'ownerPersonRowChecked',
      'ownerPerson',
      'retainedRegNo',
      'heldRegNo'
    ]),
    sortedList: function () {
      let array = this.ownerPersonArray
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
    async search () {
      await this.$store.dispatch('getOwnerPeople')
    },
    selectUserFromTable (id) {
      this.ownerPersonRowChecked = id
      this.$store.dispatch('selectOwnerPersonDetails')
    },
    sort: function (s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = s
    },
    concatAddress: function (addr1, addr2, addr3, parish, postcode) {
      return functions.concatValues([ addr1, addr2, addr3, parish, postcode ], true)
    },
    insertDobSlashes () {
      this.ownerPerson.dob = functions.insertSlash(this.ownerPerson.dob)
    },
    showUserDetails () {
      this.ownerPerson.forenames = this.personSearchDetails.forenames
      this.ownerPerson.surname = this.personSearchDetails.surname
      this.showOwnerDetails = true
      this.showCreateButton = true
      this.showOwnerNoDetailsFound = false
    },
    concatRegNo (arr) {
      return functions.concatValues(arr, true)
    },
    create () {
      this.$store.dispatch('createNewPerson')
    },
    update () {
      this.$store.dispatch('updatePerson')
    },
    reset () {
      this.$store.dispatch('resetOwner')
    }
  },
  // watch: {
  //   dob () {
  //     console.log(this)
  //     this.ownerPerson.dob = functions.formatDate(this)
  //   }
  // },
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
