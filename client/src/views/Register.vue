<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/Api'

// Reactive form data
const form = reactive({
  name: '',
  email: '',
  type: 'volunteer',
  password: '',
  confirmPassword: ''
})

// Error message ref
const errorMessage = ref(null)
const router = useRouter()

// Registration function
const registerUser = async () => {
  if (form.password !== form.confirmPassword) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  try {
    await api.register({
      name: form.name,
      email: form.email,
      type: form.type,
      password: form.password
    })
    router.push('/')
  } catch (error) {
    errorMessage.value = 'Registration failed. Please try again.'
  }
}
</script>

<template>
  <div class="mb-5 text-center">
    <img :src="`/logo-b.svg`" alt="logo" width="190" class="my-4" />
    <div class="wrapper m-auto border rounded">
      <div class="form-container mt-5">
        <h2 class="mb-4 text-center">Register</h2>
        <div v-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>
        <form @submit.prevent="registerUser">
          <div class="mb-3 text-start">
            <label for="name" class="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="form.name"
              required
            />
          </div>
          <div class="mb-3 text-start">
            <label for="email" class="form-label fw-semibold"
              >Email address</label
            >
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="form.email"
              required
            />
          </div>
          <div class="mb-3 text-start">
            <label for="type" class="form-label fw-semibold">Role</label>
            <select class="form-control" id="type" v-model="form.type" required>
              <option value="volunteer" selected>Volunteer</option>
              <option value="organization_representative">
                Organization representative
              </option>
            </select>
          </div>
          <div class="mb-3 text-start">
            <label for="password" class="form-label fw-semibold"
              >Password</label
            >
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="form.password"
              required
            />
          </div>
          <div class="mb-3 text-start">
            <label for="confirmPassword" class="form-label fw-semibold"
              >Confirm Password</label
            >
            <input
              type="password"
              class="form-control"
              id="confirmPassword"
              v-model="form.confirmPassword"
              required
            />
          </div>
          <button type="submit" class="btn btn-dark w-50 mt-3">Register</button>
        </form>
        <p class="mt-3 text-center">
          Already have an account? <router-link to="/login">Log in</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 80%;
  margin: auto;
}

.wrapper {
  max-width: 460px;
}
</style>
