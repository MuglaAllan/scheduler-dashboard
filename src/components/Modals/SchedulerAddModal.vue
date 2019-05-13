<template>
  <div>
    <md-dialog :md-active.sync="showSchedulerAddDialog" :md-backdrop="false" style="width:60%; height:55%; z-index:10;">
      <md-dialog-content>
        <div class="md-layout">
          <div class="md-layout-item">
            <label for="ddlWorkshopType" class="dashLabel">Workshop Type</label>
            <select id="ddlWorkshopType" class="form-control scheduleSelect" v-model="workshopType" @change="dataUpdate()" style="width:13.5em;">
              <option v-for="val in ddlScheduleLocation" v-bind:key="val" :value="val">{{val}}</option>
            </select>
          </div>
          <div class="md-layout-item">
            <label for="ddlDuration" class="dashLabel">Duration (minutes)</label>
            <select id="ddlDuration" class="form-control scheduleSelect" v-model="appointmentDuration" @change="dataUpdate()" style="width:13.5em;" :disabled="!isWorkShopSet">
              <option v-for="val in ddlDuration" v-bind:key="val" :value="val">{{val}}</option>
            </select>
          </div>
          <div class="md-layout-item">
            <label class="dashLabel">Appointment Date</label>
            <datepicker
              v-model="appointmentDate"
              name="ddlSchedulerDate"
              calendar-class="datePickerCss"
              format="yyyy-MM-dd"
              :bootstrap-styling="true"
              :monday-first="true"
              :disabledDates="disabledDts"
              :disabled="!isDurationSet"
              @closed="dataUpdate()"
            />
          </div>
          <div class="md-layout-item">
            <label for="ddlAppointmentTime" class="dashLabel">Appointment Time</label>
            <select id="ddlAppointmentTime" class="form-control scheduleSelect" v-model="appointmentTime" v-if="isAppointmentDateSet" style="width:13.5em;" :disabled="!isAppointmentDateSet">
              <option v-for="val in this.$store.getters.getScheduleAvailableTimeSlot" v-bind:key="val" :value="val">{{val.toString().substring(0, 2) + ':' + val.toString().substring(2, 4)}}</option>
            </select>
          </div>
        </div>
        <hr class="scheduleSplit" />
        <div class="md-layout">
          <div class="md-layout-item" style="margin-right: 5.5em;">
            <label for="ddlPermitType" class="dashLabel">Search Parameter</label>
            <select id="ddlPermitType" class="form-control scheduleSelect" v-model="searchParameter" style="width: 10em;">
              <option v-for="val in this.ddlSearchParameter" v-bind:key="val.id" :value="val.id">{{val.value}}</option>
            </select>
          </div>
          <div class="md-layout-item" style="margin-right: 1em;">
            <label for="txtSearchValue" class="dashLabel">Search Value</label>
            <input id="txtSearchValue" class="form-control dashInput" name="timestamp" v-model="searchValue" style="width: 14em; border: none; text-align: left;" />
          </div>
          <div class="md-layout-item" style="margin-left: 15em;">
            <md-button class="md-button md-success" @click="search()" style="margin-left: -12.5em;">Search</md-button>
          </div>
          <div class="md-layout-item"></div>
        </div>
        <hr class="scheduleSplit" />
        <div class="table-responsive table-upgrade" style="margin-left: 1em">
          <table class="table" cellspacing="0" id="firstTable" style="width:95%;">
            <thead>
            <tr v-if="$store.getters.getIsSearchDataEmpty" style="font-size: 12pt !important; color: #43a047;">
              <th class="text-left sortHover" width="10%" @click="sort('permit_number')">No.</th>
              <th class="text-left sortHover" width="20%" @click="sort('permit_type')">Permit Type</th>
              <th class="text-left sortHover" width="20%" @click="sort('forenames')">Name</th>
              <th class="text-left sortHover" width="15%" @click="sort('make')">Make</th>
              <th class="text-left sortHover" width="15%" @click="sort('vehicle_identification_number')">Chassis No.</th>
              <th class="text-left sortHover" width="15%" @click="sort('registration_number')">Plate</th>
              <th class="text-center" width="5%">Select</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="$store.getters.getIsSearchDataEmpty" v-for="row in sortedList" :value="row.permit_number" :key="row.permit_number">
              <td class="text-left">{{row.permit_number}}</td>
              <td class="text-left">{{row.permit_type}}</td>
              <td class="text-left">{{(row.forenames !== undefined ? row.forenames : '')  + ' ' + (row.surname !== undefined ? row.surname : '')}}</td>
              <td class="text-left">{{row.make}}</td>
              <td class="text-left">{{row.vehicle_identification_number}}</td>
              <td class="text-left">{{row.registration_number}}</td>
              <td class="text-center">
                <input v-model="checkedRow" type="radio" v-bind:value="row.docUUID" name="group" />
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </md-dialog-content>

      <md-dialog-actions class="mdDialogActions">
        <md-button class="md-button md-success" @click="add()" :disabled="this.checkedRow === null">Add +</md-button>
        <md-button class="md-raised md-simple" @click="close()">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker'
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'getSchedulerField',
  mutationType: 'updateSchedulerField'
})

export default {
  name: 'scheduler-add-modal',
  props: [ 'showSchedulerAddDialog' ],
  components: {
    Datepicker
  },
  data () {
    return {
      isWorkShopSet: false,
      isDurationSet: false,
      isAppointmentDateSet: false,
      showSchedulerDialog: false,
      ddlScheduleLocation: ['RAMP', 'PIT'],
      ddlDuration: ['15', '30', '60', '120', '240'],
      ddlSearchParameter: [
        { id: 'registration_number', value: 'Registration Plate' },
        { id: 'forenames', value: 'First Name' },
        { id: 'surname', value: 'Surname' },
        { id: 'vehicle_identification_number', value: 'Chassis Number' }
      ],
      disabledDts: {
        to: new Date(Date.now() - 8640000)
      },
      currentSort: 'permit_number',
      currentSortDir: 'asc'
    }
  },
  computed: {
    ...mapFields([
      'selectedSchedule.workshopType',
      'selectedSchedule.appointmentDate',
      'selectedSchedule.appointmentTime',
      'selectedSchedule.appointmentDuration',
      'searchParameter',
      'searchValue',
      'checkedRow',
      'searchData'
    ]),
    sortedList: function () {
      let array = this.searchData
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
    dataUpdate () {
      this.isWorkShopSet = this.workshopType !== null
      this.isDurationSet = this.appointmentDuration !== null
      this.isAppointmentDateSet = this.appointmentDate !== null
      if (this.isWorkShopSet && this.isDurationSet && this.isAppointmentDateSet) {
        this.$store.dispatch('actionSetIsAppointmentDisabled', false)
        this.$store.dispatch('actionSetScheduleDataArray', false)
      }
    },
    search () {
      this.$store.dispatch('getSearchData')
    },
    close () {
      this.isWorkShopSet = false
      this.isDurationSet = false
      this.isAppointmentDateSet = false
      this.$store.dispatch('actionHideSchedulerAddModal')
    },
    add () {
      this.$store.dispatch('actionAddScheduleData', '/VRS') //    '/P30'
      this.$store.dispatch('actionSetPickerToNewAppointmentDate')
      this.close()
    },
    sort: function (s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = s
    }
  },
  watch: {
    showSchedulerDetailDialog () {
      this.showSchedulerDialog = this.showSchedulerDetailDialog
    }
  }
}
</script>
