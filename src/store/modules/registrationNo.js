// import types from '../mutation-types'
import { createHelpers } from 'vuex-map-fields'
import types from '../mutation-types'
import {
  getRegistrationNoHistoryDataFromApi,
  getRegistrationNoAllByClassificationApi,
  getRegistrationNoRangeByClassificationApi,
  setRegistrationNoStatusApi,
  getTradeLicensesApi,
  setRegistrationNoBulkStatusUpdateApi,
  setExchangeRegNoApi,
  setRetainChangeRegNoApi,
  getRetainedByIdApi
} from '../../api/registrationNoApi'

import {
  getTradeLicensePdfFromStoreDataApi
} from '../../api/printApi'

import {
  getSystemConfigurationItemValueFromApi
} from '../../api/systemConfigurationApi'

import {
  getOwnerDetailsApi,
  setOwnerDetailsApi
} from '../../api/ownerApi'

import { getUnique, paging, createBlobFromByteArray, formatDate, convertToISODate } from '../../components/Functions/Functions.js'

const getDefaultState = () => {
  return {
    step: 1,
    regNoCheckedRow: null,
    isRegNoLoading: false,
    isHistoryDataVisible: false,
    isHistorySaveButtonVisible: false,
    isClassificationDdlVisible: true,
    checked: false,
    regNoHistoryData: [],
    regNoAllocationData: [],
    regNoAllExportData: [],
    regNoTradeLicenseData: [],
    regNoAssignedTradeLicenses: [],
    regNoAssignedTradeLicensesToRevoke: [],
    ownerIdData: [],
    tradeLicenseCount: null,
    tradeLicenseFee: null,
    selectedOwnerId: null,
    selectedOwnerIsCompany: false,
    regNoSearchText: null,
    regNoSearchDate: null,
    showRegistrationNoOwnerIdModal: false,
    search: {
      vehicleRegistrationNo: null,
      vehicleRegistrationNoType: null,
      vehicleRegistrationNoViewCount: 50,
      vehicleRegistrationNoViewPage: 1,
      isRegNoSearch: null
    },
    newTradeOwner: {
      business_id: '',
      business_name: null,
      address_line_1: null,
      address_line_2: null,
      address_line_3: null,
      parish: null,
      postcode: null,
      isMotorTrade: false,
      isActive: 1
    },
    searchOwnerId: { },
    regNoExchangeOwnership: {
      vehicleSearchData1: [],
      vehicleSearchData2: [],
      vehicleData1: [],
      vehicleData2: [],
      vehicleGenerateNewReg1: null,
      vehicleGenerateNewReg2: null,
      showVehicleTable1: false,
      showVehicleTable2: false,
      vehicleDisabled1: false,
      vehicleDisabled2: false,
      selectedVehicleDocUUID1: null,
      selectedVehicleDocUUID2: null
    },
    regNoRetainChangeOwnership: {
      vehicleSearchData: [],
      vehicleData: [],
      regNoRetainedList: [],
      newRegNo: null,
      vehicleGenerateNewReg: null,
      showVehicleTable: false,
      vehicleDisabled: false,
      selectedVehicleDocUUID: null,
      autoGenerateRegNo: false,
      retainChangeOption: null,
      thirdPartyIsCompany: false,
      thirdPartyOwnerSearch: {
        forenames: null,
        surname: null,
        business_name: null
      }
    }
  }
}

const { getRegistrationNoField, updateRegistrationNoField } = createHelpers({
  getterType: 'getRegistrationNoField',
  mutationType: 'updateRegistrationNoField'
})

const state = getDefaultState()

