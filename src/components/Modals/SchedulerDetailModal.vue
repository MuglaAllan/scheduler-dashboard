<template>
  <div>
    <md-dialog :md-active.sync="showSchedulerDialog" :md-backdrop="false" style="width:60%; height:45%; z-index:10;">
      <md-dialog-content>
        <div class="md-layout">
          <div class="md-layout-item">
            <label for="ddlWorkshopType" class="dashLabel">Workshop Type</label>
            <select id="ddlWorkshopType" class="form-control scheduleSelect" v-model="workshopType" @change="dataUpdate()" style="width:13.5em;">
              <option v-for="val in ddlScheduleLocation" v-bind:key="val" :value="val">{{val}}</option>
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
              @closed="dataUpdate()"
            />
          </div>
          <div class="md-layout-item">
            <label for="ddlAppointmentTime" class="dashLabel">Appointment Time</label>
            <select id="ddlAppointmentTime" class="form-control scheduleSelect" v-model="appointmentTime" v-if="this.showSchedulerDialog" @change="dataUpdate()" style="width:13.5em;">
              <option v-for="val in this.$store.getters.getScheduleAvailableTimeSlot" v-bind:key="val" :value="val">{{val.toString().substring(0, 2) + ':' + val.toString().substring(2, 4)}}</option>
            </select>
          </div>
          <div class="md-layout-item">
            <label for="txtAppointmentDuration" class="dashLabel">Duration (minutes)</label>
            <input id="txtAppointmentDuration" class="form-control dashInput" name="timestamp" v-model="appointmentDuration" readonly />
          </div>
        </div>
        <hr class="scheduleSplit">
        <div class="md-layout">
          <div class="md-layout-item">
            <label for="txtPermitType" class="dashLabel">Registration No.</label>
            <input id="txtPermitType" class="form-control dashInput" name="timestamp" v-model="registrationId" readonly />
          </div>
          <div class="md-layout-item">
            <label for="txtVehicleMake" class="dashLabel">Vehicle Make</label>
            <input id="txtVehicleMake" class="form-control dashInput" name="timestamp" v-model="vehicleMake" readonly />
          </div>
          <div class="md-layout-item">
            <label for="txtVehicleLength" class="dashLabel">Forenames</label>
            <input id="txtVehicleLength" class="form-control dashInput" name="timestamp" v-model="forenames" readonly />
          </div>
          <div class="md-layout-item">
            <label for="txtVehicleWidth" class="dashLabel">Surname</label>
            <input id="txtVehicleWidth" class="form-control dashInput" name="timestamp" v-model="surname" readonly />
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item">
            <label for="txtPermitType" class="dashLabel">Comments.</label>
            <input id="txtPermitComment" class="form-control dashInput" name="timestamp" v-model="free_text" readonly />
          </div>
        </div>
      </md-dialog-content>

      <md-dialog-actions class="mdDialogActions">
        <md-button class="md-button md-danger" @click="deleteEntry()">Delete</md-button>
        <md-button v-if="!isAppointmentDisabled" class="md-button md-success" @click="amend()">Amend</md-button>
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
  name: 'scheduler-detail-modal',
  props: [ 'showSchedulerDetailDialog' ],
  components: {
    Datepicker
  },
  data () {
    return {
      showSchedulerDialog: false,
      ddlScheduleLocation: ['RAMP', 'PIT']
    }
  },
  computed: {
    ...mapFields([
      'selectedSchedule.workshopType',
      'selectedSchedule.appointmentDate',
      'selectedSchedule.appointmentTime',
      'selectedSchedule.appointmentDuration',
      'selectedSchedule.permitType',
      'selectedSchedule.vehicleMake',
      'selectedSchedule.vehicleLength',
      'selectedSchedule.vehicleWidth',
      'selectedSchedule.forenames',
      'selectedSchedule.surname',
      'selectedSchedule.free_text',
      'selectedSchedule.registrationId',
      'isAppointmentDisabled'
    ])
  },
  methods: {
    dataUpdate () {
      this.$store.dispatch('actionSetScheduleDataArray', false)
      this.$store.dispatch('actionSetIsAppointmentDisabled', false)
    },
    deleteEntry () {
      this.$store.dispatch('removeScheduleEntry')
      this.close()
    },
    amend () {
      this.$store.dispatch('actionAmendScheduleData')
      this.$store.dispatch('actionSetPickerToNewAppointmentDate')
      this.close()
    },
    close () {
      this.$store.dispatch('actionSetIsAppointmentDisabled', true)
      this.$store.dispatch('actionHideSchedulerDetailModal')
    }
  },
  watch: {
    showSchedulerDetailDialog () {
      this.showSchedulerDialog = this.showSchedulerDetailDialog
    }
  }
}
</script>
