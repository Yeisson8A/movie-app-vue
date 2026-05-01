import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

// Usamos Lazy Loading para mejorar la carga inicial de la app
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Cartelera - MovieApp' },
  },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: () => import('@/views/MovieDetailView.vue'),
    props: true, // Permite recibir el ID como prop en el componente
    meta: { title: 'Detalle de Película' },
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('@/views/FavoritesView.vue'),
    meta: { title: 'Mis Favoritos' },
  },
  {
    // Ruta catch-all para 404
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Desplazar al inicio de la página al cambiar de ruta
  scrollBehavior () {
    return { top: 0 }
  },
})

// Guard de navegación para cambiar el título de la pestaña
router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string || 'MovieApp'
  next()
})

export default router
