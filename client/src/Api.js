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
  checkEmail: async (email) => {
    const { data } = await instance.get(`/users/check-email?email=${email}`)
    return data.exists
  },
  getOpportunities: async (page, date) => {
    return instance.get(`/opportunities?page=${page}&date=${date}`)
  },
  getOpportunity: async (id) => {
    return instance.get(`/opportunities/${id}`)
  },
  getOrganizations: async () => {
    return instance.get('/organizations')
  },
  createOrganization: async (organization) => {
    return instance.post('/organizations', organization)
  },
  getOrganization: async (id) => {
    return instance.get(`/organizations/${id}`)
  },
  updateOrganization: async (id, organization) => {
    return instance.put(`/organizations/${id}`, organization)
  },
  getOpportunitiesPerOrganization: async (id) => {
    return instance.get(`/organizations/${id}/opportunities`)
  },
  createOpportunity: async (orgId, opportunity) => {
    return instance.post(`/organizations/${orgId}/opportunities`, opportunity)
  },
  deleteOpportunities: async () => {
    return instance.delete('/opportunities')
  },
  getRegistrationsPerOpportunity: async (id) => {
    return instance.get(`/opportunities/${id}/registrations`)
  },
  createRegistration: async (id) => {
    return instance.post(`/opportunities/${id}/registrations`)
  },
  encryptOpportunityId: async (orgId, id) => {
    return instance.get(`/organizations/${orgId}/opportunities/${id}/encrypt-id`)
  },
  confirmAttendance: async (opportunityId, id, data) => {
    return instance.post(`/opportunities/${opportunityId}/registrations/${id}/confirm-attendance`, { encryptedOpportunityId: data })
  }
}
