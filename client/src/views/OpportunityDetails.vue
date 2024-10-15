<script setup>
import api from '@/Api'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { truncateDate } from '@/utils/utils.js'
import Sidebar from '@/components/Sidebar.vue'
import LockIcon from '@/components/icons/LockIcon.vue'
import MapIcon from '@/components/icons/MapIcon.vue'
import CalendarIcon from '@/components/icons/CalendarIcon.vue'

const route = useRoute()
const opportunity = ref({})
const organization = ref({})

// Fetch opportunity data from API
const fetchOpportunityData = async () => {
  const opportunityId = route.params.id
  try {
    const response = await api.getOpportunity(opportunityId)
    opportunity.value = response.data
    const orgResponse = await api.getOrganization(
      opportunity.value.organizationId
    )

    organization.value = orgResponse.data
  } catch (error) {
    console.error('Failed to fetch opportunity data', error)
  }
}

// Sign up for the opportunity
const signUpForOpportunity = async () => {
  try {
    await api.signUpForOpportunity(opportunity.value._id)
    alert('Successfully signed up for the opportunity!')
  } catch (error) {
    console.error('Failed to sign up', error)
  }
}

// Fetch data on component mount
onMounted(() => {
  fetchOpportunityData()
})
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-between">
      <div class="col-xxl-8 col-md-7 mb-5 py-4">
        <h1 class="h2 fw-bold">{{ opportunity.title }}</h1>
        <p class="text-body-secondary">{{ organization.name }}</p>
        <ul class="text-body-secondary list-inline">
          <li class="list-inline-item pe-5"><CalendarIcon />{{ truncateDate(opportunity.date)}}</li>
          <li class="list-inline-item"><MapIcon />{{ opportunity.address }}</li>
        </ul>

        <div class="mb-4">
          <h4>Description</h4>
          <p>{{ opportunity.description }}</p>
        </div>

        <div class="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
          <p class="m-0">
            <LockIcon />
            40 volunteers already signed up
          </p>

          <button class="btn btn-dark" @click="signUpForOpportunity">
            Sign Up to Volunteer
          </button>
        </div>
      </div>
      <Sidebar class="col-lg-4 col-md-5" />
    </div>
  </div>
</template>