const actions = {
  async getRegistrationNoHistoryData ({ state, commit }) {
    let searchString = state.regNoSearchText.toUpperCase() + '/'
    if (state.regNoSearchDate !== null) {
      let dte = convertToISODate(state.regNoSearchDate)
      searchString = searchString + dte + '/'
      state.isClassificationDdlVisible = false
    }
    const res = await getRegistrationNoHistoryDataFromApi(searchString)
    if (res[0] === undefined) {
      let arr = []
      arr.push(res)
      commit(types.SET_REG_NO_HISTORY_DATA, arr)
      return arr
    } else {
      commit(types.SET_REG_NO_HISTORY_DATA, res)
      return res
    }
  },
  async getRegistrationNoAllByTypeData ({ state, commit }) {
    let res = await getRegistrationNoAllByClassificationApi(state.search.vehicleRegistrationNoType)
    commit(types.SET_REG_NO_ALL_EXPORT_DATA, res)
  },
  async getRegistrationNoByTypeData ({ state, commit }) {
    const res = await getRegistrationNoRangeByClassificationApi(state.search.vehicleRegistrationNoType, paging(state.search.vehicleRegistrationNoViewPage, state.search.vehicleRegistrationNoViewCount))
    commit(types.SET_REG_NO_ALLOCATION_DATA, res)
  },
  async getRegistrationNoByTypeAndParamsData ({ state, commit }, searchParams) {
    const res = await getRegistrationNoRangeByClassificationApi(searchParams.type, searchParams.paging)
    commit(types.SET_REG_NO_ALLOCATION_DATA, res)
  },
  async setRegistrationNoUpdate ({ state }) {
    let obj = {
      classification: state.regNoHistoryData[0].classification,
      registrationnumber: state.regNoHistoryData[0].registrationnumber
    }
    if (state.regNoHistoryData[0].classification === 'RETAINED' && state.selectedOwnerId !== null) {
      obj.owner_docuuid = state.selectedOwnerId
      obj.is_company = state.selectedOwnerIsCompany ? 1 : 0
    }
    let res = await setRegistrationNoStatusApi(obj)
    return res
  },
  async getOwnerIdDetails ({ state, commit }, { obj, savedAt }) {
    let res = await getOwnerDetailsApi(obj, 'people', true)
    commit(savedAt, res)
    return res
  },
  async getCompanyDetails ({ state, commit }, { obj, savedAt }) {
    let res = await getOwnerDetailsApi(obj, 'business', true)
    commit(savedAt, res)
    return res
  },
  async getTradeLicensePdfFromStoreData ({ state }) {
    let tradeLicenses = await getTradeLicensesApi(state.tradeLicenseCount)
    if (tradeLicenses.success) {
      let printArray = []
      let bulkUpdateArray = []
      tradeLicenses.data.forEach(function (item) {
        bulkUpdateArray.push({
          classification: 'HELD',
          owner_id: state.regNoTradeLicenseData.business_id.toString(),
          tradelicensenumber: item.tradelicensenumber
        })
        printArray.push({
          registrationMark: item.tradelicensenumber.replace('T', 'J'),
          fee: state.tradeLicenseFee,
          expiredDate: formatDate(new Date(new Date().getFullYear(), 11, 31)),
          name: state.regNoTradeLicenseData.business_name
        })
      })
      let bulkUpdate = await setRegistrationNoBulkStatusUpdateApi(bulkUpdateArray)
      if (bulkUpdate.success) {
        let res = await getTradeLicensePdfFromStoreDataApi(printArray)
        if (res) {
          return createBlobFromByteArray(res)
        }
      }
    }
  },
  async resetTradeLicenseStatus ({ state, dispatch }) {
    let bulkUpdateArray = []
    state.regNoAssignedTradeLicensesToRevoke.forEach(function (item) {
      bulkUpdateArray.push({
        classification: 'DEFAULT',
        owner_id: 0,
        tradelicensenumber: item.val
      })
    })
    let bulkUpdate = await setRegistrationNoBulkStatusUpdateApi(bulkUpdateArray)
    if (bulkUpdate.success) {
      state.regNoAssignedTradeLicensesToRevoke = []
      await dispatch('getCurrentAssignedTradeLicenses', state.regNoCheckedRow)
    }
  },
  async setOwnerDetailsAndReturnIdForTradeLicense ({ state }) {
    let res = await setOwnerDetailsApi(state.newTradeOwner, 'business', false)
    if (res.success) {
      return res
    }
  },
  async getTradeLicenseFee () {
    let obj = {
      name: 'Trade_licence'
    }
    let res = await getSystemConfigurationItemValueFromApi(obj)
    if (res.success) {
      return res.data.charges
    }
  },
  async exchangeRegNo ({ state, dispatch }) {
    let arr = []
    let vehicle1 = {
      regNumber: state.regNoExchangeOwnership.vehicleData1[0].registration_number,
      vehicleMake: state.regNoExchangeOwnership.vehicleData1[0].make,
      vehicleModel: state.regNoExchangeOwnership.vehicleData1[0].model,
      pullNew: false
    }
    arr.push(vehicle1)
    let vehicle2 = {
      regNumber: state.regNoExchangeOwnership.vehicleData2[0].registration_number,
      vehicleMake: state.regNoExchangeOwnership.vehicleData2[0].make,
      vehicleModel: state.regNoExchangeOwnership.vehicleData2[0].model,
      pullNew: false
    }
    arr.push(vehicle2)
    let res = await setExchangeRegNoApi(arr)
    if (res.success) {
      dispatch('resetRegistrationNo')
    }
  },
  async retainChangeOwnerShip ({ state, dispatch }) {
    let arr = []
    let retainOption = state.regNoRetainChangeOwnership.retainChangeOption
    arr.push({
      regNumber: state.regNoRetainChangeOwnership.vehicleData.registration_number,
      newRegNumber: state.regNoRetainChangeOwnership.newRegNo,
      vehicleMake: state.regNoRetainChangeOwnership.vehicleData.make,
      vehicleModel: state.regNoRetainChangeOwnership.vehicleData.model,
      action: state.regNoRetainChangeOwnership.retainChangeOption,
      ownerId: retainOption === 'allocate' ? state.regNoRetainChangeOwnership.thirdPartyIsCompany ? state.ownerIdData[0].business_id : state.ownerIdData[0].people_id : null,
      isCompany: retainOption === 'allocate' ? state.regNoRetainChangeOwnership.thirdPartyIsCompany : null
    })
    let res = await setRetainChangeRegNoApi(arr)
    if (res.success) {
      dispatch('resetRegistrationNo')
    }
  },
  async getCurrentAssignedTradeLicenses ({ state, commit }, ownerId) {
    let obj = {
      owner_id: ownerId
    }
    let res = await getOwnerDetailsApi(obj, 'tradelicense_pool', false)
    commit(types.SET_ASSIGNED_TRADE_LICENSES, res)
  },
  async getRegNoRetainedRegNoByOwnerId ({ state, commit }) {
    // let res = await getRetainedByIdApi(state.regNoRetainChangeOwnership.vehicleData.is_company, 'RETAIN', state.regNoRetainChangeOwnership.vehicleData.owner_docuuid)
    let res = await getRetainedByIdApi(false, 'RETAINED', 327521)
    if (res.success) {
      let arr = []
      res.data.forEach(function (item) {
        arr.push(item.registrationnumber)
      })
      return arr
    }
  },
  showHideRegistrationNoOwnerIdSelectModal ({ state, commit }) {
    commit(types.SET_SHOW_HIDE_REGNO_OWNER_ID_MODAL, !state.showRegistrationNoOwnerIdModal)
  },
  setArrayToSelectedRegNoRowData ({ state, commit }) {
    commit(types.SET_REG_NO_TRADE_LICENSE_ARRAY, state.ownerIdData.filter(a => a.business_id === state.regNoCheckedRow)[0])
  },
  resetRegistrationNo ({ commit }) {
    commit('resetRegistrationNoState')
  }
}

