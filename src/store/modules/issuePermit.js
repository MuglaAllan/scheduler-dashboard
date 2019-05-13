import types from '../mutation-types'
import { createHelpers } from 'vuex-map-fields'

import {
  getUsersListFromApi,
  updatePermitApi,
  getPermitsConditionsFromApi,
  updateMahaStatusApi
} from '../../api/permitApi'

const getDefaultState = () => {
  return {
    step: 1,
    search: {
      ref: null,
      permitNo: null,
      firstName: null,
      lastName: null,
      companyName: null,
      postCode: null,
      vehicleRegistration: null
    },
    userList: [],
    step3ButtonArray: [],
    issuePermitCheckedRow: null,
    selectedSearchData: [],
    selectedIssueConditions: [],
    selectedIssueLaws: null,
    originalSelectedIssueLaws: null,
    originalSelectedIssueConditions: [],
    dropDownPermitConditions: [],
    selectedDocUUID: null,
    issueLoading: false,
    suspendPermitComment: null,
    showIssueSuspendPermitModal: false,
    showIssueRenewPermitModal: false,
    permitStatus: null,
    buttonType: null
  }
}

const { getIssuePermitField, updateIssuePermitField } = createHelpers({
  getterType: 'getIssuePermitField',
  mutationType: 'updateIssuePermitField'
})

const state = getDefaultState()

const actions = {
  async getUserListData ({ state, commit }) {
    const res = await getUsersListFromApi(state.search)
    commit(types.GET_ISSUE_PERMIT_USERS, res)
    return res
  },
  async setIssuePermitStatusSuspendRenew ({ state, commit, dispatch }, status) {
    let obj = {
      docUUID: state.selectedDocUUID,
      status: status,
      comment: state.suspendPermitComment,
      action: 'status_update'
    }
    let data = await updatePermitApi(obj)
    if (data) {
      dispatch('actionHideIssueSuspendPermitModal')
      dispatch('actionHideActivatePermitModal')
      commit('resetIssuePermitState')
    }
    return data
  },
  async setPermitConditions ({ state }) {
    let obj = {
      docUUID: state.selectedDocUUID,
      conditions: state.selectedIssueConditions,
      action: 'document_update'
    }
    let data = await updatePermitApi(obj)
    return data
  },
  async setPermitLaws ({ state }) {
    let obj = {
      docUUID: state.selectedDocUUID,
      laws: state.selectedIssueLaws,
      action: 'document_update'
    }
    let data = await updatePermitApi(obj)
    return data
  },
  async setMahaStatusFromDashBoard ({ state }, regNo) {
    let obj = {
      prev_reg_no: regNo,
      maha_inspection_status: 'un-verified'
    }
    await updateMahaStatusApi(obj)
  },
  actionGetPermitConditionsIssue ({ commit }) {
    let data = getPermitsConditionsFromApi()
    commit(types.SET_ISSUE_DROPDOWN_PERMIT_CONDITION_VALUES, data)
    return data
  },
  resetIssuePermit ({ commit }) {
    commit('resetIssuePermitState')
  },
  setArrayToSelectedRowData ({ state, commit }) {
    const rowData = state.userList.filter(a => a.docUUID === state.issuePermitCheckedRow)
    commit(types.SET_ARRAY_TO_SELECTED_ROW_DATA, rowData)
  },
  actionShowIssueSuspendPermitModal ({ state, commit }) {
    commit(types.SHOW_HIDE_ISSUE_SUSPEND_PERMIT, true)
  },
  actionHideIssueSuspendPermitModal ({ state, commit }) {
    commit(types.SHOW_HIDE_ISSUE_SUSPEND_PERMIT, false)
    commit(types.SET_SUSPEND_PERMIT_COMMENT, null)
  },
  actionShowIssueRenewPermitModal ({ state, commit }) {
    commit(types.SHOW_HIDE_ISSUE_RENEW_PERMIT, true)
  },
  actionHideIssueRenewPermitModal ({ state, commit }) {
    commit(types.SHOW_HIDE_ISSUE_RENEW_PERMIT, false)
    commit(types.SET_SUSPEND_PERMIT_COMMENT, null)
  },
  actionSetStep3ButtonArray ({ state }) {
    if (state.step === 3) {
      let buttonArray = []
      switch (state.permitStatus) {
        case 'New':
          buttonArray.push({ btnFunc: 'activate', btnText: 'Approve', btnClass: 'md-success' })
          buttonArray.push({ btnFunc: 'suspend', btnText: 'Decline', btnClass: 'md-danger' })
          break
        case 'Approved':
          buttonArray.push({ btnFunc: 'activate', btnText: 'Activate', btnClass: 'md-success' })
          buttonArray.push({ btnFunc: 'suspend', btnText: 'Decline', btnClass: 'md-danger' })
          break
        case 'Active':
          buttonArray.push({ btnFunc: 'suspend', btnText: 'Suspend', btnClass: 'md-danger' })
          break
        case 'Suspended':
          buttonArray.push({ btnFunc: 'suspend', btnText: 'Revoke', btnClass: 'md-danger' })
          buttonArray.push({ btnFunc: 'activate', btnText: 'Activate', btnClass: 'md-success' })
          break
        case 'Revoked':
          buttonArray.push({ btnFunc: 'activate', btnText: 'Reactivate', btnClass: 'md-success' })
          break
        default:
          break
      }
      state.step3ButtonArray = buttonArray
    }
  }
}

