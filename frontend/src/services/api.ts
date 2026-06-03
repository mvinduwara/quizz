import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) localStorage.removeItem('token')
    return Promise.reject(err)
  }
)

export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (username: string, email: string, password: string) =>
    api.post('/auth/register', { username, email, password }),
}

export const questionsApi = {
  getAll: (category?: string, difficulty?: string) =>
    api.get('/questions', { params: { category, difficulty } }),
  getById: (id: number) => api.get(`/questions/${id}`),
}

export const leaderboardApi = {
  getAll: (category?: string) =>
    api.get('/leaderboard', { params: { category } }),
  submit: (data: { score: number; total: number; category: string; difficulty: string }) =>
    api.post('/leaderboard', data),
}

export default api