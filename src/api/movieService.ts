import type { Movie } from '@/types/movie'
import type { MovieDetail } from '@/types/movieDetail'
import type { PaginatedResponse } from '@/types/paginatedResponse'
import type { Video } from '@/types/video'
import type { VideoResponse } from '@/types/videoResponse'
import apiClient from './client'

export const movieService = {
  // Obtener películas populares
  async getPopular (page = 1): Promise<PaginatedResponse<Movie>> {
    const { data } = await apiClient.get<PaginatedResponse<Movie>>('/movie/popular', {
      params: { page },
    })
    return data
  },

  // Buscar películas por texto
  async searchMovies (query: string, page = 1): Promise<PaginatedResponse<Movie>> {
    const { data } = await apiClient.get<PaginatedResponse<Movie>>('/search/movie', {
      params: { query, page },
    })
    return data
  },

  // Obtener detalle de una película específica
  async getMovieDetails (id: number): Promise<MovieDetail> {
    const { data } = await apiClient.get<MovieDetail>(`/movie/${id}`)
    return data
  },

  // Helper para generar la URL completa de la imagen
  getImageUrl (path: string | null, size: 'w500' | 'original' = 'w500'): string {
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : '/placeholder-movie.png'
  },

  async getMovieVideos (id: number): Promise<Video[]> {
    const { data } = await apiClient.get<VideoResponse>(`/movie/${id}/videos`)
    // Filtramos para obtener preferiblemente trailers de YouTube
    return data.results.filter(video => video.site === 'YouTube')
  },
}
