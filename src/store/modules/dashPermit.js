import types from '../mutation-types'
import { createHelpers } from 'vuex-map-fields'

import {
  getPermitsInQueueFromApi,
  getPermitsSuspendedFromApi,
  getPermitByDocUUIDFromApi,
  getPermitsConditionsFromApi,
  updatePermitApi,
  getMahaStatusRecordsFromApi,
  getMahaStatusByDocUUIDFromApi,
  updateMahaStatusApi
} from '../../api/permitApi'

import {
  getVrsListFromApi
} from '../../api/vrsApi'

const getDefaultState = () => {
  return {
    permitsInQueue: [],
    permitsSuspended: [],
    vrsApplications: [],
    vrsInFlightApplications: [],
    mahaStatusRecords: [],
    selectedDashRowData: [],
    selectedMahaStatusRowData: [],
    acceptPermitConditions: [],
    permitConditionsArray: [],
    parishDataArray: [],
    showStuckInFlight: false,
    isPermitTemporary: false,
    selectedRowDocUUID: null,
    showDashModal: false,
    showDeclineModal: false,
    showAcceptModal: false,
    showReactivateModal: false,
    showParishAcceptDeclineModal: false,
    showMahaStatusModal: false,
    isBackgroundVisible: true,
    declineComment: null,
    permitTempRoute: null,
    permitLaws: null,
    isSuspend: null,
    selectedMahaStatusID: null,
    selectedParish: null,
    selectedParishDisplay: null,
    selectedParishStatus: null,
    selectedParishComment: null,
    isParish: false
  }
}

const { getDashPermitField, updateDashPermitField } = createHelpers({
  getterType: 'getDashPermitField',
  mutationType: 'updateDashPermitField'
})

const state = getDefaultState()

