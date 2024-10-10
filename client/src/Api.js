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
  getOrganizations: async () => {
    return instance.get('/organizations')
  },
  createOrganization: async (organization) => {
    return instance.post('/organizations', organization)
  }
}
