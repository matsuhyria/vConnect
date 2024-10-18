<script setup>
import api from '@/Api'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import QrcodeVue from 'qrcode.vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import { truncateDate } from '@/utils/utils.js'
import Sidebar from '@/components/Sidebar.vue'
import LockIcon from '@/components/icons/LockIcon.vue'
import MapIcon from '@/components/icons/MapIcon.vue'
import CalendarIcon from '@/components/icons/CalendarIcon.vue'
import state, { isVolunteer } from '@/state'

const route = useRoute()
const router = useRouter()

const opportunity = ref({})
const organization = ref({})
const registrations = ref([])

const showQRCodeModalVisible = ref(false)
const scanQRCodeModalVisible = ref(false)

const opportunityId = route.params.id
const qrcodeValue = ref()

const isManagedByUser = (managingUserId) => {
  return managingUserId === state.user?.id
}

const isUserSignedUp = (registrations) => {
  return registrations?.find((reg) => reg.user === state.user?.id)
}

// Fetch opportunity data from API
const fetchOpportunityData = async () => {
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
    await api.createRegistration(opportunityId)
  } catch (error) {
    console.error('Failed to sign up', error)
    if (error.response?.status === 401) {
      router.push('/login')
    }
  }
}

const getRegistrationsForOpportunity = async () => {
  try {
    const { data } = await api.getRegistrationsPerOpportunity(opportunityId)
    registrations.value = data
  } catch (error) {
    console.error('Failed retrieving registrations', error)
  }
}

const onDetect = async (result) => {
  console.log('QR Code detected:', result)

  try {
    const registration = isUserSignedUp(registrations.value)
    await api.confirmAttendance(
      opportunity.value._id,
      registration._id,
      result[0].rawValue
    )
    scanQRCodeModalVisible.value = false
    getRegistrationsForOpportunity()
  } catch (error) {
    console.error('Failed to confirm attendance', error)
  }
}

const showQRCodeModal = async () => {
  showQRCodeModalVisible.value = true
  const { data } = await api.encryptOpportunityId(
    organization.value._id,
    opportunity.value._id
  )
  qrcodeValue.value = data
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
      <div class="col-lg-7 mb-5 py-4">
        <h1 class="h2 fw-bold">{{ opportunity.title }}</h1>
        <p class="text-body-secondary">{{ organization.name }}</p>
        <ul class="text-body-secondary list-inline">
          <li class="list-inline-item pe-5">
            <CalendarIcon class="me-1" />{{ truncateDate(opportunity.date) }}
          </li>
          <li class="list-inline-item"><MapIcon />{{ opportunity.address }}</li>
        </ul>

        <div class="my-5">
          <h5 class="fw-bold">Description</h5>
          <p>{{ opportunity.description }}</p>
        </div>

        <div
          class="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-3"
        >
          <p class="m-0">
            <LockIcon />
            {{ registrations.length }} volunteers already signed up
          </p>

          <!-- Action Buttons -->
          <button
            v-if="isManagedByUser(organization.managed_by)"
            class="btn border-secondary-subtle btn-light px-5"
            @click="showQRCodeModal"
          >
            Show QR Code
          </button>

          <button
            v-else-if="isUserSignedUp(registrations)?.status === 'confirmed'"
            class="btn btn-success"
            disabled
          >
            Attendance Confirmed
          </button>

          <button
            v-else-if="isUserSignedUp(registrations)"
            class="btn btn-success"
            @click="scanQRCodeModalVisible = true"
          >
            Confirm Attendance
          </button>

          <button
            v-else-if="isVolunteer()"
            class="btn btn-dark"
            @click="signUpForOpportunity"
          >
            Sign Up to Volunteer
          </button>
        </div>
      </div>
      <Sidebar class="col-lg-4 col-md-5" />
    </div>

    <!-- QR Code Modal -->
    <div
      v-if="showQRCodeModalVisible"
      class="modal fade show"
      style="display: block; background: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0">
            <button
              type="button"
              class="btn-close"
              @click="showQRCodeModalVisible = false"
            ></button>
          </div>
          <div class="modal-body text-center py-5 my-5">
            <qrcode-vue
              v-if="qrcodeValue"
              :value="qrcodeValue"
              level="H"
              size="250"
            />
            <div class="spinner-border" role="status" v-else>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scan QR Code Modal -->
    <div
      v-if="scanQRCodeModalVisible"
      class="modal fade show"
      style="display: block; background: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Scan QR Code</h5>
            <button
              type="button"
              class="btn-close"
              @click="scanQRCodeModalVisible = false"
            ></button>
          </div>
          <div class="modal-body text-center">
            <qrcode-stream @detect="onDetect"></qrcode-stream>
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

.modal-content {
  background: white;
  border-radius: 8px;
}
</style>
