import type { Movie } from '@/types/movie'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useFavoriteStore = defineStore('favorites', () => {
  // Estado: Iniciamos con lo que haya en localStorage o un array vacío
  const favorites = ref<Movie[]>(
    JSON.parse(localStorage.getItem('my-favorites') || '[]'),
  )

  // Getters (Propiedades computadas)
  const isFavorite = (movieId: number) => {
    return favorites.value.some(m => m.id === movieId)
  }

  // Acciones (Funciones para cambiar el estado)
  const toggleFavorite = (movie: Movie) => {
    const index = favorites.value.findIndex(m => m.id === movie.id)

    if (index === -1) {
      favorites.value.push(movie) // Agregar si no existe
    } else {
      favorites.value.splice(index, 1) // Quitar si ya existe
    }
  }

  // Watcher: Cada vez que cambie la lista, guardamos en localStorage
  watch(
    favorites,
    state => {
      localStorage.setItem('my-favorites', JSON.stringify(state))
    },
    { deep: true },
  )

  return {
    favorites,
    isFavorite,
    toggleFavorite,
  }
})
