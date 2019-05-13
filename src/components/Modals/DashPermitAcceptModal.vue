<template>
  <div style="position: relative;">
    <md-dialog :md-active.sync="showAcceptDialog" :md-backdrop="false" style="width:30%; z-index:10;">
      <md-dialog-content>
        <div class="md-layout">
          <div class="md-layout-item acceptModalMinHeight">
            <label for="ddlPermitConditions" class="dashLabel">Permit Conditions</label>
            <multiselect
              id="ddlPermitConditions"
              v-model="acceptPermitConditions"
              :options="permitConditionsArray"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Select one or many conditions"
              label="condition_code"
              track-by="condition_code">
              <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
            </multiselect>
            <span v-for="(item, index) in acceptPermitConditions" v-bind:key="item.condition_code">
              <div style="padding:5px 0 0 5px; overflow:hidden;">{{ item.condition_code + ': ' + item.condition_name }}</div><div v-if="index+1 < item.length">, </div>
            </span>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item" style="padding-top: 1.5em;">
            <label for="txtLaws" class="dashLabel">Laws</label>
            <textarea
              id="txtLaws"
              class="dashInput modalTextArea"
              rows="6"
              v-model="permitLaws"></textarea>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item" v-if="isPermitTemporary" style="padding-top: 1.5em;">
            <label for="txtTempRoute" class="dashLabel">Routing for Temporary permit</label>
            <textarea
              id="txtTempRoute"
              class="dashInput modalTextArea"
              rows="6"
              cols="68"
              v-model="permitTempRoute">
            </textarea>
          </div>
        </div>
      </md-dialog-content>

      <md-dialog-actions class="mdDialogActions" style="padding-right: 1em;">
        <md-button class="md-button md-success" @click="approve()">Approve</md-button>
        <md-button class="md-raised md-simple" @click="close()">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
import Multiselect from 'vue-multiselect'
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'getDashPermitField',
  mutationType: 'updateDashPermitField'
})

export default {
  name: 'dash-permit-accept-modal',
  props: [ 'showIssueAcceptModal' ],
  components: {
    'multiselect': Multiselect
  },
  data () {
    return {
      showAcceptDialog: false
    }
  },
  computed: {
    ...mapFields([
      'permitTempRoute',
      'permitLaws',
      'acceptPermitConditions',
      'permitConditionsArray',
      'isPermitTemporary',
      'isSuspend',
      'isBackgroundVisible'
    ])
  },
  watch: {
    showIssueAcceptModal () {
      this.showAcceptDialog = this.showIssueAcceptModal
    }
  },
  methods: {
    approve () {
      this.$store.dispatch('setIssuePermitApproveDecline', { isApproved: true, status: 'Approved' })
      this.isBackgroundVisible = true
    },
    close () {
      this.$store.dispatch('actionHideAcceptModal')
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
