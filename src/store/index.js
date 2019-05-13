import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import DashboardPermit from './modules/dashPermit'
import IssuePermit from './modules/issuePermit'
import Vrs from './modules/vrs'
import RegistrationNo from './modules/registrationNo'
import Scheduler from './modules/scheduler'
import SystemConfiguration from './modules/systemConfiguration'
import User from './modules/user'
import Owner from './modules/owner'

import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  plugins: [
    createPersistedState()
  ],
  modules: {
    DashboardPermit,
    IssuePermit,
    Vrs,
    RegistrationNo,
    Scheduler,
    SystemConfiguration,
    User,
    Owner
  }
})
