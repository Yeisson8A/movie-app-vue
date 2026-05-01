<template>
  <v-card
    class="mx-auto h-100 d-flex flex-column"
    elevation="4"
    hover
    max-width="344"
    @click="$emit('click', movie.id)"
  >
    <v-img
      class="align-end"
      cover
      height="400px"
      :src="movieService.getImageUrl(movie.poster_path)"
    >
      <v-btn
        class="ma-2"
        :color="store.isFavorite(movie.id) ? 'red' : 'grey-lighten-2'"
        icon
        location="top right"
        position="absolute"
        @click.stop="store.toggleFavorite(movie)"
      >
        <v-icon>{{ store.isFavorite(movie.id) ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
      </v-btn>

      <v-card-title class="text-white bg-black-alpha-50 py-2">
        {{ movie.title }}
      </v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4">
      {{ new Date(movie.release_date).getFullYear() }}
    </v-card-subtitle>

    <v-card-text class="flex-grow-1">
      <div class="d-flex align-center mb-2">
        <v-rating
          color="amber"
          density="compact"
          half-increments
          :model-value="movie.vote_average / 2"
          readonly
          size="small"
        />

        <span class="text-grey ms-2">({{ movie.vote_average.toFixed(1) }})</span>
      </div>

      <p class="text-truncate-3-lines">
        {{ movie.overview || 'Sin descripción disponible.' }}
      </p>
    </v-card-text>

    <v-divider />

    <v-card-actions>
      <v-btn
        color="primary"
        prepend-icon="mdi-information"
        variant="text"
      >
        Detalles
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
  import type { Movie } from '@/types/movie'
  import { useFavoriteStore } from '@/store/favorites'
  import { movieService } from '../api/movieService'

  const store = useFavoriteStore()

  defineProps<{
    movie: Movie
  }>()

  defineEmits(['click'])
</script>

<style scoped>
.text-truncate-3-lines {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.bg-black-alpha-50 {
  background: rgba(0, 0, 0, 0.5);
}
</style>
