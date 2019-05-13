<template>
  <div class="content">
    <dash-permit-modal :showIssueModal="showDashModal"></dash-permit-modal>
    <maha-status-modal :showMahaStatusModal="showMahaStatusModal"></maha-status-modal>
    <div class="md-layout" v-if="isBackgroundVisible">
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"> <!--v-if="permitsInQueue !== undefined"-->
        <stats-card data-background-color="green">
          <template slot="header">
            <a href="#" @click="showHidePermitsInQueue()">
              <md-icon>content_paste</md-icon>
            </a>
          </template>
          <template slot="content">
            <router-link to="/parish">
              <p class="category">Permit - Applications</p>
            </router-link>
            <h3 class="title">{{permitsInQueue.length}}</h3>
          </template>
          <template slot="footer">
            <div class="stats" style="min-height: 2.5vh; font-size: 8pt;">
              <div style="padding-right: 0.5em;">Permanent: {{noPermanentPermits}} - </div>
              <div style="padding-right: 0.5em;">Annual: {{noAnnualPermits}} - </div>
              <div>Temporary: {{noTempPermits}}</div>
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"> <!--v-if="permitsSuspended !== undefined"-->
        <stats-card data-background-color="red">
          <template slot="header">
            <a href="#" @click="showHidePermitsSuspended()">
              <md-icon>content_paste</md-icon>
            </a>
          </template>
          <template slot="content">
            <p class="category">Permit - Suspended</p>
            <h3 class="title">{{permitsSuspended.length}}</h3>
          </template>
          <template slot="footer">
            <div class="stats" style="min-height: 2.5vh;">
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"> <!--v-if="vrsApplications !== undefined"-->
        <stats-card data-background-color="orange">
          <template slot="header">
            <a href="#" @click="showHideVrsApplications()">
              <md-icon>picture_in_picture</md-icon>
            </a>
          </template>
          <template slot="content">
            <p class="category">VRD - Applications</p>
            <h3 class="title">{{vrsApplications.length}}</h3>
          </template>
          <template slot="footer">
            <div class="stats" style="min-height: 2.5vh; font-size: 8pt;">
              <div style="padding-right: 0.5em;">New: {{noNewVrs}} - </div>
              <div style="padding-right: 0.5em;">Approved: {{noApprovedVrs}} - </div>
              <div style="padding-right: 0.5em;">Payment Taken: {{noPayConfirmedVrs}} - </div>
              <div>Passed: {{noPassedInspectVrs}}</div>
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"> <!--v-if="mahaStatusRecords !== undefined"-->
        <stats-card>
          <template slot="header">
            <a href="#" @click="showHideMahaInspections()">
              <md-icon>assignment_turned_in</md-icon>
            </a>
          </template>
          <template slot="content">
            <p class="category">Maha - Inspections</p>
            <h3 class="title">{{mahaStatusRecords.length}}</h3>
          </template>
          <template slot="footer">
            <div class="stats" style="min-height: 2.5vh;">
              <!--<md-icon>date_range</md-icon>-->
              <!--Last 24 Hours-->
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50" v-if="permitsInQueue !== undefined && isPermitsInQueueVisible">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Permits in Queue</h4>
            <select v-model="permitsInQueueRowCount" class="form-control dashInput tableRowCount" style="margin-top: -1.9em;">
              <option v-for="val in ddlRowCount" v-bind:key="val" :value="val">{{val}}</option>
            </select>
          </md-card-header>
          <md-card-content>
            <permit-queue-table table-header-color="green" :default-count="permitsInQueueRowCount"></permit-queue-table>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50" v-if="permitsSuspended !== undefined && isPermitsSuspendedVisible && !isParish">
        <md-card>
          <md-card-header data-background-color="red">
            <h4 class="title">Suspended Permits</h4>
            <select v-model="suspendedPermitsRowCount" class="form-control dashInput tableRowCount" style="margin-top: -1.9em;">
              <option v-for="val in ddlRowCount" v-bind:key="val" :value="val">{{val}}</option>
            </select>
          </md-card-header>
          <md-card-content>
            <permit-suspended-table table-header-color="red" :default-count="suspendedPermitsRowCount"></permit-suspended-table>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50" v-if="vrsApplications !== undefined && isVrsApplicationsVisible && !isParish">
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">VRD Applications</h4>
            <select v-model="vrsApplicationsRowCount" class="form-control dashInput tableRowCount" style="margin-top: -1.9em;">
              <option v-for="val in ddlRowCount" v-bind:key="val" :value="val">{{val}}</option>
            </select>
          </md-card-header>
          <md-card-content>
            <vrs-applications-table table-header-color="orange" :default-count="vrsApplicationsRowCount"></vrs-applications-table>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50" v-if="vrsInFlightApplications !== undefined && isVrsInFlightVisible && !isParish">
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">Change of Ownership</h4>
            <select v-model="vrsInFlightRowCount" class="form-control dashInput tableRowCount" style="margin-top: -1.9em;">
              <option v-for="val in ddlRowCount" v-bind:key="val" :value="val">{{val}}</option>
            </select>
          </md-card-header>
          <md-card-content>
            <vrs-in-flight-table table-header-color="orange" :default-count="vrsInFlightRowCount"></vrs-in-flight-table>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50" v-if="mahaStatusRecords !== undefined && isMahaInspectionsVisible && !isParish">
        <md-card>
          <md-card-header>
            <h4 class="title">Maha Status</h4>
            <select v-model="mahaStatusRowCount" class="form-control dashInput tableRowCount" style="margin-top: -1.9em;">
              <option v-for="val in ddlRowCount" v-bind:key="val" :value="val">{{val}}</option>
            </select>
          </md-card-header>
          <md-card-content>
            <maha-status-table :default-count="mahaStatusRowCount"></maha-status-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'

