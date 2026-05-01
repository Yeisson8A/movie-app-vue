import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { useFavoriteStore } from '../../store/favorites'
// @ts-ignore
import MovieCard from '../MovieCard.vue'

// Configuración de Vuetify para los tests
const vuetify = createVuetify({
  components,
  directives,
})

describe('MovieCard.vue', () => {
  const mockMovie = {
    id: 123,
    title: 'Pulp Fiction',
    poster_path: '/pulp.jpg',
    vote_average: 8.9,
    release_date: '1994-10-14',
    overview: 'La vida de varios criminales se entrelaza.',
  }

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  // Factory para montar el componente con menos boilerplate
  const factory = (props = {}) => {
    return mount(MovieCard, {
      props: {
        movie: mockMovie,
        ...props,
      },
      global: {
        plugins: [vuetify],
      },
    })
  }

  it('debe renderizar la información básica de la película', () => {
    const wrapper = factory()

    expect(wrapper.text()).toContain('Pulp Fiction')
    expect(wrapper.text()).toContain('1994')
    expect(wrapper.text()).toContain('8.9')
  })

  it('debe emitir el evento "click" al presionar la tarjeta', async () => {
    const wrapper = factory()

    // Simulamos el click en la v-card (raíz del componente)
    await wrapper.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.emitted().click[0]).toEqual([123])
  })

  it('debe llamar a toggleFavorite del store cuando se pulsa el botón de corazón', async () => {
    const store = useFavoriteStore()
    const spy = vi.spyOn(store, 'toggleFavorite')
    const wrapper = factory()

    // Buscamos el botón de favorito (v-btn dentro de v-img)
    const favoriteBtn = wrapper.find('.v-btn--icon')
    await favoriteBtn.trigger('click')

    expect(spy).toHaveBeenCalledWith(mockMovie)
  })

  it('debe cambiar el color del ícono si la película es favorita', async () => {
    const store = useFavoriteStore()
    // Forzamos que sea favorita antes de montar
    store.favorites = [mockMovie]

    const wrapper = factory()
    const iconBtn = wrapper.findComponent({ name: 'v-btn' })

    // El color de Vuetify se traduce a una clase o estilo inline dependiendo del tema
    // Verificamos el ícono específico
    expect(wrapper.find('.v-icon').classes()).toContain('mdi-heart')
    expect(iconBtn.props('color')).toBe('red')
  })

  it('debe mostrar un texto por defecto si no hay overview', () => {
    const movieNoOverview = { ...mockMovie, overview: '' }
    const wrapper = factory({ movie: movieNoOverview })

    expect(wrapper.text()).toContain('Sin descripción disponible.')
  })
})
