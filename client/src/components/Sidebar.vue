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
    opportunities.value = await api.getUpcomingOpportunities()
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
      <h5 class="fw-bold">Upcoming Events</h5>
      <p class="mb-4">Check out our featured volunteer opportunities</p>

      <div v-if="loading" class="loading">Loading opportunities...</div>
      <div v-if="error" class="error">{{ error }}</div>

      <div v-for="opportunity in opportunities.slice(0, 5)" :key="opportunity.id" class="event-item mb-4">
        <h6 class="fw-bold">{{ opportunity.title }}</h6>
        <p class="event-details">{{ formatDate(opportunity.date) }} | {{ opportunity.address }}</p>
        <button class="btn btn-light border">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  max-width: 400px;
  text-align: left;
}

.btn {
  width: 70%;
}
</style>
