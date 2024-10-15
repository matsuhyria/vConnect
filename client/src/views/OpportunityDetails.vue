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
const volunteersSignedUp = ref({})

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
    await api.createRegistration(route.params.id)
  } catch (error) {
    console.error('Failed to sign up', error)
  }
}

const getRegistrationsForOpportunity = async () => {
  try {
    const registrations = await api.getRegistrationsPerOpportunity(route.params.id)
    volunteersSignedUp.value = registrations.data.length
  } catch (error) {
    console.error('Failed retrieving registrations')
  }
}

// Fetch data on component mount
onMounted(() => {
  fetchOpportunityData()
  getRegistrationsForOpportunity()
})
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-between">
      <div class="col-xxl-8 col-md-7 mb-5 py-4">
        <h1 class="h2 fw-bold">{{ opportunity.title }}</h1>
        <p class="text-body-secondary">{{ organization.name }}</p>
        <ul class="text-body-secondary list-inline">
          <li class="list-inline-item pe-5"><CalendarIcon class="me-1"/>{{ truncateDate(opportunity.date)}}</li>
          <li class="list-inline-item"><MapIcon />{{ opportunity.address }}</li>
        </ul>

        <div class="my-5">
          <h5 class="fw-bold">Description</h5>
          <p>{{ opportunity.description }}</p>
        </div>

        <div class="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
          <p class="m-0">
            <LockIcon />
            {{ volunteersSignedUp }} volunteers already signed up
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
