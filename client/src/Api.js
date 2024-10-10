import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3000/api/v1'
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

const storeToken = (token) => {
  if (token) {
    localStorage.setItem('token', token)
  }
}

export default {
  login: async (data) => {
    const response = await instance.post('users/login', data)
    storeToken(response?.data?.token)
    return response
  },
  logout: () => {
    localStorage.removeItem('token')
  },
  register: async (data) => {
    const response = await instance.post('users/', data)
    storeToken(response?.data?.token)
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
      console.error('Error getting opportunities')
      throw error
    }
  }
}
