import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { useFavoriteStore } from '../../store/favorites'
// @ts-ignore
import FavoritesView from '../FavoritesView.vue'

// 1. Configuración de entorno (Vuetify + Router)
const vuetify = createVuetify({ components, directives })
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', name: 'Home', component: { template: '<div></div>' } }],
})

describe('FavoritesView.vue', () => {
  const mockMovies = [
    { id: 1, title: 'Inception', poster_path: '/inc.jpg', vote_average: 8.8, release_date: '2010', overview: '...' },
    { id: 2, title: 'Interstellar', poster_path: '/int.jpg', vote_average: 8.6, release_date: '2014', overview: '...' },
  ]

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const factory = () => {
    return mount(FavoritesView, {
      global: {
        plugins: [vuetify, router],
        stubs: {
          // Marcamos MovieGrid como stub para aislar la prueba de la vista
          MovieGrid: true,
        },
      },
    })
  }

  it('debe mostrar el estado vacío cuando no hay favoritos', () => {
    const wrapper = factory()

    expect(wrapper.text()).toContain('Aún no has guardado nada.')
    const btn = wrapper.findComponent({ name: 'v-btn' })
    expect(btn.exists()).toBe(true)
    expect(btn.props('to')).toBe('/')
  })

  it('debe mostrar el contador (v-chip) con la cantidad correcta de favoritos', async () => {
    const store = useFavoriteStore()
    store.favorites = mockMovies // Cargamos 2 películas

    const wrapper = factory()
    const chip = wrapper.find('.v-chip')

    expect(chip.exists()).toBe(true)
    expect(chip.text()).toBe('2')
  })

  it('debe renderizar MovieGrid con los datos del store si hay favoritos', async () => {
    const store = useFavoriteStore()
    store.favorites = mockMovies

    const wrapper = factory()
    const grid = wrapper.findComponent({ name: 'MovieGrid' })

    expect(grid.exists()).toBe(true)
    // Verificamos que se le pasen los favoritos como prop al componente hijo
    expect(grid.props('movies')).toHaveLength(2)
    expect(grid.props('loading')).toBe(false)
  })

  it('debe actualizar la vista automáticamente si se elimina un favorito', async () => {
    const store = useFavoriteStore()
    store.favorites = [mockMovies[0]] // Empezamos con 1 película

    const wrapper = factory()
    expect(wrapper.findComponent({ name: 'MovieGrid' }).exists()).toBe(true)

    // Simulamos la eliminación desde el store
    store.favorites = []

    // Esperamos a que Vue re-renderice
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Aún no has guardado nada.')
    expect(wrapper.findComponent({ name: 'MovieGrid' }).exists()).toBe(false)
  })
})
