<template>
  <div ref="child">
    <md-card>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Company</label>
              <md-input v-model="searchOwnerId.business_name" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Post Code</label>
              <md-input v-model="searchOwnerId.postCode" type="text"></md-input>
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
  getterType: 'getRegistrationNoField',
  mutationType: 'updateRegistrationNoField'
})

export default {
  name: 'Child1',
  props: ['value'],
  data () {
    return { }
  },
  computed: {
    ...mapFields([
      'searchOwnerId'
    ])
  },
  methods: { },
  mounted: function () {
    this.$store.dispatch('resetRegistrationNo')
  }
}

</script>
