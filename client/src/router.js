import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Organizations from '@/views/Organizations.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/register', component: Register },
  { path: '/login', name: 'login', component: Login },
  { path: '/organizations', component: Organizations }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
