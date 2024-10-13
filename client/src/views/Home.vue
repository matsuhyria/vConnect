<script setup>
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div class="container mt-5 pt-lg-5">
    <div class="row justify-content-between">
      <div class="col-xxl-5 col-md-6 mb-5 py-4">
        <h1 class="fw-bold">Discover Volunteer Opportunities</h1>
        <p class="text-body-secondary my-4 fs-5">
          Browse our featured volunteer events and sign up to make a difference
          in your community!
        </p>
        <div class="gap-2 d-flex flex-wrap">
          <router-link to="/opportunities" class="btn btn-dark me-3"
            >Explore Opportunities</router-link
          >
          <router-link to="/organizations" class="btn btn-light border border-black"
            >View Organizations</router-link
          >
        </div>
      </div>
      <Sidebar class="col-lg-4 col-md-5" />
    </div>
  </div>
</template>

<style scoped>
</style>
