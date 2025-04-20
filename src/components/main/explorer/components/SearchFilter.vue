<template>
  <h2 class="text-2xl font-semibold text-gray-800 mb-4">Search & Filter</h2>

  <form @submit.prevent="applyFilters">
    <div class="space-y-4">
      <div>
        <label
          for="searchTerm"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Search</label
        >
        <input
          id="searchTerm"
          v-model="filters.searchTerm"
          type="text"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Search anime titles..."
        />
      </div>

      <div>
        <label for="genre" class="block text-sm font-medium text-gray-700 mb-1"
          >Genre</label
        >
        <select
          id="genre"
          v-model="filters.genre"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">All Genres</option>
          <option v-for="genre in genres" :key="genre" :value="genre">
            {{ genre }}
          </option>
        </select>
      </div>

      <div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          Apply Filters
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const emit = defineEmits(["filter-changed"]);

const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Thriller",
];

const filters = reactive({
  searchTerm: "",
  genre: "",
});

const applyFilters = () => {
  const activeFilters: Record<string, any> = {};

  if (filters.searchTerm) {
    activeFilters.title = filters.searchTerm;
  }

  if (filters.genre) {
    activeFilters.genres = Array.isArray(filters.genre)
      ? filters.genre
      : [filters.genre];
  }

  emit("filter-changed", activeFilters);
};
</script>
