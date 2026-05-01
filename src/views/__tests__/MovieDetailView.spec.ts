import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { movieService } from '../../api/movieService'
// @ts-ignore
import MovieDetailView from '../MovieDetailView.vue'

// 1. Mocks de los servicios
vi.mock('../../api/movieService', () => ({
  movieService: {
    getMovieDetails: vi.fn(),
    getMovieVideos: vi.fn(),
    getImageUrl: vi.fn(path => `https://image.com${path}`),
  },
}))

const vuetify = createVuetify({ components, directives })

// Mock global para ResizeObserver
globalThis.ResizeObserver = class ResizeObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

// Mock global para visualViewport para Diálogos y Menús
if (!globalThis.visualViewport) {
  (globalThis as any).visualViewport = {
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    width: 1024,
    height: 768,
  }
}

describe('MovieDetailView.vue', () => {
  const mockMovie = {
    id: 500,
    title: 'Reservoir Dogs',
    backdrop_path: '/backdrop.jpg',
    poster_path: '/poster.jpg',
    release_date: '1992-09-02',
    vote_average: 8.1,
    overview: 'Seis criminales son contratados...',
    genres: [{ id: 1, name: 'Crimen' }],
  }

  const mockVideos = [
    { key: 'abc-123', type: 'Trailer', site: 'YouTube' },
  ]

  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()

    // Configuración exitosa por defecto
    vi.mocked(movieService.getMovieDetails).mockResolvedValue(mockMovie as any)
    vi.mocked(movieService.getMovieVideos).mockResolvedValue(mockVideos as any)
  })

  const factory = (props?: { id: string }) => {
    return mount(MovieDetailView, {
      props: props ?? { id: '500' }, // Si no vienen props, usa este objeto nuevo
      global: {
        plugins: [vuetify],
        mocks: {
          $router: { back: vi.fn() },
        },
      },
    })
  }

  it('debe mostrar el loader inicialmente', () => {
    const wrapper = factory()
    // Buscamos el componente v-progress-circular
    expect(wrapper.findComponent({ name: 'v-progress-circular' }).exists()).toBe(true)
  })

  it('debe cargar y renderizar los detalles de la película', async () => {
    const wrapper = factory()

    await flushPromises() // Esperamos a que terminen los fetch del onMounted

    expect(movieService.getMovieDetails).toHaveBeenCalledWith(500)
    expect(wrapper.text()).toContain('Reservoir Dogs')
    expect(wrapper.text()).toContain('Seis criminales')
    expect(wrapper.find('h1').text()).toBe('Reservoir Dogs')
  })

  it('debe mostrar el botón de trailer si existe un video disponible', async () => {
    const wrapper = factory()
    await flushPromises()

    const trailerBtn = wrapper.find('button.v-btn:has(.mdi-play)')
    expect(trailerBtn.exists()).toBe(true)
    expect(trailerBtn.text()).toContain('Ver Trailer')
  })

  it('debe abrir el v-dialog al hacer clic en "Ver Trailer"', async () => {
    const wrapper = factory()
    await flushPromises()

    const trailerBtn = wrapper.find('button.v-btn:has(.mdi-play)')
    await trailerBtn.trigger('click')

    const dialog = wrapper.findComponent({ name: 'v-dialog' })
    expect(dialog.props('modelValue')).toBe(true)

    const iframe = document.querySelector('iframe')

    expect(iframe).not.toBeNull()
    expect(iframe?.getAttribute('src')).toContain('abc-123')
  })

  it('debe permitir alternar favoritos desde la vista de detalle', async () => {
    const wrapper = factory()
    await flushPromises()

    const favBtn = wrapper.findAll('button.v-btn').find(b => b.text().includes('Añadir'))
    expect(favBtn).toBeDefined()

    await favBtn?.trigger('click')

    // El botón debería cambiar su texto (gracias a la reactividad del store)
    expect(wrapper.text()).toContain('En favoritos')
  })

  it('debe llamar al router para volver atrás', async () => {
    const wrapper = factory()
    await flushPromises()

    const backBtn = wrapper.findAll('button.v-btn').find(b => b.text().includes('Volver'))
    await backBtn?.trigger('click')

    expect(wrapper.vm.$router.back).toHaveBeenCalled()
  })
})
