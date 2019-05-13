import { createHelpers } from 'vuex-map-fields'
import types from '../mutation-types'
// import authentication from '../../Security/Authentication'

const getDefaultState = () => {
  return {
    loggedInUser: [],
    loggedInUserGroups: []
  }
}

const { getUserField, updateUserField } = createHelpers({
  getterType: 'getUserField',
  mutationType: 'updateUserField'
})

const state = getDefaultState()

const actions = {
  getUserDetails () {
    // authentication.getUserADDetails(false, 'setUserDetails')
    // authentication.getUserADDetails(true, 'setUserGroups')
  },
  setUserDetails ({ commit }, { user }) {
    commit(types.SET_USER, user)
  },
  setUserGroups ({ commit }, { groups }) {
    commit(types.SET_USER_GROUPS, groups)
  },
  resetSystemConfiguration ({ commit }) {
    commit('resetUserState')
  }
}

const mutations = {
  [types.SET_USER] (state, userDetails) {
    state.loggedInUser = userDetails
  },
  [types.SET_USER_GROUPS] (state, userGroups) {
    state.loggedInUserGroups = userGroups
  },
  resetUserState (state) {
    Object.assign(state, getDefaultState())
  },
  updateUserField
}

const getters = {
  getUserField
}

export default {
  state,
  actions,
  mutations,
  getters
}
