<template>
  <div style="position: relative;">
    <md-dialog :md-active.sync="showDialog" :md-backdrop="false" style="width:25%; min-height:30%; z-index:10;">
      <md-dialog-content style="padding-top: 0 !important;">
        <h3>{{selectedParishDisplay}}</h3>
        <hr />
        <div class="md-layout">
          <div class="md-layout-item">
            <label class="dashLabel">Status:&nbsp;
              <select v-model="selectedParishStatus" class="form-control dashInput" v-bind:style="{ 'color': '#' + (selectedParishStatus ? '009900' : 'FF0000') }">
                <option v-for="(key, val) in ddlStatus" v-bind:key="key" :value="key">{{val}}</option>
              </select>
            </label>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item" style="padding-top: 1.5em;">
            <label for="txtParishComment" class="dashLabel">Comment</label>
            <textarea
              id="txtParishComment"
              class="dashInput modalTextArea"
              rows="6"
              v-model="parishComment">
            </textarea>
          </div>
        </div>
      </md-dialog-content>

      <md-dialog-actions class="mdDialogActions" style="padding-right: 1em;">
        <md-button class="md-button md-success" @click="save()">Save</md-button>
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
  name: 'parish-approve-decline-modal',
  props: [ 'showParishAcceptDeclineModal' ],
  components: { },
  data () {
    return {
      showDialog: false,
      ddlStatus: {
        'Decline': false,
        'Approve': true
      }
    }
  },
  computed: {
    ...mapFields([
      'parishDataArray',
      'selectedParish',
      'selectedParishDisplay',
      'selectedParishStatus',
      'selectedParishComment',
      'selectedDashRowData'
    ]),
    parishComment: {
      get: function () {
        return this.selectedParishComment === '""' ? null : this.selectedParishComment
      },
      set: function (newValue) {
        this.selectedParishComment = newValue
      }
    }
  },
  watch: {
    showParishAcceptDeclineModal () {
      this.showDialog = this.showParishAcceptDeclineModal
    }
  },
  methods: {
    save () {
      this.selectedDashRowData[0].parishes.find(a => a.parish === this.selectedParish).responded = this.selectedParishStatus
      this.selectedDashRowData[0].parishes.find(a => a.parish === this.selectedParish).comment = this.selectedParishComment
      this.$store.dispatch('setParishData')
      this.clearParisData()
      this.$store.dispatch('actionHideParishAcceptDeclineModal')
    },
    close () {
      this.clearParisData()
      this.$store.dispatch('actionHideParishAcceptDeclineModal')
    },
    clearParisData () {
      this.selectedParish = null
      this.selectedParishDisplay = null
      this.selectedParishStatus = null
      this.selectedParishComment = null
    }
  }
}
</script>
