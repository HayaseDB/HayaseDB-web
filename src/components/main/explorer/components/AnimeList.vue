<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
  >
    <AnimeCard v-for="anime in animes" :key="anime.id" :anime="anime" />
  </div>
</template>

<script setup lang="ts">
import AnimeCard from "./AnimeCard.vue";

defineProps({
  animes: {
    type: Array,
    required: true,
  },
});
</script>
