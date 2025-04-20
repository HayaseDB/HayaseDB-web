<template>
  <router-link :to="`/explorer/anime/${anime.id}`">
    <div
      class="flex flex-col w-50 h-88 bg-white rounded-xl overflow-hidden border border-gray-200 transition-colors group"
    >
      <div class="relative pb-[130%] bg-gray-100 overflow-hidden">
        <img
          v-if="anime?.coverImage?.url"
          :src="anime?.coverImage?.url"
          :alt="anime.title"
          class="absolute top-0 left-0 w-full h-full object-cover transition-transform will-change-transform duration-500 ease-in-out transform group-hover:scale-105"
        />
        <div
          v-else
          class="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-400 text-sm"
        >
          No Image
        </div>
      </div>

      <div class="p-4 flex flex-col flex-grow">
        <router-link
          :to="`/explorer/anime/${anime.id}`"
          class="block text-base font-semibold text-gray-800 truncate mb-3"
        >
          {{ anime.title }}
        </router-link>

        <div class="flex gap-2">
          <span
            v-for="(genre, index) in anime.genres"
            :key="index"
            class="text-xs px-3 py-1 bg-blue-100 text-blue-800 border-blue-200 border-1 rounded-md font-medium whitespace-nowrap"
          >
            {{ genre }}
          </span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
defineProps({
  anime: {
    type: Object,
    required: true,
  },
});
</script>
