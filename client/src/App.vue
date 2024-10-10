<script setup>
import Navbar from './components/Navbar.vue'
import state from '@/state'

const userData = JSON.parse(localStorage.getItem('userData'))

if (userData) {
  state.user = userData.user
  state.token = userData.token
}
</script>

<template>
  <div>
    <Navbar />
    <!-- Render the content of the current page view -->
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
