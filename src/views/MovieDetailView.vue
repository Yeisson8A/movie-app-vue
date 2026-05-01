<template>
  <v-container v-if="loading" class="fill-height">
    <v-row align="center" justify="center">
      <v-progress-circular color="primary" indeterminate size="64" />
    </v-row>
  </v-container>

  <div v-else-if="movie">
    <!-- Hero Section con Backdrop -->
    <v-img
      class="align-end text-white"
      cover
      height="500"
      :src="movieService.getImageUrl(movie.backdrop_path, 'original')"
    >
      <template #placeholder>
        <v-row align="center" class="fill-height ma-0" justify="center">
          <v-progress-circular indeterminate />
        </v-row>
      </template>

      <div class="bg-gradient-to-t pa-8">
        <h1 class="text-h2 font-weight-bold">{{ movie.title }}</h1>

        <div class="d-flex align-center mt-2">
          <v-chip class="me-2" color="primary">{{ movie.release_date }}</v-chip>

          <v-chip color="amber" variant="flat">
            <v-icon icon="mdi-star" start />
            {{ movie.vote_average.toFixed(1) }}
          </v-chip>
        </div>
      </div>
    </v-img>

    <v-container class="mt-8">
      <v-row>
        <!-- Poster a la izquierda -->
        <v-col cols="12" md="4">
          <v-img
            elevation="10"
            rounded="lg"
            :src="movieService.getImageUrl(movie.poster_path)"
          />
        </v-col>

        <!-- Información a la derecha -->
        <v-col cols="12" md="8">
          <h2 class="text-h4 mb-4">Sinopsis</h2>

          <p class="text-body-1 mb-6" style="line-height: 1.8;">
            {{ movie.overview || 'No hay descripción disponible para esta película.' }}
          </p>

          <v-divider class="mb-6" />

          <v-btn
            v-if="trailerKey"
            class="mt-4 ms-2"
            color="red-darken-4"
            prepend-icon="mdi-play"
            @click="showTrailer = true"
          >
            Ver Trailer
          </v-btn>

          <!-- Modal del Trailer -->
          <v-dialog v-model="showTrailer" max-width="800">
            <v-card color="black">
              <v-card-title class="d-flex justify-space-between align-center">
                Trailer Oficial
                <v-btn icon="mdi-close" variant="text" @click="showTrailer = false" />
              </v-card-title>

              <v-responsive :aspect-ratio="16/9">
                <iframe
                  allow="autoplay; encrypted-media"
                  allowfullscreen
                  frameborder="0"
                  height="100%"
                  :src="`https://www.youtube.com/embed/${trailerKey}?autoplay=1`"
                  width="100%"
                />
              </v-responsive>
            </v-card>
          </v-dialog>

          <div class="mb-6">
            <h3 class="text-h6 mb-2">Géneros</h3>

            <v-chip-group>
              <v-chip v-for="genre in movie.genres" :key="genre.id">
                {{ genre.name }}
              </v-chip>
            </v-chip-group>
          </div>

          <v-btn
            :color="isFavorite(movie.id) ? 'red' : 'primary'"
            @click="toggleFavorite(movie)"
          >
            {{ isFavorite(movie.id) ? 'En favoritos' : 'Añadir' }}
          </v-btn>

          <v-btn
            color="secondary"
            prepend-icon="mdi-arrow-left"
            variant="outlined"
            @click="$router.back()"
          >
            Volver
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
  import type { MovieDetail } from '@/types/movieDetail'
  import { onMounted, ref } from 'vue'
  import { useFavoriteStore } from '@/store/favorites'
  import { movieService } from '../api/movieService'

  const props = defineProps<{ id: string }>()

  // Desestructuramos lo que usamos en el HTML

  const { isFavorite, toggleFavorite } = useFavoriteStore()

  const movie = ref<MovieDetail | null>(null)
  const loading = ref(true)
  const trailerKey = ref<string | null>(null)
  const showTrailer = ref(false)

  onMounted(async () => {
    try {
      movie.value = await movieService.getMovieDetails(Number(props.id))
      // Buscamos los videos
      const videos = await movieService.getMovieVideos(Number(props.id))
      // Intentamos encontrar el primer video que sea tipo 'Trailer'
      const officialTrailer = videos.find(v => v.type === 'Trailer') || videos[0]
      if (officialTrailer) {
        trailerKey.value = officialTrailer.key
      }
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  })
</script>
