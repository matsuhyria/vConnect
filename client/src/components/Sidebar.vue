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
    const { data } = await api.getOpportunities()
    opportunities.value = data.data
  } catch (err) {
    error.value = 'Failed to load opportunities'
  } finally {
    loading.value = false
  }
}

// fetch data when the component is loaded
onMounted(fetchOpportunities)
</script>

<template>
  <div class="card">
    <div class="card-body py-4">
      <h5 class="fw-bold">Upcoming Events</h5>
      <p class="mb-4">Check out our featured volunteer opportunities</p>

      <div v-if="loading" class="loading">Loading opportunities...</div>
      <div v-if="error" class="error">{{ error }}</div>

      <div
        v-for="opportunity in opportunities.slice(0, 3)"
        :key="opportunity.id"
        class="event-item mb-4"
      >
        <h6 class="fw-bold">{{ opportunity.title }}</h6>
        <p class="event-details">
          {{ formatDate(opportunity.date) }} | {{ opportunity.address }}
        </p>
        <button class="btn btn-light border">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn {
  width: 70%;
}
</style>
