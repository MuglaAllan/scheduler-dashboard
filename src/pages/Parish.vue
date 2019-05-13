<template>
  <div class="content">
    <dash-permit-modal :showIssueModal="showDashModal"></dash-permit-modal>
    <div class="md-layout" v-if="isBackgroundVisible">
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25" v-if="permitsInQueue !== undefined">
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>content_paste</md-icon>
          </template>
          <template slot="content">
            <p class="category">Permit - Applications</p>
            <h3 class="title">{{permitsInQueue.filter(function (el) { return (el.parish_permission === true) }).length}}</h3>
          </template>
          <template slot="footer">
            <div class="stats">
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25" v-if="permitsSuspended !== undefined">
        <stats-card data-background-color="red">
          <template slot="header">
            <md-icon>content_paste</md-icon>
          </template>
          <template slot="content">
            <p class="category">Permit - Suspended</p>
            <h3 class="title">{{permitsSuspended.length}}</h3>
          </template>
          <template slot="footer">
            <div class="stats">
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25" v-if="permitsInQueue !== undefined">
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>picture_in_picture</md-icon>
          </template>
          <template slot="content">
            <p class="category">Badge - Applications</p>
            <h3 class="title">{{permitsInQueue.length}}</h3>
          </template>
          <template slot="footer">
            <div class="stats">
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25" v-if="mahaStatusRecords !== undefined">
        <stats-card>
          <template slot="header">
            <md-icon>assignment_turned_in</md-icon>
          </template>
          <template slot="content">
            <p class="category">Maha - Inspections</p>
            <h3 class="title">{{mahaStatusRecords.length}}</h3>
          </template>
          <template slot="footer">
            <div class="stats">
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100" v-if="permitsInQueue !== undefined && isPermitsInQueueVisible">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Permits in Queue</h4>
            <select v-model="permitsInQueueRowCount" class="form-control dashInput tableRowCount">
              <option v-for="val in ddlRowCount" v-bind:key="val" :value="val">{{val}}</option>
            </select>
          </md-card-header>
          <md-card-content>
            <permit-queue-table table-header-color="green" :default-count="permitsInQueueRowCount"></permit-queue-table>
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
  DashPermitModal
} from '@/components'

const { mapFields } = createHelpers({
  getterType: 'getDashPermitField',
  mutationType: 'updateDashPermitField'
})

export default{
  components: {
    StatsCard,
    PermitQueueTable,
    DashPermitModal
  },
  data () {
    return {
      permitsInQueueRowCount: 10,
      isPermitsInQueueVisible: true,
      ddlRowCount: [ 5, 10, 15, 25, 50 ]
    }
  },
  computed: {
    ...mapFields([
      'permitsInQueue',
      'permitsSuspended',
      'mahaStatusRecords',
      'showDashModal',
      'showMahaStatusModal',
      'isBackgroundVisible',
      'isParish'
    ])
  },
  methods: {
    showHidePermitsInQueue () {
      this.isPermitsInQueueVisible = !this.isPermitsInQueueVisible
    }
  },
  mounted: async function () {
    this.$store.dispatch('resetDashPermit')
    this.$store.dispatch('actionSetIsParish', true)
    // await this.$store.dispatch('actionPermitsInQueue')
    // await this.$store.dispatch('actionPermitsSuspended')
    await this.$store.dispatch('actionMahaStatusRecords')
  }
}
</script>
