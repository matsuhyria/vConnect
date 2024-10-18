<script setup>
import { ref, onMounted } from 'vue'
import api from '@/Api'
import OpportunityCard from '@/components/OpportunityCard.vue'
import { isAdmin } from '@/state'

const opportunities = ref([])
const loading = ref(true)
const errorMessage = ref(null)
const confirmRemoveModal = ref(false)
const selectedDate = ref(null)

const removeAllOpportunities = async () => {
  try {
    await api.deleteOpportunities()
    fetchOpportunities()
    confirmRemoveModal.value = false
  } catch (error) {
    console.error('Failed to remove opportunities', error)
  }
}

// pagination
let currentPage = 1
let numberPages = 1

const nextPage = () => {
  if (currentPage < numberPages) {
    fetchOpportunities(currentPage + 1)
  }
}

const prevPage = () => {
  if (currentPage > 1) {
    fetchOpportunities(currentPage - 1)
  }
}

const getPageNumbers = () => {
  const pages = []
  const total = numberPages
  const current = currentPage

  // always show the first page
  pages.push(1)

  const range = 2 // number of pages to show around the current page

  // add pages around the current page
  for (
    let i = Math.max(2, current - range);
    i <= Math.min(total - 1, current + range);
    i++
  ) {
    pages.push(i)
  }

  // always show the last page if it's not already included
  if (total > 1) {
    pages.push(total)
  }

  return pages
}

const matchOrganizationName = async (orgId) => {
  try {
    const organization = await api.getOrganization(orgId)
    return organization.data.name
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

const getActiveOpportunities = (opportunitiesList) => {
  return opportunitiesList
    .filter((opportunity) => opportunity.status === 'active')
    .sort((a, b) => new Date(a.date) - new Date(b.date))
}

const fetchOpportunities = async (page) => {
  try {
    const { data } = await api.getOpportunities(page, selectedDate.value)

    const fetchedOpportunities = data.data
    currentPage = data.page
    numberPages = data.totalPages

    const activeOpportunities = getActiveOpportunities(fetchedOpportunities)

    opportunities.value = await addOrgNameToOpportunities(activeOpportunities)
  } catch (error) {
    errorMessage.value = 'Failed to load opportunities. Please try again later.'
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
      class="d-flex flex-column flex-lg-row justify-content-between align-items-start mb-4"
    >
      <div class="text-start">
        <h1 class="h2 fw-bold">Volunteering Opportunities</h1>
        <p class="text-body-secondary">
          Find the perfect volunteering opportunity that matches your interests
          and availability
        </p>
      </div>
      <div class="d-flex gap-2 flex-column flex-xl-row">
        <div class="d-flex gap-2 align-items-start">
          <input
            type="date"
            id="filterDate"
            v-model="selectedDate"
            min="2024-01-01"
            class="form-control"
          />
          <button
            @click="fetchOpportunities"
            class="btn border-secondary-subtle w-100 btn-light"
          >
            Filter
          </button>
        </div>
        <button
          class="btn btn-danger "
          @click="confirmRemoveModal = true"
          v-if="opportunities.length && isAdmin()"
        >
          Remove all opportunities
        </button>
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
      <nav class="mt-5" v-if="numberPages > 1">
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a
              class="page-link text-black"
              :class="{ disabled: currentPage === 1 }"
              @click.prevent="prevPage"
              >Previous</a
            >
          </li>
          <li
            class="page-item"
            v-for="page in getPageNumbers()"
            :key="page"
            :class="{ active: currentPage === page }"
          >
            <a
              class="page-link text-dark"
              :class="{ active: currentPage === page }"
              @click.prevent="fetchOpportunities(page)"
            >
              {{ page }}
            </a>
          </li>
          <li class="page-item">
            <a
              class="page-link text-black"
              :class="{ disabled: currentPage === numberPages }"
              @click.prevent="nextPage"
              >Next</a
            >
          </li>
        </ul>
      </nav>
    </div>
    <!-- Confirmation Modal -->
    <div
      v-if="confirmRemoveModal"
      class="modal fade show"
      style="display: block; background: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Removal</h5>
            <button
              type="button"
              class="btn-close"
              @click="confirmRemoveModal = false"
            ></button>
          </div>
          <div class="modal-body">
            <p>
              Are you sure you want to remove all opportunities? This action
              cannot be undone.
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-dark"
              @click="confirmRemoveModal = false"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="removeAllOpportunities"
            >
              Remove All
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.pagination {
  cursor: pointer;
}

.pagination .active .page-link {
  background-color: lightgray;
  border-color: lightgray;
}
</style>
