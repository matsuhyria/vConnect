<script setup>
import state from '@/state'
import { computed } from 'vue'

const username = computed(() => state?.user?.name)
</script>

<template>
  <header class="navbar bg-black">
    <nav class="container-fluid d-flex justify-content-between p-0 px-sm-2">
      <div>
        <a href="/" class="navbar-brand text-white">
          <img :src="`./logo-w.svg`" alt="Logo" width="40" />
        </a>
      </div>
      <ul class="nav me-auto">
        <li class="nav-item">
          <router-link
            to="/opportunities"
            class="nav-link text-white px-1 px-md-3"
            >Opportunities</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            to="/organizations"
            class="nav-link text-white px-1 px-md-3"
            >Organizations</router-link
          >
        </li>
      </ul>

      <div class="nav-item d-flex">
        <router-link
          to="/profile"
          class="nav-link text-white p-1 fw-bold text-capitalize"
          v-if="username"
        >
          Hi, {{ username }}</router-link
        >
        <router-link to="/login" class="nav-link text-white p-1 fw-bold" v-else
          >Login</router-link
        >
      </div>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  padding: 1rem;
}
</style>
