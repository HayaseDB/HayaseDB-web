<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Search & Filter</h2>

    <form @submit.prevent="applyFilters">
      <div class="mb-4">
        <label for="searchTerm" class="block mb-1 text-sm font-medium"
          >Search</label
        >
        <input
          id="searchTerm"
          v-model="filters.searchTerm"
          type="text"
          class="w-full px-3 py-2 border rounded-md"
          placeholder="Search anime titles..."
        />
      </div>

      <div class="mb-4">
        <label for="genre" class="block mb-1 text-sm font-medium">Genre</label>
        <select
          id="genre"
          v-model="filters.genre"
          class="w-full px-3 py-2 border rounded-md"
        >
          <option value="">All Genres</option>
          <option v-for="genre in genres" :key="genre" :value="genre">
            {{ genre }}
          </option>
        </select>
      </div>

      <button
        type="submit"
        class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Apply Filters
      </button>
    </form>
  </div>
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
    activeFilters.genres = filters.genre;
  }

  emit("filter-changed", activeFilters);
};
</script>
