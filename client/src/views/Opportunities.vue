<script setup>
import { ref, onMounted } from 'vue'
import api from '@/Api'
import MapIcon from '@/components/icons/MapIcon.vue'

const opportunities = ref([])
const loading = ref(true)
const errorMessage = ref(null)

const truncateDate = (date) => {
  const res = new Date(date)
  return res.toLocaleDateString('en-CA')
}

const matchOrganizationName = async (orgId) => {
  try {
    const organization = await api.getOrganizationById(orgId)
    return organization.name
  } catch (error) {
    console.error('Error fetching organization name:', error)
    return null
  }
}

const addOrgNameToOpportunities = async (opportunities) => {
  return await Promise.all(
    opportunities.map(async (opportunity) => {
      const organizationName = await matchOrganizationName(opportunity.organizationId)
      return {
        ...opportunity, // spread the properties of an opportunity into a new object
        organizationName: organizationName || 'Unknown Organization' // add organizationName field to a new object
      }
    })
  )
}

const fetchOpportunities = async () => {
  try {
    const fetchedOpportunities = await api.getUpcomingOpportunities()

    opportunities.value = await addOrgNameToOpportunities(fetchedOpportunities)
  } catch (error) {
    errorMessage.value = 'Failed to load organizations. Please try again later.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchOpportunities()
})
</script>

<template>
  <div class="container my-5">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
      <div class="text-start">
        <h1 class="h2 fw-bold">Volunteer Opportunities</h1>
        <p class="text-body-secondary">
          Find the perfect volunteering opportunity that matches your interests and availability
        </p>
      </div>
    </div>

    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-dark" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

    <div v-if="!loading && !errorMessage" class="row">
      <div v-if="!opportunities.length" class="alert">
        Ops!! No Opportunities to display
      </div>
      <div v-for="opportunity in opportunities" :key="opportunity.id" class="col-sm-6 col-lg-4 col-xxl-3 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-name fs-4 fw-semibold">{{ opportunity.title }}</h5>
            <p class="card-text text-secondary">{{ opportunity.description }}</p>
            <p class="text-body-secondary">
              <MapIcon /> {{ truncateDate(opportunity.date) }}
            </p>
            <p class="text-body-secondary">
              <MapIcon /> {{ opportunity.address }}
            </p>
            <p class="text-body-secondary">
              <MapIcon /> {{ opportunity.organizationName }}
            </p>
            <a href="#" class="btn border-secondary-subtle w-100">Read more</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
