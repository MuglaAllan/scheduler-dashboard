<template>
  <div style="margin-left: auto; margin-right: auto; width: 98%;">
    <owner-id-modal :showOperationalModalProp="$store.getters.getShowRegistrationNoOwnerIdModal" />
      <md-card>
        <md-card-content>
          <form enctype="multipart/form-data">
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100 md-size-15">
                <md-field>
                  <label>Registration No.</label>
                  <md-input v-model="regNoSearchText" />
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-15">
                  <md-field>
                    <label>Date</label>
                    <md-input v-model="regNoSearchDate" type="text" @keyup="insertDobSlashes"></md-input>
                    <span class="md-helper-text">dd/mm/yyyy</span>
                  </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-30">
                <md-button class="md-raised md-success" @click="regNoSearch" style="margin-right: 1em;">Search</md-button>
                <md-button class="md-raised md-simple" @click="clearSearch" style="margin-right: 1em;">Clear</md-button>
              </div>
            </div>
          </form>
          <div v-if="isHistoryDataVisible">
            <div v-for="(item, index) in regNoHistoryData" v-bind:key="index" v-bind:class="!isRowEven(index) ? 'evenRow' : 'oddRow'" class="text-left historyDiv" style="margin-left: 1.5em;">
              <div class="md-layout regRow">
                <div v-if="index === 0" class="display-33">
                  <label class="dashLabel">Registration No.</label>
                  <div class="modalDiv">{{ item.registrationnumber }}</div>
                </div>
                <div v-if="index > 0 || !isClassificationDdlVisible" class="display-33">
                  <label class="dashLabel">Classification</label>
                  <div class="modalDiv">{{ item.classification }}</div>
                </div>
                <div class="display-33">
                  <label class="dashLabel">Last Updated</label>
                  <div class="modalDiv">{{ item.updateddate === null ? 'N/A' : new Date(item.updateddate).toLocaleDateString("en-GB") }}</div>
                </div>
              </div>
              <div v-if="item.Vehicle_Details !== undefined" class="md-layout regRow">
                <div class="display-50">
                  <label class="dashLabel">Make</label>
                  <div class="modalDiv">{{ item.Vehicle_Details.make }}</div>
                </div>
                <div class="display-50">
                  <label class="dashLabel">Model</label>
                  <div class="modalDiv">{{ item.Vehicle_Details.model }}</div>
                </div>
              </div>
              <div v-if="item.Owner_Details !== undefined" class="md-layout regRow">
                <div class="display-33">
                  <label class="dashLabel">Name</label>
                  <div class="modalDiv">{{ concatName(item.Owner_Details.data[0]) }}</div>
                </div>
                <div class="display-33" v-if="item.Owner_Details !== undefined">
                  <label class="dashLabel">Address</label>
                  <div class="modalDiv">{{ concatAddress(item.Owner_Details.data[0]) }}</div>
                </div>
              </div>
              <div v-if="index === 0 && isClassificationDdlVisible" class="md-layout regRow">
                <div class="display-15">
                  <md-field>
                    <label class="regLabel">Classification</label>
                    <md-select class="regDdl" v-model="item.classification" @md-selected="classificationChange(item.classification)" md-dense>
                      <md-option v-for="val in localDdlRegNoClassification" v-bind:key="val.id" v-bind:value="val.id" style="padding:0.4em 0 0 1em;">{{val.value}}</md-option>
                    </md-select>
                  </md-field>
                </div>
              </div>
              <div v-if="index === 0 && isHistorySaveButtonVisible && isClassificationDdlVisible" class="recentSave">
                <md-button @click="saveUpdate" class="md-dense md-raised md-success">Save</md-button>
              </div>
            </div>
          </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import { OwnerIdModal } from '@/components'
import { isEven, insertSlash, concatValues } from '../Functions/Functions.js'
import { ddlRegNoClassification } from '../Functions/DropDownLists.js'

const { mapFields } = createHelpers({
  getterType: 'getRegistrationNoField',
  mutationType: 'updateRegistrationNoField'
})

export default {
  name: 'regNo-history',
  components: { OwnerIdModal },
  data () {
    return {
      localDdlRegNoClassification: ddlRegNoClassification(),
      originalClassification: null
    }
  },
  computed: {
    ...mapFields([
      'isHistoryDataVisible',
      'isHistorySaveButtonVisible',
      'isClassificationDdlVisible',
      'selectedOwnerId',
      'regNoHistoryData',
      'regNoSearchText',
      'regNoSearchDate',
      'showRegistrationNoOwnerIdModal'
    ])
  },
  methods: {
    async regNoSearch () {
      this.regNoHistoryData = []
      let output = await this.$store.dispatch('getRegistrationNoHistoryData')
      this.isHistoryDataVisible = true
      this.originalClassification = output[0] !== undefined ? output[0].classification : null
    },
    saveUpdate () {
      this.$store.dispatch('setRegistrationNoUpdate')
      this.$store.dispatch('resetRegistrationNo')
    },
    clearSearch () {
      this.originalClassification = null
      this.isHistorySaveButtonVisible = false
      this.$store.dispatch('resetRegistrationNo')
    },
    showModal () {
      this.$store.dispatch('showHideRegistrationNoOwnerIdSelectModal')
    },
    classificationChange (classification) {
      if (this.originalClassification !== null && classification !== this.originalClassification) {
        this.isHistorySaveButtonVisible = true
      } else {
        this.isHistorySaveButtonVisible = false
      }

      if (classification === 'RETAINED' && (this.originalClassification !== 'RETAINED' && this.originalClassification !== null)) {
        this.$store.dispatch('showHideRegistrationNoOwnerIdSelectModal')
      }
    },
    isRowEven (index) {
      return isEven(index)
    },
    concatName: function (ownerObject) {
      if (ownerObject !== undefined) {
        if (ownerObject.business_name !== undefined) {
          return ownerObject.business_name
        } else {
          return concatValues([ownerObject.title, ownerObject.forenames, ownerObject.surname], false)
        }
      }
    },
    concatAddress: function (ownerObject) {
      if (ownerObject !== undefined) {
        return concatValues([ownerObject.address_line_1, ownerObject.address_line_2, ownerObject.address_line_3, ownerObject.parish, ownerObject.postcode], true)
      }
    },
    insertDobSlashes () {
      this.regNoSearchDate = insertSlash(this.regNoSearchDate)
    }
  },
  watch: {
    selectedOwnerId: function () {
      if (this.selectedOwnerId !== null) {
      }
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

<style>
  div.regRow {
    margin-bottom: 2vh;
  }
  div.historyDiv {
    border-radius: 5px;
    padding: 2em 1em 1em 2em;
    margin-bottom: 1em;
    margin-left: 0 !important;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
  }
  /*div.historyDiv:hover {*/
    /*background-color: #f5f5f5;*/
    /*opacity: 0.5;*/
  /*}*/
  div.evenRow {
    background-color: #f5f5f5;
  }
  div.recentSave {
    text-align: right;
  }
</style>
