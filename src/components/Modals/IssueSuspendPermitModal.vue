<template>
  <div>
    <md-dialog :md-active.sync="showSuspendPermitDialog" :md-backdrop="false" style="width:30%; z-index:10;">
      <md-dialog-content>
        <div class="md-layout">
          <div class="md-layout-item">
            <label for="txtSuspendPermitComment" class="dashLabel">Reason to '{{this.newStatus.label}}' permit</label>
            <textarea
              id="txtSuspendPermitComment"
              class="dashInput modalTextArea"
              rows="6"
              v-model="suspendPermitComment"></textarea>
          </div>
        </div>
      </md-dialog-content>

      <md-dialog-actions class="mdDialogActions">
        <md-button class="md-button md-danger" @click="suspend">{{ this.newStatus.label }}</md-button>
        <md-button class="md-raised md-simple" @click="close()">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'getIssuePermitField',
  mutationType: 'updateIssuePermitField'
})

export default {
  name: 'issue-suspend-permit-modal',
  props: [ 'showSuspendPermitModal' ],
  data () {
    return {
      showSuspendPermitDialog: false
    }
  },
  computed: {
    ...mapFields([
      'suspendPermitComment',
      'permitStatus'
    ]),
    newStatus () {
      switch (this.permitStatus) {
        case 'Suspended':
          return { label: 'Revoke', status: 'Revoked' }
        case 'Active':
        case 'Revoked':
          return { label: 'Suspend', status: 'Suspended' }
        case 'Approved':
        case 'New':
          return { label: 'Decline', status: 'Declined' }
        default:
          return { label: 'Error', status: 'Error' }
      }
    }
  },
  watch: {
    showSuspendPermitModal () {
      this.showSuspendPermitDialog = this.showSuspendPermitModal
    }
  },
  methods: {
    suspend () {
      this.$store.dispatch('setIssuePermitStatusSuspendRenew', this.newStatus.status)
    },
    close () {
      this.$store.dispatch('actionHideIssueSuspendPermitModal')
    }
  }
}
</script>