const actions = {
  async actionPermitsInQueue ({ commit }) {
    const res = await getPermitsInQueueFromApi()
    commit(types.SET_PERMITS_IN_QUEUE, res)
    return res
  },
  async actionPermitsSuspended ({ commit }) {
    const res = await getPermitsSuspendedFromApi()
    commit(types.SET_PERMITS_SUSPENDED, res)
    return res
  },
  async actionVrsApplications ({ commit }) {
    const res = await getVrsListFromApi({ status: '"new", "approved", "paymentconfirm", "passinspection"' }, true, false)
    commit(types.SET_VRS_APPLICATIONS, res)
    return res
  },
  async actionVrsInFlightApplications ({ state, commit }) {
    let status = state.showStuckInFlight ? { status: '"inflighttransfer", "new"' } : { status: '"inflighttransfer"' }
    const res = await getVrsListFromApi(status, true, false)
    commit(types.SET_VRS_IN_FLIGHT_APPLICATIONS, res)
    return res
  },
  async getPermitForSelectedDashRow ({ state, commit }) {
    const data = await getPermitByDocUUIDFromApi(state.selectedRowDocUUID)
    for (let item in data) {
      let ts = data[item].timestamp
      data[item].timestamp = new Date(ts).toLocaleDateString('en-GB')
    }
    commit(types.SET_DASH_MODAL_ROWDATA, data)
    return data
  },
  async actionMahaStatusRecords ({ commit }) {
    const res = await getMahaStatusRecordsFromApi()
    commit(types.SET_MAHA_STATUS_RECORDS, res)
  },
  async getMahaStatusRecordById ({ state, commit }) {
    const data = await getMahaStatusByDocUUIDFromApi(state.selectedMahaStatusID)
    for (let item in data) {
      let ts = data[item].timestamp
      data[item].timestamp = new Date(ts).toLocaleDateString('en-GB')
    }
    commit(types.SET_MAHA_STATUS_MODAL_ROWDATA, data)
  },
  async setMahaStatus ({ commit }, { obj }) {
    await updateMahaStatusApi(obj)
  },
  async setIssuePermitApproveDecline ({ state, commit, dispatch }, { isApproved, status }) {
    let comment
    if (isApproved) {
      comment = null
    } else {
      comment = state.declineComment
    }
    let obj = {
      docUUID: state.selectedRowDocUUID,
      status: status, // isApproved ? (state.isSuspend ? 'Active' : 'Approved') : (state.isSuspend ? 'Revoked' : 'Declined'),
      comment: comment,
      conditions: state.acceptPermitConditions.length === 0 ? null : state.acceptPermitConditions,
      laws: state.permitLaws,
      permitted_route: state.permitTempRoute,
      email: state.selectedDashRowData[0].email,
      firstnames: state.selectedDashRowData[0].firstnames,
      surname: state.selectedDashRowData[0].surname,
      action: 'status_update'
    }
    let data = await updatePermitApi(obj)
    if (data) {
      dispatch('actionHideDashModal')
    }
    return data
  },
  async setParishData ({ state }) {
    let obj = {
      docUUID: state.selectedRowDocUUID,
      parishes: state.selectedDashRowData[0].parishes,
      action: 'document_update'
    }
    let data = await updatePermitApi(obj)
    return data
  },
  actionGetPermitConditions ({ commit }) {
    const res = getPermitsConditionsFromApi()
    commit(types.SET_PERMIT_CONDITIONS_ARRAY, res)
    return res
  },
  actionShowDashModal: ({ state, commit, dispatch }, { docUUID, isSuspendValue }) => {
    if (state.showDashModal === true) {
      dispatch('actionHideDashModal')
    }
    commit(types.SET_DASH_MODAL_ROWID, docUUID)
    dispatch('getPermitForSelectedDashRow')
    commit(types.SHOW_HIDE_DASH_MODAL, true)
    commit(types.SET_IS_SUSPEND, isSuspendValue)
  },
  actionHideDashModal: function ({ commit, dispatch }) {
    dispatch('actionPermitsInQueue')
    dispatch('actionPermitsSuspended')
    dispatch('actionMahaStatusRecords')
    dispatch('actionHideAcceptModal')
    dispatch('actionHideDeclineModal')
    commit(types.SET_DASH_MODAL_ROWDATA, null)
    commit(types.SET_MAHA_STATUS_MODAL_ROWDATA, null)
    commit(types.SET_DASH_MODAL_ROWID, null)
    commit(types.SET_MAHA_STATUS_ID, null)
    commit(types.SHOW_HIDE_DASH_MODAL, false)
    commit(types.SHOW_HIDE_ACCEPT_MODAL, false)
    commit(types.SHOW_HIDE_DECLINE_MODAL, false)
    commit(types.SHOW_HIDE_REACTIVATE_MODAL, false)
    commit(types.SHOW_HIDE_MAHA_STATUS_MODAL, false)
    commit(types.SET_PERMIT_CONDITIONS_ARRAY, [])
    commit(types.UPDATE_ACCEPT_PERMIT_CONDITIONS, [])
    commit(types.SET_IS_SUSPEND, null)
    commit(types.SET_PERMIT_TEMP_ROUTE, null)
    commit(types.SET_PERMIT_LAWS, null)
    commit(types.SHOW_HIDE_PARISH_ACCEPT_DECLINE_MODAL, false)
    commit(types.SET_SELECTED_PARISH, null)
  },
  actionShowAcceptModal: ({ commit }) => {
    commit(types.SHOW_HIDE_ACCEPT_MODAL, true)
  },
  actionShowDeclineModal: ({ commit }) => {
    commit(types.SHOW_HIDE_DECLINE_MODAL, true)
  },
  actionShowReactivateModal: ({ commit }) => {
    commit(types.SHOW_HIDE_REACTIVATE_MODAL, true)
  },
  actionShowParishAcceptDeclineModal: ({ commit }) => {
    commit(types.SHOW_HIDE_PARISH_ACCEPT_DECLINE_MODAL, true)
  },
  actionHideAcceptModal: ({ commit }) => {
    commit(types.UPDATE_ACCEPT_PERMIT_CONDITIONS, [])
    commit(types.SHOW_HIDE_ACCEPT_MODAL, false)
    commit(types.SET_PERMIT_TEMP_ROUTE, null)
    commit(types.SET_PERMIT_LAWS, null)
  },
  actionHideDeclineModal: ({ commit }) => {
    commit(types.UPDATE_DECLINE_COMMENT, null)
    commit(types.SHOW_HIDE_DECLINE_MODAL, false)
  },
  actionHideReactivateModal: ({ commit }) => {
    commit(types.UPDATE_DECLINE_COMMENT, null)
    commit(types.SHOW_HIDE_REACTIVATE_MODAL, false)
  },
  actionHideParishAcceptDeclineModal: ({ commit }) => {
    commit(types.SHOW_HIDE_PARISH_ACCEPT_DECLINE_MODAL, false)
  },
  actionSetIsParish: ({ commit }, value) => {
    commit(types.SET_IS_PARISH_PARAM, value)
  },
  resetDashPermit ({ commit }) {
    commit('resetDashPermitState')
  }
}

