<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Api from '@/Api'
import InputField from '@/components/InputField.vue'

const form = reactive({
  email: '',
  password: ''
})

const errorMessage = ref(null)
const router = useRouter()

const loginUser = async () => {
  if (!form.email || !form.password) {
    errorMessage.value = 'Email and password are required'
    return
  }
  try {
    await Api.login({
      email: form.email,
      password: form.password
    })
    // Redirect to the home page afterwards
    router.push('/')
  } catch (error) {
    errorMessage.value = 'Login failed. Please check your credentials'
  }
}
</script>

<template>
  <div>
    <img :src="`./logo-b.svg`" alt="logo" width="190" class="my-4" />
    <div class="wrapper m-auto border rounded">
      <div class="form-container mt-5">
        <h2 class="mb-4 text-center">Login</h2>
        <div v-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>
        <form @submit.prevent="loginUser">
          <inputField
            label="Email Address"
            inputType="email"
            v-model="form.email"
            required
          />
          <inputField
            label="Password"
            inputType="password"
            v-model="form.password"
            required
          />
          <button type="submit" class="btn btn-dark w-50 mt-3">Login</button>
        </form>
        <p class="mt-3 text-center">
          Don't have an account? <router-link to="/register">Register</router-link>
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
