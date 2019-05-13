<template>
  <div>
    <md-content style="margin-left: 2em;">
      <h4 class="licenseHeader">Maha - Vehicle Test Complete
        <div style="font-size: 12px;">Enter registration number of vehicle that has just completed a Maha inspection <b style="color: red;">BUT</b> isn't displayed on the Dashboard</div>
      </h4>
      <div class="md-layout">
        <div class="md-layout-item md-small-size-100 md-size-40">
          <md-field>
            <label>Registration Number</label>
            <md-input v-model="registration_number" type="text"></md-input>
          </md-field>
        </div>
      </div>
      <div class="md-layout-item md-size-100 text-right">
        <md-dialog-actions>
          <md-button class="md-raised md-success" v-if="this.registration_number !== null" @click="submit()">Submit</md-button>
          <md-button @click="reset()" class="md-raised md-simple">Reset</md-button>
        </md-dialog-actions>
      </div>
    </md-content>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'getIssuePermitField',
  mutationType: 'updateIssuePermitField'
})

export default {
  name: 'maha-un-assigned',
  data () {
    return {
      registration_number: null
    }
  },
  computed: {
    ...mapFields([])
  },
  methods: {
    reset () {
      this.registration_number = null
    },
    submit () {
      this.$store.dispatch('setMahaStatusFromDashBoard', this.registration_number)
      this.registration_number = null
    }
  }
}

</script>
