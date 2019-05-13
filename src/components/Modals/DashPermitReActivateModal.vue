<template>
  <div>
    <md-dialog :md-active.sync="showDeclineDialog" :md-backdrop="false" style="width:30%; z-index:10;">
      <md-dialog-content>
        <div class="md-layout">
          <div class="md-layout-item">
            <label for="txtDeclineComment" class="dashLabel">Reason for re-activating Permit</label>
            <textarea
              id="txtDeclineComment"
              class="dashInput modalTextArea"
              rows="6"
              v-model="declineComment"/>
          </div>
        </div>
      </md-dialog-content>

      <md-dialog-actions class="mdDialogActions">
        <md-button class="md-button md-success" @click="reactivate()">Re-Activate</md-button>
        <md-button class="md-raised md-simple" @click="close()">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'getDashPermitField',
  mutationType: 'updateDashPermitField'
})

export default {
  name: 'dash-permit-reactivate-modal',
  props: [ 'showIssueDeclineModal' ],
  data () {
    return {
      showDeclineDialog: false
    }
  },
  computed: {
    ...mapFields([
      'declineComment',
      'isSuspend',
      'isBackgroundVisible'
    ])
  },
  watch: {
    showIssueDeclineModal () {
      this.showDeclineDialog = this.showIssueDeclineModal
    }
  },
  methods: {
    reactivate () {
      this.$store.dispatch('setIssuePermitApproveDecline', { isApproved: false, status: 'Active' })
      this.isBackgroundVisible = true
    },
    close () {
      this.$store.dispatch('actionHideReactivateModal')
    }
  }
}
</script>
