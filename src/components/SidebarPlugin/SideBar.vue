<template>
  <div class="sidebar" :data-color="activeColor" :style="sidebarStyle">
    <div class="logo">
      <div style="margin-left: 2em;">
        <a href="." class="simple-text logo-normal">
          {{title}}
        </a>
        <div v-if="loggedInUser !== undefined" style="color: #FFFFFF;">{{loggedInUser.name}}</div>
      </div>
    </div>
    <div class="sidebar-wrapper">
      <slot name="content"></slot>
      <md-list class="nav">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <slot>
          <sidebar-link
            v-for="(link,index) in sidebarLinks"
            :key="link.name + index"
            :to="link.path"
            :link="link">
          </sidebar-link>
        </slot>
      </md-list>
    </div>
  </div>
</template>
<script>
import { createHelpers } from 'vuex-map-fields'

import SidebarLink from './SidebarLink.vue'
import MobileMenu from '@/pages/Layout/MobileMenu.vue'

const { mapFields } = createHelpers({
  getterType: 'getUserField',
  mutationType: 'updateUserField'
})

export default{
  components: {
    SidebarLink,
    MobileMenu
  },
  props: {
    title: {
      type: String,
      default: 'DVS Internal'
    },
    imgLogo: {
      type: String,
      default: require('@/assets/img/vue-logo.png')
    },
    activeColor: {
      type: String,
      default: 'green',
      validator: (value) => {
        let acceptedValues = ['', 'purple', 'blue', 'green', 'orange', 'red']
        return acceptedValues.indexOf(value) !== -1
      }
    },
    sidebarLinks: {
      type: Array,
      default: () => []
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  provide () {
    return {
      autoClose: this.autoClose
    }
  },
  computed: {
    ...mapFields([
      'loggedInUser'
    ]),
    sidebarStyle () {
      return {
      }
    }
  }
}
</script>
<style>
  @media screen and (min-width: 991px) {
    .nav-mobile-menu{
      display: none;
    }
  }
</style>
