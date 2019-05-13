<template>
  <div style="margin-left: auto; margin-right: auto; width: 98%;">
    <!--<owner-id-modal :showOperationalModalProp="$store.getters.getShowRegistrationNoOwnerIdModal" />-->
    <md-card>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-15">
            <form enctype="multipart/form-data">
              <md-field>
                <label>Registration No Count</label>
                <md-input v-model="regNoToFetchCount" />
              </md-field>
            </form>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-30">
            <md-button class="md-raised md-success" @click="regNoFetch" style="margin-right: 1em;">Search</md-button>
          </div>
        </div>
        <div v-if="showContent" class="text-left" style="margin-left: 1.5em;">
          <div v-for="(item, index) in regNoAllocationData" v-bind:key="index" style="margin-bottom: 0.5em;">{{item.registrationnumber}}</div>
        </div>
      </md-card-content>
    </md-card>
    <!--<md-button v-if="isSaveButtonVisible" @click="saveUpdate" class="md-dense md-raised md-success" style="float: right;">Save</md-button>-->
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import { paging } from '../Functions/Functions.js'

const { mapFields } = createHelpers({
  getterType: 'getRegistrationNoField',
  mutationType: 'updateRegistrationNoField'
})

export default {
  name: 'regNo-batch-allocation',
  components: { },
  data () {
    return {
      regNoToFetchCount: null,
      showContent: false
    }
  },
  computed: {
    ...mapFields([
      'regNoAllocationData',
      'search.vehicleRegistrationNoType',
      'search.vehicleRegistrationNoViewCount',
      'search.vehicleRegistrationNoViewPage'
    ])
  },
  methods: {
    async regNoFetch () {
      let obj = {
        type: 'DEFAULT',
        paging: paging(1, this.regNoToFetchCount)
      }
      await this.$store.dispatch('getRegistrationNoByTypeAndParamsData', obj)
      this.showContent = true
      this.regNoToFetchCount = null
    },
    saveUpdate () {
      this.$store.dispatch('setRegistrationNoUpdate')
    },
    clearSearch () {
      this.regNoHistoryData = []
      this.regNoSearchText = null
      this.isSaveButtonVisible = false
      this.showContent = false
    },
    showModal () {
      this.$store.dispatch('showHideRegistrationNoOwnerIdSelectModal')
    }
  },
  mounted () {
    this.clearSearch()
  },
  destroyed () {
    this.clearSearch()
  }
}
</script>