const mutations = {
  [types.SET_PERMITS_IN_QUEUE] (state, newPermitsInQueue) {
    state.permitsInQueue = newPermitsInQueue
  },
  [types.SET_PERMITS_SUSPENDED] (state, newPermitsSuspended) {
    state.permitsSuspended = newPermitsSuspended
  },
  [types.SET_VRS_APPLICATIONS] (state, vrsData) {
    state.vrsApplications = vrsData
  },
  [types.SET_VRS_IN_FLIGHT_APPLICATIONS] (state, inFlightData) {
    state.vrsInFlightApplications = inFlightData
  },
  [types.SET_MAHA_STATUS_RECORDS] (state, mahaStatusRecords) {
    state.mahaStatusRecords = mahaStatusRecords
  },
  [types.SHOW_HIDE_DASH_MODAL] (state, value) {
    state.showDashModal = value
  },
  [types.SHOW_HIDE_MAHA_STATUS_MODAL] (state, value) {
    state.showMahaStatusModal = value
  },
  [types.SET_IS_SUSPEND] (state, value) {
    state.isSuspend = value
  },
  [types.SHOW_HIDE_ACCEPT_MODAL] (state, value) {
    state.showAcceptModal = value
  },
  [types.SHOW_HIDE_DECLINE_MODAL] (state, value) {
    state.showDeclineModal = value
  },
  [types.SHOW_HIDE_REACTIVATE_MODAL] (state, value) {
    state.showReactivateModal = value
  },
  [types.SHOW_HIDE_PARISH_ACCEPT_DECLINE_MODAL] (state, value) {
    state.showParishAcceptDeclineModal = value
  },
  [types.SET_DASH_MODAL_ROWID] (state, docUUID) {
    state.selectedRowDocUUID = docUUID
  },
  [types.SET_MAHA_STATUS_ID] (state, mahaStatusId) {
    state.selectedMahaStatusID = mahaStatusId
  },
  [types.SET_DASH_MODAL_ROWDATA] (state, data) {
    state.selectedDashRowData = data
    state.parishDataArray = data !== null ? data[0].parishes : null
    state.isPermitTemporary = data !== null ? data[0].permit_period === 'Temporary' : false
  },
  [types.SET_MAHA_STATUS_MODAL_ROWDATA] (state, data) {
    state.selectedMahaStatusRowData = data
  },
  [types.UPDATE_DECLINE_COMMENT] (state, value) {
    state.declineComment = value
  },
  [types.UPDATE_ACCEPT_PERMIT_CONDITIONS] (state, value) {
    state.acceptPermitConditions = value
  },
  [types.SET_PERMIT_CONDITIONS_ARRAY] (state, value) {
    state.permitConditionsArray = value
  },
  [types.SET_PERMIT_TEMP_ROUTE] (state, value) {
    state.permitTempRoute = value
  },
  [types.SET_PERMIT_LAWS] (state, value) {
    state.permitLaws = value
  },
  [types.SET_SELECTED_PARISH] (state, value) {
    state.selectedParish = value
  },
  [types.SET_IS_PARISH_PARAM] (state, value) {
    state.isParish = value
  },
  resetDashPermitState (state) {
    Object.assign(state, getDefaultState())
  },
  updateDashPermitField
}

const getters = {
  getDashPermitField
}

export default {
  state,
  actions,
  mutations,
  getters
}
