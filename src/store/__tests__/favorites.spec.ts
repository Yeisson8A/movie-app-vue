import type { Movie } from '../../types/movie'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useFavoriteStore } from '../favorites'

describe('Favorites Store', () => {
  // Mock de una película para las pruebas
  const mockMovie: Movie = {
    id: 550,
    title: 'Fight Club',
    poster_path: '/path.jpg',
    backdrop_path: '/backdrop.jpg',
    genre_ids: [18],
    vote_average: 8.8,
    release_date: '1999-10-15',
    overview: 'A ticking-time bomb insomniac...',
  }

  beforeEach(() => {
    // 1. Crear una nueva instancia de Pinia antes de cada test
    setActivePinia(createPinia())
    // 2. Limpiar el localStorage para que los tests sean independientes
    localStorage.clear()
    // 3. Limpiar todos los mocks de funciones
    vi.clearAllMocks()
  })

  it('debe iniciar con un array vacío si no hay nada en localStorage', () => {
    const store = useFavoriteStore()
    expect(store.favorites).toEqual([])
  })

  it('debe cargar los datos iniciales desde localStorage', () => {
    // Simulamos datos previos en el storage
    localStorage.setItem('my-favorites', JSON.stringify([mockMovie]))

    const store = useFavoriteStore()
    expect(store.favorites).toHaveLength(1)
    expect(store.favorites[0].title).toBe('Fight Club')
  })

  it('debe agregar una película si no está en la lista (toggleFavorite)', () => {
    const store = useFavoriteStore()
    store.toggleFavorite(mockMovie)

    expect(store.favorites).toHaveLength(1)
    expect(store.isFavorite(550)).toBe(true)
  })

  it('debe eliminar una película si ya existe en la lista (toggleFavorite)', () => {
    const store = useFavoriteStore()

    // Agregamos y luego quitamos
    store.toggleFavorite(mockMovie)
    store.toggleFavorite(mockMovie)

    expect(store.favorites).toHaveLength(0)
    expect(store.isFavorite(550)).toBe(false)
  })

  it('debe persistir los cambios en localStorage cuando el estado cambia', async () => {
    const store = useFavoriteStore()

    // Espiamos el método setItem de localStorage
    const spySetItem = vi.spyOn(Storage.prototype, 'setItem')

    store.toggleFavorite(mockMovie)

    // El watch de Vue es asíncrono, esperamos al siguiente "tick"
    await vi.waitFor(() => {
      expect(spySetItem).toHaveBeenCalledWith(
        'my-favorites',
        expect.stringContaining('Fight Club'),
      )
    })
  })

  it('isFavorite debe retornar false para una película que no está en la lista', () => {
    const store = useFavoriteStore()
    expect(store.isFavorite(999)).toBe(false)
  })
})
