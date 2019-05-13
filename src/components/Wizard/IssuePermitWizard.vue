<template>
  <div>
    <issue-renew-permit-modal :showActivatePermitModal="this.$store.getters.getShowIssueRenewPermitModal" />
    <issue-suspend-permit-modal :showSuspendPermitModal="this.$store.getters.getShowIssueSuspendPermitModal" />
    <div id="loading" v-if="$store.getters.getIsIssueDataLoading">
      <img id="spinner" src="../../assets/img/spinner.gif" style="margin-top: 0.75em;"/>
    </div>
    <div class="md-layout-item md-size-100 text-right">
      <Child1 v-on:childToParent="onChildClick" v-if="step === 1"></Child1>
      <Child2 v-on:childToParent="onChildClick" v-if="step === 2"></Child2>
      <Child3 v-on:childToParent="onChildClick" v-if="step === 3"></Child3>
      <md-dialog-actions>
        <md-button v-if="step > 1" @click="back" class="md-raised md-warning">Back</md-button>
        <md-button v-if="step < 3 && this.$store.getters.getIsSearchNull" @click="next" class="md-raised md-success">Next</md-button>
        <md-button v-if="step === 3"
                   v-for="btnItem in step3ButtonArray"
                   v-bind:class="btnItem.btnClass"
                   v-bind:key="btnItem.btnText"
                   @click="getFunction(btnItem.btnFunc)"
                   class="md-raised">
          {{btnItem.btnText}}
        </md-button>
        <md-button @click="reset" class="md-raised md-simple">Reset</md-button>
      </md-dialog-actions>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import types from '../../store/mutation-types'

import Child1 from './IssuePermit/IssuePermit-step1.vue'
import Child2 from './IssuePermit/IssuePermit-step2.vue'
import Child3 from './IssuePermit/IssuePermit-step3.vue'

const { mapFields } = createHelpers({
  getterType: 'getIssuePermitField',
  mutationType: 'updateIssuePermitField'
})

export default {
  name: 'issue-permit-wizard',
  components: { Child1, Child2, Child3 },
  data: () => ({ fromChild: '' }),
  computed: {
    ...mapGetters('IssuePermit', ['issuePermit']),
    ...mapFields([
      'step',
      'permitStatus',
      'step3ButtonArray'
    ])
  },
  methods: {
    back  () {
      this.$store.commit(types.UPDATE_STEP_VALUE.toString(), false)
    },
    next () {
      if (this.$store.getters.getStep === 1) {
        this.$store.commit(types.UPDATE_STEP_VALUE.toString(), true)
      }
      if (this.$store.getters.getStep === 2) {
        if (this.$store.getters.getSearchCheckedId !== null) {
          this.$store.dispatch('setArrayToSelectedRowData')
          this.$store.commit(types.UPDATE_STEP_VALUE.toString(), true)
        }
      }
    },
    reset () {
      this.$store.dispatch('resetIssuePermit')
      this.$store.commit(types.RESET_STEP_VALUE.toString())
    },
    suspend () {
      this.$store.dispatch('actionShowIssueSuspendPermitModal')
    },
    activate () {
      this.$store.dispatch('actionShowIssueRenewPermitModal')
    },
    onChildClick (value) {
      this.fromChild = value
    },
    // Unfortunate extra function due to not being able to pass function in array object
    getFunction (name) {
      switch (name) {
        case 'activate':
          return this.activate()
        case 'suspend':
          return this.suspend()
        default:
          console.log(name + ': is not a function in IssuePermitWizard')
          break
      }
    }
  },
  beforeCreate: function () {
    this.$options.components.IssueSuspendPermitModal = require('../Modals/IssueSuspendPermitModal.vue').default
    this.$options.components.IssueRenewPermitModal = require('../Modals/IssueRenewPermitModal.vue').default
  },
  destroyed () {
    this.$store.dispatch('resetIssuePermit')
  }
}

</script>
