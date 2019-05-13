<template>
  <div>
    <div class="md-layout-item md-size-100 text-right"> <!-- v-bind:style="{ height: this.childHeight }" -->
      <child1 v-on:childToParent="onVrsChildClick" v-if="$store.getters.getVrsStep === 1" ref="child"></child1>
      <child2 v-on:childToParent="onVrsChildClick" v-if="$store.getters.getVrsStep === 2"></child2>
      <child3 v-on:childToParent="onVrsChildClick" v-if="$store.getters.getVrsStep === 3"></child3>
      <md-dialog-actions>
        <md-button v-if="this.$store.getters.getVrsStep > 1" @click="back" class="md-raised md-warning">Back</md-button>
        <md-button v-if="this.$store.getters.getVrsStep === 2" @click="exportData" class="md-raised md-default">Export Data</md-button>
        <md-button v-if="this.$store.getters.getVrsStep === 3" @click="printVrsPdf" class="md-raised md-default">Print VRD</md-button>
        <md-button v-if="this.$store.getters.getVrsStep === 3 && this.$store.getters.getVrsRegStatus === 'permanentlyexported'" @click="printExportVrsPdf" class="md-raised md-default">Print Export</md-button>
        <md-button v-if="this.$store.getters.getVrsStep < 3 && this.$store.getters.getIsVrsSearchNull" @click="next" class="md-raised md-success">Next</md-button>
        <md-button @click="reset" class="md-raised md-simple">Reset</md-button>
      </md-dialog-actions>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import types from '../../store/mutation-types'
import { createHelpers } from 'vuex-map-fields'
import { extractParameterNamesFromArrayObj, downloadCSV, printPdf } from '../Functions/Functions.js'

import child1 from './Vrs/Vrs-step1.vue'
import child2 from './Vrs/Vrs-step2.vue'
import child3 from './Vrs/Vrs-step3.vue'

const { mapFields } = createHelpers({
  getterType: 'getVrsField',
  mutationType: 'updateVrsField'
})

export default {
  name: 'vrs-wizard',
  components: { child1, child2, child3 },
  data: () => ({ fromChild: '', titleFilterArray: [], childHeight: null }),
  computed: {
    ...mapGetters('Vrs', ['vrs']),
    ...mapFields([ 'vrsSearchList' ])
  },
  methods: {
    back  () {
      this.$store.commit(types.UPDATE_VRS_STEP_VALUE.toString(), false)
    },
    next () {
      if (this.$store.getters.getVrsStep === 1) {
        this.$store.commit(types.UPDATE_VRS_STEP_VALUE.toString(), true)
      }
      if (this.$store.getters.getVrsStep === 2) {
        if (this.$store.getters.getVrsSearchCheckedId !== null) {
          this.$store.dispatch('setArrayToSelectedVrsRowData')
          this.$store.commit(types.UPDATE_VRS_STEP_VALUE.toString(), true)
        }
      }
    },
    exportData () {
      downloadCSV({ filename: 'Export_' + new Date().toLocaleDateString('en-GB') + '.csv', dataArray: this.vrsSearchList })
    },
    async printVrsPdf () {
      let pdf = await this.$store.dispatch('getVrsPdfFromStoreData')
      printPdf(pdf, 'VRDDocument')
    },
    async printExportVrsPdf () {
      let pdf = await this.$store.dispatch('getExportVrsPdfFromStoreState')
      printPdf(pdf, 'ExportVRDDocument')
    },
    reset () {
      this.$store.dispatch('resetVrs')
      this.$store.commit(types.RESET_VRS_STEP_VALUE.toString())
    },
    onVrsChildClick (value) {
      this.fromChild = value
    }
  },
  mounted: function () {
    this.$store.dispatch('resetVrs')
    if (this.$store.getters.getVrsStep === 2) {
      this.titleFilterArray = extractParameterNamesFromArrayObj(this.vrsSearchList[0])
    }
  },
  destroyed () {
    // this.$store.dispatch('resetVrs')
  }
}

</script>
