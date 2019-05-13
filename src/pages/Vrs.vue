<template>
  <div class="tabBack">
    <section>
      <b-tabs v-model="activeTab" class="block warning" type="is-toggle" @input="resetStore">
        <b-tab-item label="Search">
          <vrs-wizard></vrs-wizard>
        </b-tab-item>
        <b-tab-item label="New">
          <new-vrs></new-vrs>
        </b-tab-item>
        <b-tab-item label="Change of Ownership">
          <change-ownership></change-ownership>
        </b-tab-item>
        <b-tab-item label="Recall">
          <recall-vrs></recall-vrs>
        </b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import {
  NavTabsCard,
  ChangeOwnership,
  VrsWizard,
  NewVrs,
  RecallVrs
} from '@/components'

const { mapFields } = createHelpers({
  getterType: 'getVrsField',
  mutationType: 'updateVrsField'
})

export default{
  components: {
    NavTabsCard,
    ChangeOwnership,
    VrsWizard,
    NewVrs,
    RecallVrs
  },
  computed: {
    ...mapFields([
      'vehicleBodyTypes',
      'vehicleManufacturers'
    ])
  },
  data () {
    return {
      activeTab: 0
    }
  },
  methods: {
    resetStore () {
      this.$store.dispatch('resetVrs')
      if (this.activeTab === 1) {
        this.$store.dispatch('getGenericVehicleReferenceData')
      }
    }
  },
  mounted: function () { }
}
</script>

<style>
  .orangeTabs nav.tabs {
    border: 1px solid #5E5E5C;
    margin: 0 auto;
  }
</style>