const mutations = {
  [types.UPDATE_REG_NO_STEP_VALUE] (state, isIncrement) {
    if (isIncrement) {
      state.step++
    } else {
      state.step--
    }
  },
  [types.SET_REG_NO_HISTORY_DATA] (state, data) {
    state.regNoHistoryData = data.length === 1 ? data : getUnique(data, 'updateddate')
  },
  [types.SET_REG_NO_ALLOCATION_DATA] (state, data) {
    state.regNoAllocationData = data
  },
  [types.SET_REG_NO_ALL_EXPORT_DATA] (state, data) {
    state.regNoAllExportData = data
  },
  [types.SET_IS_REG_NO_SEARCH] (state, value) {
    state.search.isRegNoSearch = value
  },
  [types.SET_SHOW_HIDE_REGNO_OWNER_ID_MODAL] (state, value) {
    state.showRegistrationNoOwnerIdModal = value
  },
  [types.SET_OWNER_ID_DATA] (state, data) {
    state.ownerIdData = data
    state.isRegNoLoading = false
  },
  [types.SET_REG_NO_TRADE_LICENSE_ARRAY] (state, data) {
    state.regNoTradeLicenseData = data
  },
  [types.SET_ASSIGNED_TRADE_LICENSES] (state, data) {
    let arr = []
    data.forEach(function (item) {
      arr.push({ val: item.tradelicense_number, action: false })
    })
    state.regNoAssignedTradeLicenses = arr
  },
  [types.RESET_REG_NO_STEP_VALUE] (state) {
    state.step = 1
  },
  setRegNoDataLoadingOn (state) {
    state.isRegNoLoading = true
  },
  resetRegistrationNoState (state) {
    Object.assign(state, getDefaultState())
  },
  updateRegistrationNoField
}

const getters = {
  getRegNoStep (state) {
    return state.step
  },
  getRegNoSearchCheckedId (state) {
    return state.regNoCheckedRow
  },
  getIsRegNoSearchNull (state) {
    return (state.searchOwnerId.business_name || state.searchOwnerId.postCode)
  },
  getIsOwnerIdDataListEmpty (state) {
    if (state.ownerIdData === undefined) {
      return false
    }
    return state.ownerIdData.length < 1
  },
  getIsRegNoDataLoading (state) {
    return state.isRegNoLoading
  },
  getShowRegistrationNoOwnerIdModal (state) {
    return state.showRegistrationNoOwnerIdModal
  },
  getCanExchangeOwner (state) {
    return state.regNoExchangeOwnership.vehicleDisabled1 && state.regNoExchangeOwnership.vehicleDisabled2
  },
  getIsExchangeOwnerVehicleData1Empty (state) {
    if (state.regNoExchangeOwnership.vehicleData1 === []) {
      return false
    }
    return state.regNoExchangeOwnership.vehicleData1.length > 0
  },
  getIsExchangeOwnerVehicleData2Empty (state) {
    if (state.regNoExchangeOwnership.vehicleData2 === []) {
      return false
    }
    return state.regNoExchangeOwnership.vehicleData2.length > 0
  },
  getIsRetainChangeOwnerVehicleDataEmpty (state) {
    if (state.regNoRetainChangeOwnership.vehicleData === []) {
      return false
    }
    return state.regNoRetainChangeOwnership.vehicleData.length > 0
  },
  getRegistrationNoField
}

export default {
  state,
  actions,
  mutations,
  getters
}
