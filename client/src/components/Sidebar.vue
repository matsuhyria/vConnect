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
  <aside>
    <div v-if="opportunities && opportunities.length" class="card">
      <div class="card-body py-5 px-5">
        <h5 class="fw-bold fs-4">Upcoming Events</h5>
        <p>Check out our featured volunteer opportunities</p>

        <div v-if="loading" class="loading">Loading opportunities...</div>
        <div v-if="error" class="error">{{ error }}</div>

        <div id="upcoming-events">
          <div
            v-for="opportunity in opportunities.slice(0, 3)"
            :key="opportunity._id"
            class="event-item mb-4"
          >
            <h6 class="fw-bold">{{ opportunity.title }}</h6>
            <p class="event-details">
              {{ formatDate(opportunity.date) }} | {{ opportunity.address }}
            </p>
            <router-link
              :to="`/opportunities/${opportunity._id}`"
              class="btn border-secondary-subtle w-50 btn-light"
              >Sign Up</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div v-else class="card empty-card">
      <div class="card-body py-5 px-5">
        <h5 class="fw-bold">No Upcoming Events</h5>
        <p>Check back later for volunteer opportunities</p>
      </div>
    </div>
  </aside>
</template>

<style scoped>
#upcoming-events {
  margin-top: 2rem;
}
.event-details {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
