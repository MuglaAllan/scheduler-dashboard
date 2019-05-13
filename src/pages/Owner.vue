<template>
  <div class="tabBack">
    <section>
      <b-tabs v-model="activeTab" class="block fret" type="is-toggle" @input="resetStore">
        <b-tab-item label="People">
          <owner-person></owner-person>
        </b-tab-item>
        <b-tab-item label="Businesses">
          <owner-business></owner-business>
        </b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'

import {
  NavTabsCard,
  OwnerBusiness,
  OwnerPerson
} from '@/components'

const { mapFields } = createHelpers({
  getterType: 'getOwnerField',
  mutationType: 'updateOwnerField'
})

export default{
  components: {
    NavTabsCard,
    OwnerBusiness,
    OwnerPerson
  },
  data () {
    return {
      activeTab: 0
    }
  },
  computed: {
    ...mapFields([ ])
  },
  methods: {
    resetStore () {
      this.$store.dispatch('resetOwner')
    }
  },
  destroyed () {
    this.$store.dispatch('resetOwner')
  }
}
</script>
