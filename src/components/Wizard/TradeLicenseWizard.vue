<template>
  <div>
    <div class="md-layout-item md-size-100 text-right"> <!-- v-bind:style="{ height: this.childHeight }" -->
      <child1 v-on:childToParent="onRegNoChildClick" v-if="$store.getters.getRegNoStep === 1"></child1>
      <child2 v-on:childToParent="onRegNoChildClick" v-if="$store.getters.getRegNoStep === 2"></child2>
      <child3 v-on:childToParent="onRegNoChildClick" v-if="$store.getters.getRegNoStep === 3"></child3>
      <md-dialog-actions>
        <md-button v-if="this.$store.getters.getRegNoStep > 1" @click="back" class="md-raised md-warning">Back</md-button>
        <md-button v-if="this.$store.getters.getRegNoStep < 3 && this.$store.getters.getIsRegNoSearchNull" @click="next" class="md-raised md-success">Next</md-button>
        <md-button v-if="this.$store.getters.getRegNoStep === 3 && tradeLicenseCount > 0" @click="printTradeLicensePdf" class="md-raised md-default">Print</md-button>
        <md-button v-if="this.$store.getters.getRegNoStep === 3 && regNoAssignedTradeLicensesToRevoke.length > 0" @click="revokeTradeLicense" class="md-raised md-danger">Revoke</md-button>
        <md-button @click="reset" class="md-raised md-simple">Reset</md-button>
      </md-dialog-actions>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import types from '../../store/mutation-types'
import { createHelpers } from 'vuex-map-fields'
import { printPdf, extractParameterNamesFromArrayObj } from '../Functions/Functions.js'

import child1 from './TradeLicense/TradeLicense-step1.vue'
import child2 from './TradeLicense/TradeLicense-step2.vue'
import child3 from './TradeLicense/TradeLicense-step3.vue'

const { mapFields } = createHelpers({
  getterType: 'getRegistrationNoField',
  mutationType: 'updateRegistrationNoField'
})

export default {
  name: 'trade-license-wizard',
  components: { child1, child2, child3 },
  data: () => ({ fromChild: '', titleFilterArray: [], childHeight: null }),
  computed: {
    ...mapGetters('Vrs', ['vrs']),
    ...mapFields([ 'vrsSearchList', 'tradeLicenseCount', 'newTradeOwner', 'regNoTradeLicenseData', 'regNoAssignedTradeLicensesToRevoke' ])
  },
  methods: {
    back () {
      this.$store.commit(types.UPDATE_REG_NO_STEP_VALUE.toString(), false)
    },
    async next () {
      if (this.$store.getters.getRegNoStep === 1) {
        return this.$store.commit(types.UPDATE_REG_NO_STEP_VALUE.toString(), true)
      }
      if (this.$store.getters.getRegNoStep === 2) {
        if (this.$store.getters.getIsOwnerIdDataListEmpty) {
          let res = await this.$store.dispatch('setOwnerDetailsAndReturnIdForTradeLicense')
          if (res.success) {
            this.newTradeOwner.docUUID = res.data.business_id
            this.$store.commit(types.SET_REG_NO_TRADE_LICENSE_ARRAY, this.newTradeOwner)
            this.$store.commit(types.UPDATE_REG_NO_STEP_VALUE.toString(), true)
          }
        } else {
          if (this.$store.getters.getRegNoSearchCheckedId !== null) {
            this.$store.dispatch('setArrayToSelectedRegNoRowData')
            this.$store.dispatch('getCurrentAssignedTradeLicenses', this.regNoTradeLicenseData.business_id)
            this.$store.commit(types.UPDATE_REG_NO_STEP_VALUE.toString(), true)
          }
        }
      }
    },
    reset () {
      this.$store.dispatch('resetRegistrationNo')
      this.$store.commit(types.RESET_REG_NO_STEP_VALUE)
    },
    onRegNoChildClick (value) {
      this.fromChild = value
    },
    async printTradeLicensePdf () {
      let pdf = await this.$store.dispatch('getTradeLicensePdfFromStoreData')
      if (pdf !== undefined) {
        printPdf(pdf, 'ExportTradeLicenseDocument')
      }
    },
    async revokeTradeLicense () {
      this.$store.dispatch('resetTradeLicenseStatus')
    }
  },
  mounted: function () {
    this.$store.dispatch('resetRegistrationNo')
    if (this.$store.getters.getRegNoStep === 2) {
      this.titleFilterArray = extractParameterNamesFromArrayObj(this.searchOwnerId[0])
    }
  },
  destroyed () {
    this.$store.dispatch('resetRegistrationNo')
  }
}

</script>
