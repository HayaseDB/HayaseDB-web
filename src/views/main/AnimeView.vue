<template>
  <div v-if="loading" class="flex justify-center items-center h-64">
    <div class="text-center text-gray-600 text-lg">Loading...</div>
  </div>

  <div v-else-if="error" class="text-center text-red-600 text-lg">
    {{ error }}
  </div>

  <div
    v-else
    class="w-full max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-5"
  >
    <div class="md:col-span-1">
      <AnimeSidebar :anime="anime" />
    </div>

    <div class="md:col-span-3">
      <AnimeBody :anime="anime" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { AnimeService } from "@/services";
import AnimeSidebar from "@/components/main/explorer/anime/AnimeSidebar.vue";
import AnimeBody from "@/components/main/explorer/anime/AnimeBody.vue";

const route = useRoute();
const anime = ref<Record<string, any>>({});
const loading = ref(true);
const error = ref("");

onMounted(async () => {
  const animeId = route.params.id as string;

  try {
    loading.value = true;
    anime.value = await AnimeService.getAnimeById(animeId);
  } catch (err) {
    error.value = "Failed to load anime details.";
    console.error("Error loading anime details:", err);
  } finally {
    loading.value = false;
  }
});
</script>
