<template>
  <v-text-field
    v-model="searchTerm"
    clearable
    flat
    hide-details
    label="Buscar películas..."
    prepend-inner-icon="mdi-magnify"
    variant="solo-filled"
    @click:clear="onClear"
    @update:model-value="onInput"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const searchTerm = ref('')
  const emit = defineEmits(['search'])

  let debounceTimer: ReturnType<typeof setTimeout>

  function onInput (value: string) {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      emit('search', value)
    }, 500) // Espera 500ms antes de emitir
  }

  function onClear () {
    emit('search', '')
  }
</script>
