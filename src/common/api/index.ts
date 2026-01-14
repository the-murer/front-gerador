import axios from 'axios'
import { useAuthStore } from '@/modules/auth/stores/auth-user-store'

const baseURL = import.meta.env.VITE_API_URL

export const api = axios.create({
  baseURL,
  timeout: 25000,
})

// Interceptor para adicionar o token JWT em todas as requisições
api.interceptors.request.use(
  (config) => {
    // Obtém o token do store zustand
    const accessToken = useAuthStore.getState().accessToken

    // Adiciona o header Authorization se o token existir
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Interceptor para tratar erros 401 (Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const request = error.config
    console.error(
      `Erro na requisição ${request.method?.toUpperCase()} ${request.url}`,
      error,
    )
    // Se receber erro 401, limpa o token e redireciona para login
    if (error.response?.status === 401) {
      const { setAuthenticatedUser } = useAuthStore.getState();
      setAuthenticatedUser(null);

      if (window.location.pathname !== '/auth/login') {
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error)
  },
)
