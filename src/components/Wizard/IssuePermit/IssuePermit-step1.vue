<template>
  <div>
    <md-card>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Permit No</label>
              <md-input v-model="permitNo" type="text" v-on:keyup="permitNoUpdated"></md-input>
            </md-field>
          </div>
          <p style="text-align: center; width: 100%; margin-top: 3vh;"><b>Or</b></p>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Reference</label>
              <md-input v-model="ref" type="text" :disabled="hasPermitNoBeenUpdated"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Last Name</label>
              <md-input v-model="lastName" type="text" :disabled="hasPermitNoBeenUpdated"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>First Name</label>
              <md-input v-model="firstName" type="text" :disabled="hasPermitNoBeenUpdated"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Company Name</label>
              <md-input v-model="companyName" type="text" :disabled="hasPermitNoBeenUpdated"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Post Code</label>
              <md-input v-model="postCode" type="text" :disabled="hasPermitNoBeenUpdated"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Vehicle Registration</label>
              <md-input v-model="vehicleRegistration" type="text" :disabled="hasPermitNoBeenUpdated"></md-input>
            </md-field>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'getIssuePermitField',
  mutationType: 'updateIssuePermitField'
})

export default {
  name: 'Child1',
  props: ['value'],
  computed: {
    ...mapFields([
      'search.ref',
      'search.permitNo',
      'search.lastName',
      'search.firstName',
      'search.companyName',
      'search.postCode',
      'search.vehicleRegistration'
    ])
  },
  data () {
    return {
      hasPermitNoBeenUpdated: false
    }
  },
  methods: {
    permitNoUpdated () {
      this.hasPermitNoBeenUpdated = this.permitNo !== ''
    }
  },
  mounted: function () {
    this.$store.dispatch('resetIssuePermit')
  }
}

</script>
