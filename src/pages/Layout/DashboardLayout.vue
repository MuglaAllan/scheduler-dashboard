<template>
  <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}">
    <notifications></notifications>

    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/Permits">
        <md-icon>content_paste</md-icon>
        <p>Permits</p>
      </sidebar-link>
      <sidebar-link to="/vrs">
        <md-icon>directions_car</md-icon>
        <p>Vehicles</p>
      </sidebar-link>
      <sidebar-link to="/registrationNo">
        <md-icon>aspect_ratio</md-icon>
        <p>Registration Numbers</p>
      </sidebar-link>
      <sidebar-link to="/scheduler">
        <md-icon>schedule</md-icon>
        <p>Scheduler</p>
      </sidebar-link>
      <sidebar-link to="/owner">
        <md-icon>supervisor_account</md-icon>
        <p>Owners</p>
      </sidebar-link>
      <sidebar-link to="/SystemConfiguration">
        <md-icon>settings</md-icon>
        <p>System Configuration</p>
      </sidebar-link>
      <sidebar-link to="/">
        <md-icon>logout</md-icon>
        <p v-on:click="logout()">Log out</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content>

      </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
// import authentication from '../../Security/Authentication'
import { AuthenticationContext } from 'vue-adal'
import TopNavbar from './TopNavbar.vue'
import ContentFooter from './ContentFooter.vue'
import DashboardContent from './Content.vue'
import MobileMenu from '@/pages/Layout/MobileMenu.vue'

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  },
  methods: {
    logout: function () {
      return AuthenticationContext.logout()
    }
  }
}
</script>
