<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header>
            <h4 class="title">Company Details</h4>
          </md-card-header>
          <md-card-content>
            <div class="md-layout vehicleDetails">
              <div class="md-layout-item md-small-size-100 md-size-20">
                <md-field>
                  <label>Company</label>
                  <md-input v-model="regNoTradeLicenseData.business_name" type="text" :disabled="true"></md-input>
                </md-field>
              </div>
            </div>
            <div class="md-layout vehicleDetails">
              <div class="md-layout-item md-small-size-100 md-size-20">
                <md-field>
                  <label>Number of Trade Licenses</label>
                  <md-input v-model="tradeLicenseCount" type="text"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-20">
                <md-field>
                  <label>Fee</label>
                  <md-input v-model="tradeLicenseFee" type="text" :disabled="true"></md-input>
                </md-field>
              </div>
            </div>
            <div class="md-layout vehicleDetails">
              <div style="text-align: left;">
                <span v-if="regNoAssignedTradeLicenses.length > 0">
                  <b>Assigned Trade Licenses: </b>(click trade license to select)
                    <div class="grid">
                      <div v-for="(item, index) in regNoAssignedTradeLicenses" v-bind:key="index">
                        <div v-if="index == 0 || index % 7 == 0" class="columns">
                          <div class="column" v-bind:class="{ clicked: isValEmpty(regNoAssignedTradeLicenses[index], 'action', false) }" @click="tradeLicenseClicked(index)">{{ isValEmpty(regNoAssignedTradeLicenses[index], 'val', null) }}</div>
                          <div class="column" v-bind:class="{ clicked: isValEmpty(regNoAssignedTradeLicenses[index+1], 'action', false) }" @click="tradeLicenseClicked(index+1)">{{ isValEmpty(regNoAssignedTradeLicenses[index+1], 'val', null) }}</div>
                          <div class="column" v-bind:class="{ clicked: isValEmpty(regNoAssignedTradeLicenses[index+2], 'action', false) }" @click="tradeLicenseClicked(index+2)">{{ isValEmpty(regNoAssignedTradeLicenses[index+2], 'val', null) }}</div>
                          <div class="column" v-bind:class="{ clicked: isValEmpty(regNoAssignedTradeLicenses[index+3], 'action', false) }" @click="tradeLicenseClicked(index+3)">{{ isValEmpty(regNoAssignedTradeLicenses[index+3], 'val', null) }}</div>
                          <div class="column" v-bind:class="{ clicked: isValEmpty(regNoAssignedTradeLicenses[index+4], 'action', false) }" @click="tradeLicenseClicked(index+4)">{{ isValEmpty(regNoAssignedTradeLicenses[index+4], 'val', null) }}</div>
                          <div class="column" v-bind:class="{ clicked: isValEmpty(regNoAssignedTradeLicenses[index+5], 'action', false) }" @click="tradeLicenseClicked(index+5)">{{ isValEmpty(regNoAssignedTradeLicenses[index+5], 'val', null) }}</div>
                          <div class="column" v-bind:class="{ clicked: isValEmpty(regNoAssignedTradeLicenses[index+6], 'action', false) }" @click="tradeLicenseClicked(index+6)">{{ isValEmpty(regNoAssignedTradeLicenses[index+6], 'val', null) }}</div>
                        </div>
                    </div>
                  </div>
                </span>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import { concatValues } from '../../Functions/Functions.js'

const { mapFields } = createHelpers({
  getterType: 'getRegistrationNoField',
  mutationType: 'updateRegistrationNoField'
})

export default {
  name: 'Child3',
  components: { },
  props: ['value'],
  data () {
    return { }
  },
  computed: {
    ...mapFields([
      'tradeLicenseCount',
      'tradeLicenseFee',
      'regNoTradeLicenseData',
      'regNoAssignedTradeLicenses',
      'regNoAssignedTradeLicensesToRevoke'
    ]),
    concatTradeLicenses () {
      return concatValues(this.regNoAssignedTradeLicenses, true)
    }
  },
  methods: {
    tradeLicenseClicked (index) {
      let val = this.regNoAssignedTradeLicenses[index]
      if (this.regNoAssignedTradeLicensesToRevoke.includes(val)) {
        let index = this.regNoAssignedTradeLicensesToRevoke.indexOf(val)
        if (index > -1) {
          val.action = false
          this.regNoAssignedTradeLicensesToRevoke.splice(index, 1)
        }
      } else {
        val.action = true
        this.regNoAssignedTradeLicensesToRevoke.push(val)
      }
    },
    isValEmpty (val, type, defaultVal) {
      if (val === undefined) {
        return defaultVal
      } else {
        return val[type]
      }
    }
  },
  async mounted () {
    this.tradeLicenseFee = await this.$store.dispatch('getTradeLicenseFee')
  }
}
</script>

<style>
  div.grid {
    border-radius: 5px;
    padding: 1em;
    margin-top: 1em;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
  }
  div.column {
    text-align: center;
    width: 7.5em !important;
    padding: 1em;
    margin: 0.5em;
  }
  div.column:hover {
    cursor: pointer;
    font-weight: 800;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
  }
  div.clicked {
    color: #FF0000;
    font-weight: 800;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
  }
  div.clicked:hover {
    color: #000000;
  }
</style>
