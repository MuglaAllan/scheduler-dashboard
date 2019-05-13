import 'babel-core/register'
import 'babel-polyfill'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'

// Buefy
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

// Vue Dialog
import VueJsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'

// App setup
import App from './App'

// store setup
import store from './store'

// router setup
import routes from './routes/routes'

// Plugins
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import Notifications from './components/NotificationPlugin'

// MaterialDashboard plugin
import MaterialDashboard from './material-dashboard'

import Chartist from 'chartist'
import LightTimeline from 'vue-light-timeline'

// ADAL Auth
import Adal, { AuthenticationContext } from 'vue-adal'

// AD Groups
// import { getUserAdGroups } from './Security/Authentication'

// Idle Timer
import IdleVue from 'idle-vue'

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: 'nav-item active',
  mode: 'history'
})

Vue.use(VueRouter)
Vue.use(Buefy)
Vue.use(MaterialDashboard)
Vue.use(GlobalComponents)
Vue.use(GlobalDirectives)
Vue.use(Notifications)
Vue.use(LightTimeline)

Vue.use(VueJsDialog, {
  html: true,
  okText: 'Extend Session',
  cancelText: 'Cancel',
  animation: 'bounce'
})

Vue.use(Adal, {
  config: {
    tenant: 'govje.onmicrosoft.com',
    clientId: 'f3088b8c-dd36-4051-8ec1-6e9340b1d9e7',
    // redirectUri: 'https://internal-frontend.dvsuat.uk/',
    redirectUri: 'http://localhost:8080/',
    cacheLocation: 'localStorage'
  },
  requireAuthOnInitialize: true,
  router: router
})

const eventsHub = new Vue()

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  idleTime: 600000 // 10 minutes
})

// global library setup
Object.defineProperty(Vue.prototype, '$Chartist', {
  get () {
    return this.$root.Chartist
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store: store,
  router: router,
  data: {
    Chartist: Chartist
  },
  onIdle () {
    let timeOut = null
    this.$dialog.alert('<div style="font-weight: 800; margin-bottom: 1em;">Session Expire Warning</div><div>Your session will expire in 30 seconds. Do you want to extend your session?</div>')
      .then(function () {
        clearTimeout(timeOut)
      })
    timeOut = setTimeout(logUserOut, 30000)
  },
  async mounted () {
    if (AuthenticationContext.user !== undefined) {
      // let groups = await getUserAdGroups(AuthenticationContext.user.profile.aud)
      // console.log(groups)
      store.dispatch('setUserDetails', { user: AuthenticationContext.user.profile })
    }
  }
})

function logUserOut () {
  store.dispatch('setUserDetails', { user: [] })
  AuthenticationContext.logout()
}
