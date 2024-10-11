<script setup>
import api from '@/Api'
import Sidebar from '@/components/Sidebar.vue'

</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-lg-9">
        <h1 class="fw-bold">Discover Volunteer Opportunities</h1>
        <p>Browse our featured volunteer events and sign up to make a difference in your community!</p>
        <div class="btn-container">
          <router-link to="/opportunities" class="btn btn-dark me-3">Explore Opportunities</router-link>
          <router-link to="/organizations" class="btn btn-light border">View Organizations</router-link>
        </div>
      </div>
      <div class="col-12 col-lg-3 mt-lg-0 mt-4">
        <Sidebar />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 10%;
}
</style>
