<template>
  <v-app>
    <v-app-bar color="primary" elevation="2">
      <v-app-bar-title
        class="cursor-pointer"
        @click="$router.push({ name: 'Home' })"
      >
        <v-icon icon="mdi-movie-open-play" start />
        MovieDB Pro
      </v-app-bar-title>

      <v-spacer />

      <v-btn icon="mdi-heart" to="/favorites" />
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <!-- Aquí se inyectan HomeView o MovieDetailView -->
      <router-view v-slot="{ Component }">
        <v-fade-transition mode="out-in">
          <component :is="Component" />
        </v-fade-transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<style>
.cursor-pointer {
  cursor: pointer;
}
</style>
