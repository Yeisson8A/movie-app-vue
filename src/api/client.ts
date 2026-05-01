import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    // Es mejor usar VITE_ para variables de entorno
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'es-ES',
  },
})

export default apiClient
