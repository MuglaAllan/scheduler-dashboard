<template>
  <div class="tabBack">
    <sysConfigAdd-modal :showSysConfigAddModalProp="showSystemConfigValueModal" />
    <section>
      <b-tabs v-model="activeTab" class="block danger" type="is-toggle" @input="resetStore">
        <b-tab-item label="Fees">
          <system-configuration-fee-table></system-configuration-fee-table>
        </b-tab-item>
        <b-tab-item label="Values">
          <system-configuration-values-table></system-configuration-values-table>
        </b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'

import {
  NavTabsCard,
  SystemConfigurationFeeTable,
  SystemConfigurationValuesTable,
  SysConfigAddModal
} from '@/components'

const { mapFields } = createHelpers({
  getterType: 'getSystemConfigurationField',
  mutationType: 'updateSystemConfigurationField'
})

export default{
  components: {
    SystemConfigurationFeeTable,
    SystemConfigurationValuesTable,
    NavTabsCard,
    SysConfigAddModal
  },
  data () {
    return {
      activeTab: 0
    }
  },
  computed: {
    ...mapFields([
      'showSystemConfigValueModal',
      'systemConfigFeeData',
      'systemConfigValuesData'
    ])
  },
  methods: {
    resetStore () {
      this.$store.dispatch('resetSystemConfiguration')
    }
  },
  destroyed () {
    this.$store.dispatch('resetSystemConfiguration')
  }
}
</script>
