import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Organizations from '@/views/Organizations.vue'
import Opportunities from '@/views/Opportunities.vue'
import OpportunityDetails from '@/views/OpportunityDetails.vue'
import Profile from '@/views/Profile.vue'
import OrganizationDetails from '@/views/OrganizationDetails.vue'
import { isAuthenticated } from './state'

const routes = [
  { path: '/', name: 'home', component: Home },
  {
    path: '/login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        // Redirect to home if the user is already logged in
        next({ path: '/' })
      } else {
        next() // Allow access if no token
      }
    }
  },
  {
    path: '/register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        // Redirect to home if the user is already logged in
        next({ path: '/' })
      } else {
        next() // Allow access if no token
      }
    }
  },
  {
    path: '/profile',
    component: Profile,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        // Redirect to home if the user is not logged in
        next({ path: '/' })
      } else {
        next() // Allow access if logged in
      }
    }
  },
  {
    path: '/organizations',
    component: Organizations
  },
  {
    path: '/organizations/:id',
    component: OrganizationDetails
  },
  {
    path: '/opportunities',
    component: Opportunities
  },
  {
    path: '/opportunities/:id',
    component: OpportunityDetails
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
