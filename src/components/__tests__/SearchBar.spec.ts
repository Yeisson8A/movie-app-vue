import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// @ts-ignore
import SearchBar from '../SearchBar.vue'

const vuetify = createVuetify({ components, directives })

describe('SearchBar.vue', () => {
  beforeEach(() => {
    // Activamos los cronómetros falsos antes de cada test
    vi.useFakeTimers()
  })

  afterEach(() => {
    // Restauramos los cronómetros reales
    vi.useRealTimers()
  })

  const factory = () => {
    return mount(SearchBar, {
      global: {
        plugins: [vuetify],
      },
    })
  }

  it('debe actualizar el valor interno cuando el usuario escribe', async () => {
    const wrapper = factory()
    const input = wrapper.find('input')

    await input.setValue('Inception')

    // Accedemos a la instancia de script setup para verificar el ref
    expect((wrapper.vm as any).searchTerm).toBe('Inception')
  })

  it('no debe emitir el evento "search" inmediatamente (debounce)', async () => {
    const wrapper = factory()
    const input = wrapper.find('input')

    await input.setValue('Matrix')

    // Verificamos que aún no se haya emitido nada
    expect(wrapper.emitted('search')).toBeUndefined()
  })

  it('debe emitir el evento "search" después de 500ms', async () => {
    const wrapper = factory()
    const input = wrapper.find('input')

    await input.setValue('Matrix')

    // Adelantamos el tiempo 500ms
    vi.advanceTimersByTime(500)

    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')![0]).toEqual(['Matrix'])
  })

  it('debe reiniciar el temporizador si el usuario sigue escribiendo', async () => {
    const wrapper = factory()
    const input = wrapper.find('input')

    await input.setValue('Mat')
    vi.advanceTimersByTime(300) // No ha llegado a 500

    await input.setValue('Matrix')
    vi.advanceTimersByTime(300) // Total 600, pero solo 300 desde el último cambio

    // No debería haberse emitido aún porque el segundo input reinició el timer
    expect(wrapper.emitted('search')).toBeUndefined()

    vi.advanceTimersByTime(200) // Ahora sí llega a los 500ms del último cambio
    expect(wrapper.emitted('search')![0]).toEqual(['Matrix'])
  })

  it('debe emitir un string vacío cuando se limpia el buscador', async () => {
    const wrapper = factory()

    // Buscamos el método onClear o simulamos el evento del componente
    await wrapper.vm.onClear()

    expect(wrapper.emitted('search')![0]).toEqual([''])
  })
})
