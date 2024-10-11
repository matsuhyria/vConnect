import { reactive } from 'vue'

const state = reactive({
  user: null,
  token: null
})

export const isAuthenticated = () => {
  return !!state?.token
}

export const isRepresentative = (id) => {
  const { user } = state

  if (user?.type !== 'organization_representative') {
    return false
  }

  return id ? id === user.id : true
}

export default state
