<script setup>
import { ref, onMounted } from 'vue'
import api from '@/Api'

const opportunities = ref([])
const loading = ref(true)
const error = ref(null)

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString(undefined, options)
}

const fetchOpportunities = async () => {
  try {
    const data = await api.getUpcomingOpportunities()
    opportunities.value = data
  } catch (err) {
    error.value = 'Failed to load opportunities'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// fetch data when the component is loaded
onMounted(fetchOpportunities)
</script>

<template>
  <div class="card upcoming-events">
    <div class="card-body">
      <h5 class="card-title">Upcoming Events</h5>
      <p class="card-text">Check out our featured volunteer opportunities.</p>

      <div v-if="loading" class="loading">Loading opportunities...</div>
      <div v-if="error" class="error">{{ error }}</div>

      <div v-for="opportunity in opportunities.slice(0, 5)" :key="opportunity.id" class="event-item">
        <h6 class="event-title">{{ opportunity.title }}</h6>
        <p class="event-details">{{ formatDate(opportunity.date) }} | {{ opportunity.address }}</p>
        <button class="btn btn-light">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
