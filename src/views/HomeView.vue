<template>
  <v-container>
    <!-- Cabecera de la página -->
    <v-row class="mb-6 align-center">
      <v-col cols="12" md="8">
        <h1 class="text-h3 font-weight-bold">
          {{ isSearching ? 'Resultados de búsqueda' : 'Tendencias hoy' }}
        </h1>
      </v-col>

      <v-col cols="12" md="4">
        <SearchBar @search="handleSearch" />
      </v-col>
    </v-row>

    <!-- Reutilizamos el Grid que creamos antes -->
    <MovieGrid :loading="loading" :movies="movies" />

    <!-- Botón para cargar más (opcional) -->
    <v-row v-if="movies.length > 0 && !loading" class="mt-8" justify="center">
      <v-btn
        color="primary"
        size="large"
        variant="outlined"
        @click="loadMore"
      >
        Cargar más
      </v-btn>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import type { Movie } from '@/types/movie'
  import { onMounted, ref } from 'vue'
  import MovieGrid from '@/components/MovieGrid.vue'
  import SearchBar from '@/components/SearchBar.vue'
  import { movieService } from '../api/movieService'

  const movies = ref<Movie[]>([])
  const loading = ref(true)
  const isSearching = ref(false)
  const currentPage = ref(1)
  const lastQuery = ref('')

  async function fetchMovies (query = '', page = 1) {
    loading.value = true
    try {
      const response = query
        ? await movieService.searchMovies(query, page)
        : await movieService.getPopular(page)

      if (page === 1) {
        movies.value = response.results
      } else {
        movies.value.push(...response.results)
      }
    } catch (error) {
      console.error('Error al obtener películas:', error)
    } finally {
      loading.value = false
    }
  }

  function handleSearch (query: string) {
    isSearching.value = !!query
    lastQuery.value = query
    currentPage.value = 1
    fetchMovies(query, 1)
  }

  function loadMore () {
    currentPage.value++
    fetchMovies(lastQuery.value, currentPage.value)
  }

  onMounted(() => fetchMovies())
</script>
