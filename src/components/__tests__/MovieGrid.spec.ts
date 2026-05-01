import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// @ts-ignore
import MovieCard from '../MovieCard.vue'
// @ts-ignore
import MovieGrid from '../MovieGrid.vue'

// 1. Configuración de Vuetify
const vuetify = createVuetify({ components, directives })

// 2. Mock del Router para probar la navegación
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/movie/:id', name: 'MovieDetail', component: { template: '<div></div>' } }],
})

describe('MovieGrid.vue', () => {
  const mockMovies = [
    { id: 1, title: 'Movie 1', poster_path: '/1.jpg', vote_average: 8, release_date: '2024-01-01', overview: '...' },
    { id: 2, title: 'Movie 2', poster_path: '/2.jpg', vote_average: 7, release_date: '2024-02-02', overview: '...' },
  ]

  beforeEach(() => {
    // Resetear el router a la ruta raíz antes de cada test
    router.push('/')
  })

  const factory = (props = {}) => {
    return mount(MovieGrid, {
      props: {
        movies: [],
        loading: false,
        ...props,
      },
      global: {
        plugins: [vuetify, router],
        stubs: {
          // Usamos stubs para no renderizar la lógica interna de MovieCard en este test
          MovieCard: true,
        },
      },
    })
  }

  it('debe mostrar skeleton loaders cuando loading es true', () => {
    const wrapper = factory({ loading: true })

    // Verifica que existan componentes de skeleton loader
    const skeletons = wrapper.findAllComponents({ name: 'v-skeleton-loader' })
    expect(skeletons.length).toBeGreaterThan(0)

    // No debería haber MovieCards mientras carga
    expect(wrapper.findComponent(MovieCard).exists()).toBe(false)
  })

  it('debe renderizar la lista de películas correctamente', () => {
    const wrapper = factory({ movies: mockMovies, loading: false })

    const cards = wrapper.findAllComponents(MovieCard)
    expect(cards).toHaveLength(2)
    expect(cards[0].props('movie')).toEqual(mockMovies[0])
  })

  it('debe mostrar un mensaje si la lista de películas está vacía', () => {
    const wrapper = factory({ movies: [], loading: false })

    expect(wrapper.text()).toContain('No se encontraron películas.')
    expect(wrapper.find('.v-icon').exists()).toBe(true)
  })

  it('debe navegar al detalle de la película cuando se emite el evento click', async () => {
    const pushSpy = vi.spyOn(router, 'push')
    const wrapper = factory({ movies: mockMovies, loading: false })

    // Buscamos el primer MovieCard y simulamos su emisión de evento 'click'
    const firstCard = wrapper.findComponent(MovieCard)
    await firstCard.vm.$emit('click', 1)

    expect(pushSpy).toHaveBeenCalledWith({
      name: 'MovieDetail',
      params: { id: 1 },
    })
  })
})
