import axios from 'axios'
import state from './state'
import router from './router'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3000/api/v1'
})

instance.interceptors.request.use((config) => {
  if (state && state.token) {
    config.headers.Authorization = `Bearer ${state.token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

const storeUserData = (data) => {
  if (data) {
    state.user = data.user
    state.token = data.token
    localStorage.setItem('userData', JSON.stringify(data))
  }
}

export default {
  login: async (data) => {
    const { data: { message, ...response } } = await instance.post('users/login', data)
    storeUserData(response)
    return response
  },
  register: async (data) => {
    const { data: { message, ...response } } = await instance.post('users/', data)
    storeUserData(response)
    return response
  },
  logout: () => {
    localStorage.removeItem('userData')
    state.user = null
    state.token = null
    router.push('/')
  },
  updateUser: async (data) => {
    const { data: { message, ...response } } = await instance.patch('/users/' + state.user.id, data)
    storeUserData(response)
    return response
  },
  getUpcomingOpportunities: async () => {
    try {
      const response = await instance.get('/opportunities')
      const opportunities = response.data.data

      const activeOpportunities = opportunities
        .filter(opportunity => opportunity.status === 'active')
        .sort((a, b) => new Date(a.date) - new Date(b.date))

      return activeOpportunities
    } catch (error) {
      console.error('API Error getting opportunities')
      throw error
    }
  },
  getOrganizations: async () => {
    return instance.get('/organizations')
  },
  getOrganizationById: async (orgId) => {
    const response = await instance.get(`/organizations/${orgId}`)
    return response.data
  },
  createOrganization: async (organization) => {
    return instance.post('/organizations', organization)
  }
}
