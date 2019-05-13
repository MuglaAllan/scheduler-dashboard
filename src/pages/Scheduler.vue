<template>
  <div class="content">
    <scheduler-detail-modal :showSchedulerDetailDialog="this.$store.getters.getShowSchedulerModal" />
    <scheduler-add-modal :showSchedulerAddDialog="this.$store.getters.getShowAddSchedulerModal" />
    <div class="scheduleDatePickerContainer" v-if="this.$store.getters.getShowSchedulerGrid" style="width: 7.5%;">
      <div>
        <md-button class="md-button md-success" @click="add()">Add +</md-button>
      </div>
      <div style="float: left; margin-right: 1em; padding-top: 0.5em;">Selected Date:</div>
      <datepicker
        v-model="$store.state.Scheduler.scheduleDate"
        format="yyyy-MM-dd"
        :bootstrap-styling="true"
        :monday-first="true"
        @closed="dateChange()"
      />
    </div>
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100" v-if="this.$store.getters.getShowSchedulerGrid">
        <h3 class="scheduleH3">Ramp</h3>
        <nav-tabs-card class="schedulerContainer">
          <template slot="content">
            <light-timeline :items="this.$store.getters.getScheduleDataArrayRamp" style="list-style-type: none !important; margin-left: -1em;">
              <template slot='content' slot-scope="{ item }">
                <div v-on:click="scheduleSelected(item.registrationId)">
                  <div v-html="item.content" />
                </div>
              </template>
            </light-timeline>
          </template>
        </nav-tabs-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100" v-if="this.$store.getters.getShowSchedulerGrid">
        <h3 class="scheduleH3">Pit</h3>
        <nav-tabs-card class="schedulerContainer">
          <template slot="content">
            <light-timeline :items="this.$store.getters.getScheduleDataArrayPit" style="list-style-type: none !important; margin-left: -1em;">
              <template slot='content' slot-scope="{ item }">
                <div v-on:click="scheduleSelected(item.registrationId)">
                  <div v-html="item.content" />
                </div>
              </template>
            </light-timeline>
          </template>
        </nav-tabs-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100" v-if="this.$store.getters.getShowSchedulerGrid">
        <h3 class="scheduleH3">Motorcycle</h3>
        <nav-tabs-card class="schedulerContainer">
          <template slot="content">
            <light-timeline :items="this.$store.getters.getScheduleDataArrayMotorcycle" style="list-style-type: none !important; margin-left: -1em;">
              <template slot='content' slot-scope="{ item }">
                <div v-on:click="scheduleSelected(item.registrationId)">
                  <div v-html="item.content" />
                </div>
              </template>
            </light-timeline>
          </template>
        </nav-tabs-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  NavTabsCard,
  SchedulerEntry,
  SchedulerDetailModal,
  SchedulerAddModal
} from '@/components'
import Datepicker from 'vuejs-datepicker'
import types from '../store/mutation-types'

export default {
  name: 'Scheduler',
  components: {
    NavTabsCard,
    Datepicker,
    SchedulerEntry,
    SchedulerDetailModal,
    SchedulerAddModal
  },
  methods: {
    dateChange () {
      this.$store.commit('setSchedulerDataLoadingOn')
      this.$store.dispatch('actionSetScheduleDataArray', true)
    },
    scheduleSelected (value) {
      this.$store.commit(types.SET_IS_APPOINTMENT_DISABLED, false)
      this.$store.dispatch('actionGetSelectedSchedule', value)
    },
    add () {
      this.$store.commit(types.SET_SHOW_SCHEDULER_ADD_MODAL, true)
    }
  },
  computed: {
    ...mapGetters('Scheduler', ['scheduler']),
    isAmendModalOpen () {
      return this.$store.getters.getShowSchedulerModal
    },
    isAddModalOpen () {
      return this.$store.getters.getShowAddSchedulerModal
    }
  },
  watch: {
    isAmendModalOpen: function (val) {
      if (val === false) {
        setTimeout(() => this.dateChange(), 500)
      }
    },
    isAddModalOpen: function (val) {
      if (val === false) {
        setTimeout(() => this.dateChange(), 500)
      }
    }
  },
  mounted: function () {
    this.$store.dispatch('actionSetScheduleDataArray', false)
    this.$store.dispatch('resetScheduler')
  },
  beforeCreate: function () {
    this.$options.components.SchedulerDetailModal = require('../components/Modals/SchedulerDetailModal.vue').default
    this.$options.components.SchedulerAddModal = require('../components/Modals/SchedulerAddModal.vue').default
  }
}
</script>
