import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'
import { isAuthenticated } from './state'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/register', component: Register },
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
