<template>
  <div style="margin-left: auto; margin-right: auto; width: 98%;">
    <md-card>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-30">
            <form enctype="multipart/form-data">
              <md-field>
                <label>Upload File</label>
                <md-file @change="onFileChange" v-if="uploadReady"  ref="fileInput" />
              </md-field>
            </form>
            <div v-if="!isVinRecallArrayNotEmpty" class="inputWarning">(Import files <u>MUST</u> be in .csv file format)</div>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-button class="md-raised md-simple" @click="clearSearch">Clear</md-button>
            <md-button class="md-raised md-default" @click="exportData(true)" v-if="isVinRecallArrayNotEmpty" style="margin-left: 1em;">Export Data</md-button>
          </div>
        </div>
        <div v-if="$store.getters.getIsVrsDataLoading">
          <img id="spinner" src="../../assets/img/spinner.gif" />
        </div>
        <div class="table-responsive table-upgrade" v-if="isVinRecallArrayNotEmpty" style="margin-left: auto; margin-right: auto;">
          <table class="table" cellspacing="0" id="firstTable" style="margin-left: 1vw; width:95%;">
            <thead>
            <tr v-if="isVinRecallArrayNotEmpty" style="font-size: 12pt !important; color: #f57c00;">
              <th class="text-left sortHover" width="16%" @click="sort('registration_number')">Reg No.</th>
              <th class="text-left sortHover" width="16%" @click="sort('make')">Make</th>
              <th class="text-left sortHover" width="16%" @click="sort('model')">Models</th>
              <th class="text-left sortHover" width="16%" @click="sort('chassis_number')">Chassis No.</th>
              <th class="text-left sortHover" width="16%" @click="sort('engine_number')">Engine No.</th>
              <th class="text-left" width="20%">Name</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="!isVinRecallArrayNotEmpty">
              <td colspan="6" class="text-left">No matches found - refine search parameters and try again</td>
            </tr>
            <tr class="highlightHover" v-if="isVinRecallArrayNotEmpty" v-for="row in sortedList" :value="row.permit_number" :key="row.permit_number" @click="vrsCheckedRow = row.docUUID">
              <td class="text-left">{{row.registration_number}}</td>
              <td class="text-left">{{row.make}}</td>
              <td class="text-left">{{row.model}}</td>
              <td class="text-left">{{row.chassis_number}}</td>
              <td class="text-left">{{row.engine_number}}</td>
              <td class="text-left">{{(row.forenames !== undefined ? row.forenames : '')  + ' ' + (row.surname !== undefined ? row.surname : '')}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import { downloadCSV } from '../Functions/Functions.js'
import types from '../../store/mutation-types'

const { mapFields } = createHelpers({
  getterType: 'getVrsField',
  mutationType: 'updateVrsField'
})

export default {
  name: 'recall-vrs',
  components: { },
  data () {
    return {
      uploadReady: true,
      currentSort: 'regNo',
      currentSortDir: 'asc'
    }
  },
  computed: {
    ...mapFields([
      'vrsVinRecallArray'
    ]),
    isVinRecallArrayNotEmpty: function () {
      return this.vrsVinRecallArray.length > 0
    },
    sortedList: function () {
      let array = this.vrsVinRecallArray
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
    onFileChange (e) {
      this.vrsVinRecallArray = []
      this.$store.commit(types.SET_VRS_LOADING, true)
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createInput(files[0])
    },
    async createInput (file) {
      let reader = new FileReader()
      let vm = this
      reader.onload = () => {
        vm.fileinput = reader.result
      }
      reader.readAsText(file)
      reader.onloadend = () => {
        this.$store.dispatch('actionVrsSearchByVinArray', this.fileinput.replace(/[\n\r]+/g, ','))
      }
    },
    exportData () {
      let filename = 'Export_Vin_Recall_'
      downloadCSV({ filename: filename + new Date().toLocaleDateString('en-GB') + '.csv', dataArray: this.vrsVinRecallArray })
    },
    async clearSearch () {
      this.clearSearchField()
      this.vrsVinRecallArray = []
    },
    clearSearchField () {
      this.uploadReady = false
      this.$nextTick(() => {
        this.uploadReady = true
      })
    },
    sort: function (s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = s
    }
  },
  watch: {
    firstEverRegDate: function (val) {
      let firstReg = new Date(val)
      let now = new Date()
      this.isOver25yrs = now.getFullYear() - firstReg.getFullYear() > 25
    }
  }
}

</script>

<style scoped>
  div.inputWarning {
    position: absolute;
    margin: -1.5em 0 0 2.75em;
    font-size: 10pt;
    color: #b71c1c;
  }
</style>
