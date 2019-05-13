<template>
  <div>
    <md-dialog :md-active.sync="showRenewPermitDialog" :md-backdrop="false" style="width:30%; z-index:10;">
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
        <md-button class="md-button md-success" @click="activate">{{this.newStatus.label}}</md-button>
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
  name: 'issue-renew-permit-modal',
  props: [ 'showActivatePermitModal' ],
  data () {
    return {
      showRenewPermitDialog: false,
      status: this.permitStatus === 'Revoked' ? 'Reactivate' : 'Activate'
    }
  },
  computed: {
    ...mapFields([
      'suspendPermitComment',
      'permitStatus'
    ]),
    newStatus () {
      switch (this.permitStatus) {
        case 'New':
          return { label: 'Approve', status: 'Approved' }
        case 'Revoked':
          return { label: 'Reactivate', status: 'Reactivate' }
        case 'Suspended':
        case 'Approved':
          return { label: 'Activate', status: 'Active' }
        default:
          return { label: 'Error', status: 'Error' }
      }
    }
  },
  watch: {
    showActivatePermitModal () {
      this.showRenewPermitDialog = this.showActivatePermitModal
    }
  },
  methods: {
    activate () {
      this.$store.dispatch('setIssuePermitStatusSuspendRenew', this.newStatus.status)
    },
    close () {
      this.$store.dispatch('actionHideIssueRenewPermitModal')
    }
  }
}
</script>
