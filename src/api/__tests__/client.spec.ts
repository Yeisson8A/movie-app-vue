/// <reference types="vite/client" />
import { describe, expect, it } from 'vitest'
import apiClient from '../client'

describe('API Client (Axios Instance)', () => {
  it('debe estar configurado con la baseURL correcta de TMDB', () => {
    expect(apiClient.defaults.baseURL).toBe('https://api.themoviedb.org/3')
  })

  it('debe tener configurado el header Content-Type como application/json', () => {
    // Axios guarda los headers por defecto en un objeto interno
    expect(apiClient.defaults.headers['Content-Type']).toBe('application/json')
  })

  it('debe incluir los parámetros por defecto (api_key y language)', () => {
    const params = apiClient.defaults.params

    expect(params).toHaveProperty('api_key')
    expect(params.language).toBe('es-ES')
  })

  it('debe usar la variable de entorno para la api_key', () => {
    // Verificamos que el valor asignado a api_key sea el que definimos en el entorno
    // En el entorno de test, Vitest carga automáticamente el .env o puedes mockearlo
    const apiKey = import.meta.env.VITE_TMDB_API_KEY
    expect(apiClient.defaults.params.api_key).toBe(apiKey)
  })
})