import {
  StatsCard,
  PermitQueueTable,
  PermitSuspendedTable,
  MahaStatusTable,
  VrsApplicationsTable,
  VrsInFlightTable,
  DashPermitModal,
  MahaStatusModal
} from '@/components'

const { mapFields } = createHelpers({
  getterType: 'getDashPermitField',
  mutationType: 'updateDashPermitField'
})

export default{
  components: {
    StatsCard,
    PermitQueueTable,
    PermitSuspendedTable,
    MahaStatusTable,
    VrsApplicationsTable,
    VrsInFlightTable,
    DashPermitModal,
    MahaStatusModal
  },
  data () {
    return {
      permitsInQueueRowCount: 10,
      isPermitsInQueueVisible: false,
      suspendedPermitsRowCount: 10,
      isPermitsSuspendedVisible: false,
      isVrsApplicationsVisible: true,
      vrsApplicationsRowCount: 10,
      isVrsInFlightVisible: true,
      vrsInFlightRowCount: 10,
      isMahaInspectionsVisible: true,
      mahaStatusRowCount: 10,
      ddlRowCount: [ 5, 10, 15, 25, 50, 100 ]
    }
  },
  computed: {
    ...mapFields([
      'permitsInQueue',
      'permitsSuspended',
      'vrsApplications',
      'vrsInFlightApplications',
      'mahaStatusRecords',
      'showDashModal',
      'showMahaStatusModal',
      'isBackgroundVisible',
      'isParish'
    ]),
    noPermanentPermits: function () {
      let output = this.permitsInQueue.filter(function (el) { return (el.permit_period === 'Permanent') })
      return output.length
    },
    noAnnualPermits: function () {
      let output = this.permitsInQueue.filter(function (el) { return (el.permit_period === 'Annual') })
      return output.length
    },
    noTempPermits: function () {
      let output = this.permitsInQueue.filter(function (el) { return (el.permit_period === 'Temporary') })
      return output.length
    },
    noNewVrs: function () {
      let output = this.vrsApplications.filter(function (el) { return (el.status === 'new') })
      return output.length
    },
    noApprovedVrs: function () {
      let output = this.vrsApplications.filter(function (el) { return (el.status === 'approved') })
      return output.length
    },
    noPayConfirmedVrs: function () {
      let output = this.vrsApplications.filter(function (el) { return (el.status === 'paymentconfirm') })
      return output.length
    },
    noPassedInspectVrs: function () {
      let output = this.vrsApplications.filter(function (el) { return (el.status === 'passinspection') })
      return output.length
    }
  },
  methods: {
    showHidePermitsInQueue () {
      this.isPermitsInQueueVisible = !this.isPermitsInQueueVisible
    },
    showHidePermitsSuspended () {
      this.isPermitsSuspendedVisible = !this.isPermitsSuspendedVisible
    },
    showHideVrsApplications () {
      this.isVrsApplicationsVisible = !this.isVrsApplicationsVisible
    },
    showHideMahaInspections () {
      this.isMahaInspectionsVisible = !this.isMahaInspectionsVisible
    }
  },
  mounted: async function () {
    this.$store.dispatch('resetDashPermit')
    this.$store.dispatch('resetVrs')
    // await this.$store.dispatch('actionPermitsInQueue')
    // await this.$store.dispatch('actionPermitsSuspended')
    await this.$store.dispatch('actionVrsApplications')
    await this.$store.dispatch('actionVrsInFlightApplications')
    await this.$store.dispatch('actionMahaStatusRecords')
  }
}
</script>
