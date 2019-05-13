<template>
  <div class="tabBack">
    <section>
      <b-tabs v-model="activeTab" class="block info" type="is-toggle" @input="resetStore">
        <b-tab-item label="Allocation / History">
          <regNo-history></regNo-history>
        </b-tab-item>
        <b-tab-item label="Review">
          <registration-no-by-type-table></registration-no-by-type-table>
        </b-tab-item>
        <b-tab-item label="Trade Licenses">
          <trade-license-wizard></trade-license-wizard>
        </b-tab-item>
        <b-tab-item label="Exchange">
          <exchange-ownership></exchange-ownership>
        </b-tab-item>
        <b-tab-item label="Retain / Change">
          <retain-change-ownership></retain-change-ownership>
        </b-tab-item>
        <b-tab-item label="Batch Allocation">
          <regNo-batch-allocation></regNo-batch-allocation>
        </b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>

<script>
import {
  NavTabsCard,
  RegNoHistory,
  ExchangeOwnership,
  RetainChangeOwnership,
  RegNoBatchAllocation,
  TradeLicenseWizard,
  RegistrationNoByTypeTable
} from '@/components'

export default{
  components: {
    NavTabsCard,
    RegNoHistory,
    ExchangeOwnership,
    RetainChangeOwnership,
    RegNoBatchAllocation,
    TradeLicenseWizard,
    RegistrationNoByTypeTable
  },
  data () {
    return {
      activeTab: 0
    }
  },
  methods: {
    resetStore () {
      this.$store.dispatch('resetRegistrationNo')
      this.$store.dispatch('resetVrs')
    }
  }
}
</script>