const mutations = {
  [types.UPDATE_STEP_VALUE] (state, isIncrement) {
    if (isIncrement) {
      state.step++
    } else {
      state.step--
    }
  },
  [types.RESET_STEP_VALUE] (state) {
    state.step = 1
  },
  [types.GET_ISSUE_PERMIT_USERS] (state, newUserList) {
    state.userList = newUserList
    state.issueLoading = false
  },
  [types.SET_ARRAY_TO_SELECTED_ROW_DATA] (state, rowData) {
    state.selectedSearchData = rowData
    state.selectedIssueConditions = IsArrayEmptyOrSort(rowData[0].conditions)
    state.selectedIssueLaws = rowData[0].laws
    state.originalSelectedIssueLaws = rowData[0].laws
    state.originalSelectedIssueConditions = state.selectedIssueConditions
    state.selectedDocUUID = rowData[0].docUUID
    state.permitStatus = rowData[0].status
  },
  [types.SET_SUSPEND_PERMIT_COMMENT] (state, value) {
    state.suspendPermitComment = value
  },
  [types.SHOW_HIDE_ISSUE_SUSPEND_PERMIT] (state, value) {
    state.showIssueSuspendPermitModal = value
  },
  [types.SHOW_HIDE_ISSUE_RENEW_PERMIT] (state, value) {
    state.showIssueRenewPermitModal = value
  },
  [types.SET_ISSUE_PERMIT_CONDITIONS] (state, value) {
    state.selectedIssueConditions = value
  },
  [types.RESET_ISSUE_PERMIT_CONDITIONS] (state) {
    state.selectedIssueConditions = state.originalSelectedIssueConditions
  },
  [types.RESET_ISSUE_PERMIT_LAWS] (state) {
    state.selectedIssueLaws = state.originalSelectedIssueLaws
  },
  [types.SET_ISSUE_DROPDOWN_PERMIT_CONDITION_VALUES] (state, value) {
    state.dropDownPermitConditions = value
  },
  resetIssuePermitState (state) {
    Object.assign(state, getDefaultState())
  },
  setIssueDataLoadingOn (state) {
    state.issueLoading = true
  },
  updateIssuePermitField
}

const getters = {
  getStep (state) {
    return state.step
  },
  // getStatus (state) {
  //   return state.permitStatus
  // },
  getIsSearchNull (state) {
    return (state.search.ref || state.search.permitNo || state.search.lastName || state.search.firstName || state.search.companyName || state.search.postCode || state.search.vehicleRegistration)
  },
  getIsPermitListEmpty (state) {
    return state.userList.length > 0
  },
  getSearchCheckedId (state) {
    return state.issuePermitCheckedRow
  },
  getIsIssueDataLoading (state) {
    return state.issueLoading
  },
  getShowIssueRenewPermitModal (state) {
    return state.showIssueRenewPermitModal
  },
  getShowIssueSuspendPermitModal (state) {
    return state.showIssueSuspendPermitModal
  },
  getPermitConditionDropDownValues (state) {
    return state.dropDownPermitConditions
  },
  getIssuePermitField
}

function IsArrayEmptyOrSort (array) {
  if (array === undefined) {
    let newArray = []
    return newArray
  }

  return array.sort(sortConditions)
}

function sortConditions (a, b) {
  return (a.tag < b.tag) ? -1 : (a.condition_code > b.condition_code) ? 1 : 0
}

export default {
  state,
  mutations,
  actions,
  getters
}
