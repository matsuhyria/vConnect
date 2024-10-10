import { reactive } from 'vue'

const state = reactive({
  user: null,
  token: null
})

export const isAuthenticated = () => {
  return !!state?.token
}

export const isRepresentative = () => {
  return state.user.type === 'organization_representative'
}

export default state
