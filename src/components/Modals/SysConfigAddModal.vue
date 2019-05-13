<template>
  <div>
    <md-dialog :md-active.sync="showSysConfigAddModal" :md-backdrop="false" style="width:45%; z-index:10;">
      <md-dialog-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-60">
            <md-field class="md-toolbar-section-end">
              <label>New Value</label>
              <md-input v-model="systemConfigValueAddValue" />
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-40" style="margin-top: 1.5vh;">
            <md-button class="md-dense md-raised md-success" @click="addValue">Add</md-button>
            <md-button class="md-dense md-raised md-simple" @click="clearValue" style="margin-left: 1em;">Clear</md-button>
          </div>
        </div>
      </md-dialog-content>
      <md-dialog-actions class="mdDialogActions">
        <md-button class="md-raised md-simple" @click="close()">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'getSystemConfigurationField',
  mutationType: 'updateSystemConfigurationField'
})

export default {
  name: 'sysConfigAdd-modal',
  props: [ 'showSysConfigAddModalProp' ],
  data () {
    return {
      defaultCount: 0,
      showSysConfigAddModal: false,
      selected: [],
      isVisible: true,
      tableData: [],
      searchText: null
    }
  },
  computed: {
    ...mapFields([
      'systemConfigValueAddValue'
    ])
  },
  methods: {
    addValue () {
      this.$store.dispatch('addNewSystemConfigurationValue')
      this.close()
    },
    clearValue () {
      this.systemConfigValueAddValue = null
    },
    close () {
      this.clearValue()
      this.$store.dispatch('setShowSystemConfigValueAddModal', false)
    }
  },
  watch: {
    showSysConfigAddModalProp () {
      this.showSysConfigAddModal = this.showSysConfigAddModalProp
    }
  }
}
</script>
