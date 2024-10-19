<script setup>
import LockIcon from '@/components/icons/LockIcon.vue'
import state from '@/state'
import { ref } from 'vue'
import api from '@/Api'

const editingName = ref(false) // To track if the name field is being edited
const editingEmail = ref(false) // To track if the email field is being edited
const userProfile = ref({
  name: state.user.name,
  email: state.user.email
})

const newPassword = ref('')
const confirmPassword = ref('')
const passwordError = ref(null)
const nameError = ref(null)
const emailError = ref(null)

const MIN_PASS_LENGTH = 3

// Edit and Save Name
const startEditingName = () => {
  editingName.value = true
}

const saveName = async () => {
  try {
    await api.updateUser({ name: userProfile.value.name })
    editingName.value = false
    nameError.value = null // Clear any previous errors
    state.user.name = userProfile.value.name // Update the state after success
  } catch (error) {
    nameError.value = 'Failed to update name. Please try again.'
    console.error(error)
  }
}

const cancelEditName = () => {
  editingName.value = false
  nameError.value = null // Clear any previous errors
  // Reset to the original name
  userProfile.value.name = state.user.name
}

// Edit and Save Email
const startEditingEmail = () => {
  editingEmail.value = true
}

const saveEmail = async () => {
  try {
    const emailExists = await api.checkEmail(userProfile.value.email)
    
    if (emailExists) {
      emailError.value = 'Email already exists. Please use a different email.'
      return
    }

    await api.updateUser({ email: userProfile.value.email })
    editingEmail.value = false
    emailError.value = null // Clear the error message
    state.user.email = userProfile.value.email // Update the state after success
  } catch (error) {
    emailError.value = 'Failed to update email. Please try again.'
    console.error(error)
  }
}

const cancelEditEmail = () => {
  editingEmail.value = false
  editingEmail.value = null // Clear any previous errors
  // Reset to the original email
  userProfile.value.email = state.user.email
}

// Update Password
const updatePassword = async () => {
  if (newPassword.value.length < MIN_PASS_LENGTH) {
    passwordError.value = 'Password must be at least 3 characters long'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    passwordError.value = 'Passwords do not match'
    return
  }
  passwordError.value = null

  try {
    await api.updateUser({
      password: newPassword.value
    })

    // Clear password fields after submission
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (error) {
    passwordError.value = 'Failed to update password. Please try again.'
    console.error(error)
  }
}
</script>

<template>
  <div class="container mt-5">
    <!-- User Info Card -->
    <div class="card border rounded-2 p-4 mb-4">
      <div class="d-flex justify-content-between mb-4">
        <h3 class="text-capitalize">{{ userProfile.name }}</h3>
        <button @click="api.logout()" class="btn btn-link fw-bold">
          Logout
        </button>
      </div>
      <div class="row">
        <!-- Name Field -->
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <div class="d-flex align-items-center gap-3">
            <input
              type="text"
              v-model="userProfile.name"
              class="form-control"
              :readonly="!editingName"
              :disabled="!editingName"
            />
            <div class="col-3 col-md-2 text-end">
              <div v-if="editingName">
                <button @click="saveName" class="btn btn-sm me-2 text-success">
                  ✓
                </button>
                <button @click="cancelEditName" class="btn btn-sm text-danger">
                  ✕
                </button>
              </div>
              <div v-else>
                <button
                  @click="startEditingName"
                  class="bg-transparent border-0 p-0 text-secondary"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
          <!-- Error for name -->
          <div v-if="nameError" class="alert alert-danger mt-2">
            {{ nameError }}
          </div>
        </div>

        <!-- Email Field -->
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <div class="d-flex align-items-center gap-3">
            <input
              type="email"
              v-model="userProfile.email"
              class="form-control"
              :readonly="!editingEmail"
              :disabled="!editingEmail"
            />
            <div class="col-3 col-md-2 text-end">
              <div v-if="editingEmail">
                <button @click="saveEmail" class="btn btn-sm me-2 text-success">
                  ✓
                </button>
                <button @click="cancelEditEmail" class="btn btn-sm text-danger">
                  ✕
                </button>
              </div>
              <div v-else>
                <button
                  @click="startEditingEmail"
                  class="bg-transparent border-0 p-0 text-secondary"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
          <!-- Error for email -->
          <div v-if="emailError" class="alert alert-danger mt-2">
            {{ emailError }}
          </div>
        </div>
      </div>
    </div>

    <!-- Password Update Card -->
    <div class="card border rounded-2 p-4 d-block">
      <h4 class="align-items-center d-flex fs-4 mb-4">
        <LockIcon class="me-2" />Update Password
      </h4>
      <div v-if="passwordError" class="alert alert-danger">
        {{ passwordError }}
      </div>
      <div class="mb-3">
        <label for="newPassword" class="form-label">New Password</label>
        <input
          type="password"
          v-model="newPassword"
          id="newPassword"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="confirmPassword" class="form-label"
          >Confirm New Password</label
        >
        <input
          type="password"
          v-model="confirmPassword"
          id="confirmPassword"
          class="form-control"
          required
        />
      </div>
      <button @click="updatePassword" class="btn btn-dark">
        Update Password
      </button>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 650px;
}
</style>
