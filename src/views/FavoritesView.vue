<template>
  <v-container>
    <v-row class="mb-6">
      <v-col>
        <h1 class="text-h3 font-weight-bold">
          Mis Favoritos
          <v-chip v-if="favoriteStore.favorites.length > 0" class="ms-2">
            {{ favoriteStore.favorites.length }}
          </v-chip>
        </h1>
      </v-col>
    </v-row>

    <!-- Si no hay favoritos, mostramos un estado vacío -->
    <div v-if="favoriteStore.favorites.length === 0" class="text-center py-16">
      <v-icon class="mb-4" color="grey-lighten-2" size="120">mdi-heart-outline</v-icon>
      <h2 class="text-h5 text-grey-darken-1">Aún no has guardado nada.</h2>
      <p class="text-body-1 text-grey mb-6">Tus películas favoritas aparecerán aquí.</p>
      <v-btn color="primary" prepend-icon="mdi-movie" to="/">Ir a la cartelera</v-btn>
    </div>

    <!-- Reutilizamos el Grid pasando los favoritos del Store -->
    <MovieGrid
      v-else
      :loading="false"
      :movies="favoriteStore.favorites"
    />
  </v-container>
</template>

<script setup lang="ts">
  import MovieGrid from '@/components/MovieGrid.vue'
  import { useFavoriteStore } from '@/store/favorites'

  const favoriteStore = useFavoriteStore()
</script>
