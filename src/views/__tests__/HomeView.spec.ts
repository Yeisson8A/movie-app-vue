import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { movieService } from '../../api/movieService'
// @ts-ignore
import HomeView from '../HomeView.vue'

// 1. Mock del Servicio de API
vi.mock('../../api/movieService', () => ({
  movieService: {
    getPopular: vi.fn(),
    searchMovies: vi.fn(),
  },
}))

const vuetify = createVuetify({ components, directives })

describe('HomeView.vue', () => {
  const mockResponse = {
    results: [
      { id: 1, title: 'Popular Movie', poster_path: '/p.jpg', vote_average: 8, release_date: '2024', overview: '...' },
    ],
    total_pages: 10,
    page: 1,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    // Configuración por defecto del mock
    vi.mocked(movieService.getPopular).mockResolvedValue(mockResponse)
    vi.mocked(movieService.searchMovies).mockResolvedValue(mockResponse)
  })

  const factory = () => {
    return mount(HomeView, {
      global: {
        plugins: [vuetify],
        stubs: {
          MovieGrid: true,
          SearchBar: true,
        },
      },
    })
  }

  it('debe cargar películas populares al montarse (onMounted)', async () => {
    factory()

    expect(movieService.getPopular).toHaveBeenCalledWith(1)
  })

  it('debe cambiar el título de "Tendencias" a "Resultados" al buscar', async () => {
    const wrapper = factory()

    // El título inicial debería ser Tendencias
    expect(wrapper.find('h1').text()).toContain('Tendencias hoy')

    // Simulamos que el componente SearchBar emite una búsqueda
    const searchBar = wrapper.findComponent({ name: 'SearchBar' })
    await searchBar.vm.$emit('search', 'Batman')

    expect(wrapper.find('h1').text()).toContain('Resultados de búsqueda')
    expect(movieService.searchMovies).toHaveBeenCalledWith('Batman', 1)
  })

  it('debe acumular películas cuando se ejecuta loadMore', async () => {
    const wrapper = factory()

    // 1. Esperamos a que todas las promesas (onMounted) se resuelvan
    await flushPromises()

    // 2. Forzamos a Vue a procesar los cambios de estado (loading = false, movies.length > 0)
    // Ahora el v-if del botón debería ser true
    const loadMoreBtn = wrapper.findComponent({ name: 'v-btn' })

    expect(loadMoreBtn.exists()).toBe(true)
    expect(loadMoreBtn.text()).toContain('Cargar más')

    await loadMoreBtn.trigger('click')

    // Verificamos que se llamó a la página 2
    expect(movieService.getPopular).toHaveBeenCalledWith(2)
  })

  it('debe mostrar el loading state mientras espera la respuesta', async () => {
    // Forzamos una promesa que no se resuelva inmediatamente
    vi.mocked(movieService.getPopular).mockReturnValue(new Promise(() => {}))

    const wrapper = factory()
    const grid = wrapper.findComponent({ name: 'MovieGrid' })

    expect(grid.props('loading')).toBe(true)
  })
})
