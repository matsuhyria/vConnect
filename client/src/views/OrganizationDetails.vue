<script setup>
import { ref, onMounted } from 'vue'
import { isRepresentative } from '@/state'
import api from '@/Api'
import { useRoute } from 'vue-router'
import MapIcon from '@/components/icons/MapIcon.vue'
import EmailIcon from '@/components/icons/EmailIcon.vue'
import OpportunityCard from '@/components/OpportunityCard.vue'

const organization = ref({})
const opportunities = ref([])
const showModal = ref(false) // Track modal visibility
const route = useRoute()

const organizationId = route.params.id

const newOpportunity = ref({
  title: '',
  description: '',
  date: '',
  address: ''
})

// Fetch organization data from API
const fetchOrganizationData = async () => {
  try {
    const response = await api.getOrganization(organizationId)

    organization.value = response.data
  } catch (error) {
    console.error('Failed to fetch organization data', error)
  }
}

// Fetch opportunities data from API
const fetchOpportunities = async () => {
  try {
    const response = await api.getOpportunitiesPerOrganization(organizationId)
    opportunities.value = response.data
  } catch (error) {
    console.error('Failed to fetch opportunities', error)
  }
}

// Fetch data on component mount
onMounted(() => {
  fetchOrganizationData()
  fetchOpportunities()
})

// Function to create a new opportunity
const createOpportunity = async () => {
  try {
    await api.createOpportunity(organization.value._id, newOpportunity.value)
    newOpportunity.value = { title: '', description: '', date: '', address: '' } // Reset form
    showModal.value = false // Close modal
    fetchOpportunities() // Refresh opportunities list
  } catch (error) {
    console.error('Failed to create opportunity', error)
  }
}
</script>

<template>
  <div class="container mt-5">
    <h1 class="h2 fw-bold mb-4">{{ organization.name }}</h1>
    <div class="d-flex flex-column flex-md-row justify-content-sm-between">
      <!-- Organization Details -->
      <div class="col-md-8">
        <p class="mb-4">{{ organization.description }}</p>
      </div>
      <div class="">
        <!-- Contact Info -->
        <div class="contact-info mb-4 text-body-secondary">
          <p class="mb-1"><MapIcon class="me-2" />{{ organization.address }}</p>
          <p class="mb-1">
            <EmailIcon class="me-2" />
            <a
              class="text-body-secondary"
              :href="'mailto:' + organization.email"
              >{{ organization.email }}</a
            >
          </p>
        </div>
      </div>
    </div>

    <div class="text-center my-5">
      <!-- Opportunities Section -->
      <h2 class="h4 fw-bold text-body-secondary py-5">Our Opportunities</h2>
      <div v-if="!opportunities.length" class="alert">
        No opportunities available at the moment for {{ organization.name }}.
      </div>

      <div class="row text-start">
        <div
          v-for="opportunity in opportunities"
          :key="opportunity.id"
          class="col-sm-6 col-lg-4 col-xxl-3 mb-4"
        >
          <OpportunityCard
            :title="opportunity.title"
            :description="opportunity.description"
            :address="opportunity.address"
            :id="opportunity._id"
            :date="opportunity.date"
            :organization="organization.name"
          />
        </div>
      </div>
      <!-- Add Opportunity Button -->
      <button
        class="btn btn-dark mt-4 px-4"
        @click="showModal = true"
        v-show="isRepresentative(organization.managed_by)"
      >
        Add Opportunity
      </button>
    </div>
    <!-- Modal for Creating New Opportunity -->
    <div
      v-if="showModal"
      class="modal fade show"
      style="display: block; background: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create New Opportunity</h5>
            <button
              type="button"
              class="btn-close"
              @click="showModal = false"
            ></button>
          </div>
          <div class="modal-body border-bottom-0">
            <form
              @submit.prevent="createOpportunity"
              class="d-flex flex-column"
            >
              <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input
                  type="text"
                  v-model="newOpportunity.title"
                  id="title"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea
                  v-model="newOpportunity.description"
                  id="description"
                  class="form-control"
                  required
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="date" class="form-label">Date</label>
                <input
                  type="datetime-local"
                  v-model="newOpportunity.date"
                  id="date"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">Address</label>
                <input
                  type="text"
                  v-model="newOpportunity.address"
                  id="address"
                  class="form-control"
                  required
                />
              </div>
              <button type="submit" class="btn btn-dark align-self-end mt-3">
                Create Opportunity
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1050;
}

.modal-dialog {
  max-width: 500px;
  margin: 30px auto;
}
</style>
