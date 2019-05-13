<template>
  <div>
    <md-dialog :md-active.sync="showVrsReceiptModal" :md-backdrop="false" style="width:30%; z-index:10;">
      <md-dialog-content>
        <div class="md-layout">
          <div class="md-layout-item">
            <md-field>
              <label>Receipt No.</label>
              <md-input v-model="receiptNo" type="text"></md-input>
            </md-field>
          </div>
        </div>
      </md-dialog-content>

      <md-dialog-actions class="mdDialogActions">
        <md-button class="md-button md-success" @click="submit()">Submit</md-button>
        <md-button class="md-raised md-simple" @click="close()">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'getVrsField',
  mutationType: 'updateVrsField'
})

export default {
  name: 'vrs-receipt-modal',
  props: [ 'showVrsReceiptModalProp' ],
  data () {
    return {
      showVrsReceiptModal: false,
      receiptNo: null
    }
  },
  computed: {
    ...mapFields([ ])
  },
  watch: {
    showVrsReceiptModalProp () {
      this.showVrsReceiptModal = this.showVrsReceiptModalProp
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('setReceiptData', this.receiptNo)
      this.close()
    },
    close () {
      this.$store.dispatch('showHideVrsReceiptModal', false)
    }
  }
}
</script>
