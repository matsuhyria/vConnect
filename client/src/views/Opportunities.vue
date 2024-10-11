<script setup>
import { ref, onMounted } from 'vue'
import api from '@/Api'
import OpportunityCard from '@/components/OpportunityCard.vue'

const opportunities = ref([])
const loading = ref(true)
const errorMessage = ref(null)

const matchOrganizationName = async (orgId) => {
  try {
    const organization = await api.getOrganization(orgId)
    return organization.name
  } catch (error) {
    console.error('Error fetching organization name:', error)
    return null
  }
}

const addOrgNameToOpportunities = async (opportunities) => {
  return await Promise.all(
    opportunities.map(async (opportunity) => {
      const organizationName = await matchOrganizationName(
        opportunity.organizationId
      )
      return {
        ...opportunity, // spread the properties of an opportunity into a new object
        organizationName // add organizationName field to a new object
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
    <div
      class="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4"
    >
      <div class="text-start">
        <h1 class="h2 fw-bold">Volunteer Opportunities</h1>
        <p class="text-body-secondary">
          Find the perfect volunteering opportunity that matches your interests
          and availability
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
      <div
        v-for="opportunity in opportunities"
        :key="opportunity.id"
        class="col-sm-6 col-lg-4 col-xxl-3 mb-4"
      >
        <OpportunityCard
          :title="opportunity.title"
          :description="opportunity.description"
          :id="opportunity._id"
          :address="opportunity.address"
          :date="opportunity.date"
          :organization="opportunity.organizationName"
        />
      </div>
    </div>
  </div>
</template>
