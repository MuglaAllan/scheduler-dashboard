import { createHelpers } from 'vuex-map-fields'
import { renameObjectProperty } from '../../components/Functions/Functions.js'
import { getSystemConfigurationItemsFromApi, setSystemConfigurationFeeApi, setSystemConfigurationValueApi } from '../../api/systemConfigurationApi'
import { setOperationalValueApi } from '../../api/operationalApi'

const getDefaultState = () => {
  return {
    systemConfigFeeData: [],
    systemConfigValuesData: [],
    systemConfigValuesDdl: null,
    systemConfigValueAddValue: null,
    originalRowDataFee: null,
    originalRowDataValue: null,
    showSystemConfigValueModal: false
  }
}

const { getSystemConfigurationField, updateSystemConfigurationField } = createHelpers({
  getterType: 'getSystemConfigurationField',
  mutationType: 'updateSystemConfigurationField'
})

const state = getDefaultState()

const actions = {
  async actionGetSystemConfigurationFees ({ commit, state }) {
    let res = await getSystemConfigurationItemsFromApi('fee')
    state.systemConfigFeeData = res
  },
  async actionGetSystemConfigurationValues ({ commit, state }) {
    if (state.systemConfigValuesDdl !== null) {
      const res = await getSystemConfigurationItemsFromApi(state.systemConfigValuesDdl)
      let tableData = renameObjectProperty(state.systemConfigValuesDdl, 'value', res)
      state.systemConfigValuesData = tableData
    }
  },
  async setSystemConfigurationFee ({ commit }, { obj }) {
    let arr = []
    arr.push(obj)
    await setSystemConfigurationFeeApi(arr)
  },
  async setSystemConfigurationValue ({ state, commit }, { oldValue, newValue }) {
    let arr = []
    let obj = {
      select: {
        [state.systemConfigValuesDdl]: oldValue
      },
      values: {
        [state.systemConfigValuesDdl]: newValue
      }
    }
    arr.push(obj)
    await setSystemConfigurationValueApi(arr, state.systemConfigValuesDdl)
  },
  async addNewSystemConfigurationValue ({ state }) {
    let obj = {
      [state.systemConfigValuesDdl]: state.systemConfigValueAddValue
    }
    let res = await setOperationalValueApi(obj, state.systemConfigValuesDdl, false)
    if (res.success) {
      return res.data
    } else {
      alert('Value not inserted - please try again')
    }
  },
  setShowSystemConfigValueAddModal ({ state }) {
    state.showSystemConfigValueModal = !state.showSystemConfigValueModal
  },
  resetSystemConfiguration ({ commit }) {
    commit('resetSystemConfigurationState')
  }
}

const mutations = {
  resetSystemConfigurationState (state) {
    Object.assign(state, getDefaultState())
  },
  updateSystemConfigurationField
}

const getters = {
  getSystemConfigurationField
}

export default {
  state,
  actions,
  mutations,
  getters
}
