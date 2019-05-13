<template>
  <div>
    <md-dialog :md-active.sync="showVrsScheduleModal" :md-backdrop="false" style="width:60%; height:45%; z-index:1000;">
      <md-dialog-content>
        <div class="md-layout">
          <div class="md-layout-item">
            <label for="ddlWorkshopType" class="dashLabel">Workshop Type</label>
            <select id="ddlWorkshopType" class="form-control scheduleSelect" v-model="workshopType" @change="dataUpdate()" style="width:13.5em;" :disabled="true">
              <option v-for="val in ddlScheduleLocation" v-bind:key="val" :value="val">{{val}}</option>
            </select>
          </div>
          <div class="md-layout-item">
            <label for="ddlDuration" class="dashLabel">Duration (minutes)</label>
            <select id="ddlDuration" class="form-control scheduleSelect" v-model="appointmentDuration" @change="dataUpdate()" style="width:13.5em;" :disabled="true">
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
      </md-dialog-content>

      <md-dialog-actions class="mdDialogActions">
        <md-button class="md-button md-success" @click="add()">Add +</md-button>
        <md-button class="md-raised md-simple" @click="close()">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker'
import { createHelpers } from 'vuex-map-fields'
import types from '../../store/mutation-types'

const { mapFields } = createHelpers({
  getterType: 'getSchedulerField',
  mutationType: 'updateSchedulerField'
})

export default {
  name: 'vrs-schedule-add-modal',
  props: [ 'showVrsScheduleModal' ],
  components: {
    Datepicker
  },
  data () {
    return {
      isAppointmentDateSet: false,
      showSchedulerDialog: false,
      ddlScheduleLocation: ['RAMP', 'PIT', 'MOTORCYCLE'],
      ddlDuration: ['15', '30', '60', '120', '240', '330'],
      disabledDts: {
        to: new Date(Date.now() - 8640000)
      }
    }
  },
  computed: {
    ...mapFields([
      'selectedSchedule.workshopType',
      'selectedSchedule.appointmentDate',
      'selectedSchedule.appointmentTime',
      'selectedSchedule.appointmentDuration'
    ])
  },
  methods: {
    dataUpdate () {
      this.isAppointmentDateSet = this.appointmentDate !== null
      if (this.isAppointmentDateSet) {
        this.$store.dispatch('actionSetIsAppointmentDisabled', false)
        this.$store.dispatch('actionSetScheduleDataArray', false)
      }
    },
    close () {
      this.isAppointmentDateSet = false
      this.$store.commit(types.RESET_SELECTED_SCHEDULE)
      this.$store.commit(types.SET_SHOW_HIDE_VRS_SCHEDULE_MODAL, false)
    },
    add () {
      let response = this.$store.dispatch('actionAddScheduleData', '/VRS')
      if (response !== undefined) {
        this.$store.commit(types.SET_SHOW_HIDE_VRS_RECEIPT_MODAL, true)
        this.close()
      }
    }
  },
  watch: {
    showSchedulerDetailDialog () {
      this.showSchedulerDialog = this.showSchedulerDetailDialog
    }
  }
}
</script>
