<template>
  <div class="tabBack">
    <section>
      <b-tabs v-model="activeTab" class="block success" type="is-toggle" @input="resetPermit">
        <b-tab-item label="Search">
          <issue-permit-wizard></issue-permit-wizard>
        </b-tab-item>
        <b-tab-item label="Maha Un-Assigned">
          <maha-un-assigned></maha-un-assigned>
        </b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>

<script>
import {
  NavTabsCard,
  IssuePermitWizard,
  MahaUnAssigned
} from '@/components'

export default{
  components: {
    NavTabsCard,
    IssuePermitWizard,
    MahaUnAssigned
  },
  data () {
    return {
      activeTab: 0
    }
  },
  methods: {
    resetPermit () {
      this.$store.dispatch('resetIssuePermitState')
    }
  }
}
</script>
