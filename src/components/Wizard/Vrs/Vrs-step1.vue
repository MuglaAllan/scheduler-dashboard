<template>
  <div ref="child">
    <md-card>
      <md-card-content>
        <fieldset style="overflow: hidden; margin-bottom: 1.5em;">
          <div style=" float: left; clear: none;">
            <div class="radioTag">Search Type: </div>
            <input class="radio" type="radio" id="radioFalse" v-bind:value="false" v-model="isAdvancedSearch" />
            <label for="radioFalse" class="radioLbl">Simple</label>
            <input class="radio" type="radio" id="radioTrue" v-bind:value="true" v-model="isAdvancedSearch" />
            <label for="radioTrue" class="radioLbl">Advanced</label>
          </div>
        </fieldset>
        <div v-if="!isAdvancedSearch" class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Exact Registration No.</label>
              <md-input v-model="vrs_search.exactRegNo" type="text"></md-input>
            </md-field>
          </div>
          <p style="text-align: center; width: 100%; margin-top: 3vh;"><b>Or</b></p>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Registration No.</label>
              <md-input v-model="vrs_search.regNo" type="text" :disabled="vrsRegexFieldsEnabled"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Make</label>
              <md-input v-model="vrs_search.make" type="text" :disabled="vrsRegexFieldsEnabled"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Model</label>
              <md-input v-model="vrs_search.model" type="text" :disabled="vrsRegexFieldsEnabled"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Chassis No.</label>
              <md-input v-model="vrs_search.chassisNo" type="text" :disabled="vrsRegexFieldsEnabled"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Engine No.</label>
              <md-input v-model="vrs_search.engineNo" type="text" :disabled="vrsRegexFieldsEnabled"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Surname</label>
              <md-input v-model="vrs_search.surname" type="text" :disabled="vrsRegexFieldsEnabled"></md-input>
            </md-field>
          </div>
        </div>
        <div v-if="isAdvancedSearch">
          <table class="table" style="width: 70%;">
            <tbody>
              <tr v-for="(row, index) in vrs_search_rows" v-bind:key="index">
                <div class="md-layout">
                  <div class="md-layout-item md-small-size-100 md-size-30">
                    <md-field>
                      <label>Parameter</label>
                      <md-input v-model="row.displayValue" type="text" @input="searchFor($event, index)"></md-input>
                    </md-field>
                    <table v-if="row.tableVisible === true" class="table vrsOptions" cellspacing="0" id="firstTable" style="">
                      <tbody>
                      <tr class="highlightHover" v-for="item in row.tableData" :value="item.value" :key="item.id" @click="onRowClick(item.id, item.value, index)">
                        <td class="text-left">{{ item.value }}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-30">
                    <md-field>
                      <label>Value</label>
                      <md-input v-model="row.parameterValue" type="text"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-10" style="margin: 1.3vh 0 0 -2vw;">
                    <md-button class="md-icon-button md-dense md-danger" v-on:click="removeElement(index)">
                      <md-icon>remove</md-icon>
                    </md-button>
                  </div>
                </div>
              </tr>
            </tbody>
          </table>
          <md-dialog-actions style="justify-content: start; margin-left: -0.5vw;">
            <div>
              <md-button @click="addRow" class="md-raised md-success">Add Search Parameter</md-button>
            </div>
          </md-dialog-actions>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import { sortArrayByValue, searchForValueInArray } from '../../Functions/Functions.js'
import { ddlVrsSearchParameters } from '../../Functions/DropDownLists.js'

const { mapFields } = createHelpers({
  getterType: 'getVrsField',
  mutationType: 'updateVrsField'
})

export default {
  name: 'Child1',
  props: ['value'],
  data () {
    return {
      radio: false,
      localDdlSearchParameter: ddlVrsSearchParameters().sort(sortArrayByValue)
    }
  },
  computed: {
    ...mapFields([
      'vrsRegexFieldsEnabled',
      'isAdvancedSearch',
      'vrs_search',
      'vrs_search.exactRegNo',
      'vrs_search_rows'
    ])
  },
  methods: {
    addRow () {
      this.vrs_search_rows.push({
        hiddenId: null,
        displayValue: null,
        parameterValue: null,
        tableData: []
      })
    },
    removeElement (index) {
      this.vrs_search_rows.splice(index, 1)
    },
    searchFor (event, index) {
      this.vrs_search_rows[index].tableVisible = true
      if (event !== null) {
        if (event.length < 1) {
          this.filterData([], index)
        } else {
          let results = searchForValueInArray(event, this.localDdlSearchParameter)
          this.filterData(results, index)
        }
      }
    },
    filterData (output, index) {
      if (output.length === 1) {
        this.vrs_search_rows[index].hiddenId = output[0].id
        this.vrs_search_rows[index].displayValue = output[0].value
        this.vrs_search_rows[index].tableData = []
        this.vrs_search_rows[index].tableVisible = false
      }
      this.vrs_search_rows[index].tableData = output.slice(0, this.defaultCount)
    },
    onRowClick (id, value, index) {
      this.vrs_search_rows[index].hiddenId = id
      this.vrs_search_rows[index].displayValue = value
      this.vrs_search_rows[index].tableData = []
      this.vrs_search_rows[index].tableVisible = false
    }
  },
  mounted: function () {
    this.$store.dispatch('resetVrs')
  },
  watch: {
    exactRegNo () {
      this.vrsRegexFieldsEnabled = (this.exactRegNo.toString() !== '' && this.exactRegNo.toString() !== undefined)
    }
  }
}

</script>

<style>
  div.radioTag {
    float: left;
    clear: none;
    font-weight: 400;
    padding: 1px 0.75em 0 0;
  }
  input.radio {
    float: left;
    clear: none;
    margin: 5px 5px 0 2px;
  }
  label.radioLbl {
    float: left;
    clear: none;
    display: block;
    padding: 1px 1em 0 0;
  }
  .vrsOptions {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    margin-top: -1.5em;
    margin-left: -0.1em;
    position: fixed;
    z-index: 2;
    width: 15%;
    border-radius: 5px;
  }
</style>
