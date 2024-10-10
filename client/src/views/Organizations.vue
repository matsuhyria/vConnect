<script setup>
import { ref, onMounted } from 'vue'
import api from '@/Api'
import MapIcon from '@/components/icons/MapIcon.vue'
import { isRepresentative } from '@/state'

const organizations = ref([])
const loading = ref(true)
const errorMessage = ref(null)
const formErrorMessage = ref(null)
const showModal = ref(false)

const newOrganization = ref({
  name: '',
  description: '',
  email: '',
  address: '',
  phone: '',
  url: ''
})

// Handle form submission for adding a new organization
const addOrganization = async () => {
  try {
    await api.createOrganization(newOrganization.value)
    // Clear the form and close the modal after successful submission
    newOrganization.value = {
      name: '',
      description: '',
      email: '',
      address: '',
      phone: '',
      url: ''
    }
    showModal.value = false
    fetchOrganizations() // Reload organizations after adding a new one
  } catch (error) {
    formErrorMessage.value =
      'Failed to create organization. Please try again later.'
  }
}

// Fetch organizations from API
const fetchOrganizations = async () => {
  try {
    const response = await api.getOrganizations()
    organizations.value = response.data
  } catch (error) {
    errorMessage.value = 'Failed to load organizations. Please try again later.'
  } finally {
    loading.value = false
  }
}

// Fetch organizations on component mount
onMounted(() => {
  fetchOrganizations()
})
</script>

<template>
  <div class="container my-5">
    <div
      class="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4"
    >
      <div class="text-start">
        <h1 class="h2 fw-bold">Organizations</h1>
        <p class="text-body-secondary">
          Discover the ideal organization that fits your goals and passion.
        </p>
      </div>
      <button
        class="btn btn-dark"
        @click="showModal = true"
        v-if="isRepresentative()"
      >
        Add Organization
      </button>
    </div>

    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-dark" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

    <div v-if="!loading && !errorMessage" class="row">
      <div v-if="!organizations.length" class="alert">
        Ops!! No Organizations to display
      </div>
      <div
        v-for="org in organizations"
        :key="org.id"
        class="col-sm-6 col-lg-4 col-xxl-3 mb-4"
      >
        <div class="card">
          <div class="card-body">
            <h5 class="card-name fs-4 fw-semibold">{{ org.name }}</h5>
            <p class="card-text text-secondary">{{ org.description }}</p>
            <p class="text-body-secondary"><MapIcon /> {{ org.address }}</p>
            <a href="#" class="btn border-secondary-subtle w-100">Read more</a>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showModal"
      class="modal fade show"
      style="display: block; background: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header align-items-start border-0">
            <div>
              <h5 class="modal-name fw-bold">Create New Organization</h5>
              <p class="mb-0">Fill in the details for the new organization.</p>
            </div>
            <button
              type="button"
              class="btn-close"
              @click="showModal = false"
            ></button>
          </div>
          <div class="modal-body">
            <div v-if="formErrorMessage" class="alert alert-danger">
              {{ formErrorMessage }}
            </div>
            <form @submit.prevent="addOrganization" class="d-flex flex-column">
              <div class="mb-3">
                <label for="name" class="form-label fw-bold">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="newOrganization.name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label fw-bold"
                  >Description</label
                >
                <textarea
                  class="form-control"
                  id="description"
                  v-model="newOrganization.description"
                  required
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label fw-bold">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="newOrganization.email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="address" class="form-label fw-bold">Address</label>
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  v-model="newOrganization.address"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label fw-bold">Phone</label>
                <input
                  type="text"
                  class="form-control"
                  id="phone"
                  v-model="newOrganization.phone"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="url" class="form-label fw-bold">URL</label>
                <input
                  type="url"
                  class="form-control"
                  id="url"
                  v-model="newOrganization.url"
                />
              </div>
              <button type="submit" class="btn btn-dark my-3 align-self-end">
                Create Organization
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
