<template>
  <v-container>
    <v-row v-if="loading">
      <v-col
        v-for="n in 8"
        :key="n"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <v-skeleton-loader
          height="550"
          type="card, list-item-two-line"
        />
      </v-col>
    </v-row>

    <v-row v-else-if="movies.length > 0">
      <v-col
        v-for="movie in movies"
        :key="movie.id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <MovieCard :movie="movie" @click="handleMovieClick" />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col class="text-center py-10" cols="12">
        <v-icon color="grey" size="64">mdi-movie-search</v-icon>
        <p class="text-h6 text-grey">No se encontraron películas.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import type { Movie } from '@/types/tmdb'
  import { useRouter } from 'vue-router'
  import MovieCard from './MovieCard.vue'

  const { movies, loading } = defineProps<{
    movies: Movie[]
    loading: boolean
  }>()

  const router = useRouter()

  function handleMovieClick (id: number) {
    router.push({ name: 'MovieDetail', params: { id } })
  }
</script>
