import DashboardLayout from '@/pages/Layout/DashboardLayout.vue'

import Dashboard from '@/pages/Dashboard.vue'
import Parish from '@/pages/Parish.vue'
import Permits from '@/pages/Permits.vue'
import Vrs from '@/pages/Vrs.vue'
import VrsPartial from '@/pages/VrsPartial.vue'
import RegistrationNo from '@/pages/RegistrationNo.vue'
import Scheduler from '@/pages/Scheduler.vue'
import Owner from '@/pages/Owner.vue'
import SystemConfiguration from '@/pages/SystemConfiguration.vue'

import UserProfile from '@/pages/UserProfile.vue'
import Typography from '@/pages/Typography.vue'
import Icons from '@/pages/Icons.vue'
import Maps from '@/pages/Maps.vue'
import Notifications from '@/pages/Notifications.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'parish',
        name: 'Parish',
        component: Parish
      },
      {
        path: 'permits',
        name: 'Permits',
        component: Permits
      },
      {
        path: 'vrs',
        name: 'Vehicle Registration',
        component: Vrs
      },
      {
        path: 'vrsPartial',
        name: 'Vehicle Registration - Complete Registration',
        component: VrsPartial
      },
      {
        path: 'registrationNo',
        name: 'Registration Numbers',
        component: RegistrationNo
      },
      {
        path: 'scheduler',
        name: 'Scheduler',
        component: Scheduler
      },
      {
        path: 'owner',
        name: 'Owners',
        component: Owner
      },
      {
        path: 'systemConfiguration',
        name: 'System Configuration',
        component: SystemConfiguration
      },
      {
        path: 'user',
        name: 'User Profile',
        component: UserProfile
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'Maps',
        meta: {
          hideFooter: true
        },
        component: Maps

      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      }
    ]
  }
]

export default routes
