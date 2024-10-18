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

export const isAdmin = () => {
  return state.user?.type === 'admin'
}

export const isVolunteer = () => {
  return state.user?.type === 'volunteer'
}

export default state
