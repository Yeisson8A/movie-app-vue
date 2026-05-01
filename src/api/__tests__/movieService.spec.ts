import { beforeEach, describe, expect, it, vi } from 'vitest'
import apiClient from '../client'
import { movieService } from '../movieService'

// Mockeamos el módulo completo del cliente
vi.mock('../client', () => ({
  default: {
    get: vi.fn(),
  },
}))

describe('movieService', () => {
  // Limpiar mocks antes de cada test para evitar interferencias
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // --- Tests de Funciones Asíncronas ---

  it('getPopular debe llamar al endpoint correcto con parámetros', async () => {
    const mockData = { results: [{ id: 1, title: 'Test Movie' }], page: 1 }

    // Configuramos el mock para devolver una promesa resuelta
    vi.mocked(apiClient.get).mockResolvedValue({ data: mockData })

    const result = await movieService.getPopular(2)

    expect(apiClient.get).toHaveBeenCalledWith('/movie/popular', {
      params: { page: 2 },
    })
    expect(result).toEqual(mockData)
  })

  it('getMovieVideos debe filtrar solo videos de YouTube', async () => {
    const mockVideoResponse = {
      results: [
        { id: '1', site: 'YouTube', type: 'Trailer' },
        { id: '2', site: 'Vimeo', type: 'Teaser' },
      ],
    }

    vi.mocked(apiClient.get).mockResolvedValue({ data: mockVideoResponse })

    const videos = await movieService.getMovieVideos(123)

    // Solo debe quedar el de YouTube
    expect(videos).toHaveLength(1)
    expect(videos[0].site).toBe('YouTube')
    expect(apiClient.get).toHaveBeenCalledWith('/movie/123/videos')
  })

  // --- Tests de Funciones Síncronas (Helpers) ---

  describe('getImageUrl', () => {
    it('debe generar la URL correcta con tamaño w500 por defecto', () => {
      const path = '/test.jpg'
      const url = movieService.getImageUrl(path)
      expect(url).toBe('https://image.tmdb.org/t/p/w500/test.jpg')
    })

    it('debe devolver el placeholder si el path es null', () => {
      const url = movieService.getImageUrl(null)
      expect(url).toBe('/placeholder-movie.png')
    })

    it('debe respetar el tamaño original si se solicita', () => {
      const url = movieService.getImageUrl('/test.jpg', 'original')
      expect(url).toContain('/p/original/')
    })
  })
})
