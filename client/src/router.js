import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/register', component: Register }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
