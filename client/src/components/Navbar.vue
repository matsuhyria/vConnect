<script setup>
import state from '@/state'
import { computed } from 'vue'

const username = computed(() => state?.user?.name)
</script>

<template>
  <header class="navbar bg-black">
    <nav
      class="container-fluid d-flex justify-content-between flex-nowrap gap-1 py-0 px-sm-4"
    >
      <div class="d-flex align-items-center">
        <a href="/" id="nav-logo" class="navbar-brand">
          <img src="/logo-w.svg" alt="Logo" width="40" />
        </a>
        <ul class="nav flex-nowrap">
          <li class="nav-item">
            <router-link
              to="/opportunities"
              class="nav-link text-white p-0 mx-1 mx-md-3"
              >Opportunities</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/organizations"
              class="nav-link text-white p-0 mx-1 mx-md-3"
              >Organizations</router-link
            >
          </li>
        </ul>
      </div>

      <div class="nav-item text-white fw-bold overflow-hidden text-capitalize">
        <router-link
          to="/profile"
          class="nav-link overflow-hidden trimmed-text"
          v-if="username"
        >
          Hi, {{ username }}</router-link
        >
        <router-link to="/login" class="nav-link overflow-hidden trimmed-text" v-else
          >Login</router-link
        >
      </div>
    </nav>
  </header>
</template>

<style scoped>
nav {
  padding: 1rem;
}

#nav-logo {
  color: white;
}

.trimmed-text {
  white-space: nowrap;
  text-overflow: ellipsis;
}

.router-link-exact-active {
  border-bottom: 1px solid;
}
</style>
