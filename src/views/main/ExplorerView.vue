<template>
  <div class="w-full max-w-7xl mx-auto px-4 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div class="lg:col-span-3 space-y-8">
        <div class="bg-white border border-gray-200 rounded-xl p-8">
          <h1 class="text-3xl font-semibold text-gray-800 mb-2">
            Welcome to HayaseDB
          </h1>
          <p class="text-gray-600">
            HayaseDB is a free, open-source anime database providing
            comprehensive details through a user-friendly web platform and a
            powerful API for developers.
          </p>
        </div>

        <div class="bg-white border border-gray-200 rounded-xl p-6">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">
            {{ resultsTitle }}
          </h2>
          <AnimeList :animes="newestAnimes" />
        </div>
      </div>

      <div class="lg:col-span-1 space-y-6">
        <div class="bg-white border border-gray-200 rounded-xl p-6">
          <DatabaseStats :stats="stats" />
        </div>

        <div class="bg-white border border-gray-200 rounded-xl p-6">
          <SearchFilter @filter-changed="handleFilterChange" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import AnimeList from "@/components/main/explorer/components/AnimeList.vue";
import DatabaseStats from "@/components/main/explorer/components/DatabaseStats.vue";
import SearchFilter from "@/components/main/explorer/components/SearchFilter.vue";
import { AnimeService, StatsService } from "@/services";

const newestAnimes = ref([]);
const stats = ref({});

const resultsTitle = ref("Newest Uploads");

const searchParams = ref({
  page: 1,
  limit: 20,
  sortBy: "releaseDate",
  sortOrder: "DESC",
});

const handleFilterChange = async (filters) => {
  if (Object.keys(filters).length === 0) {
    resultsTitle.value = "Newest Uploads";
  } else {
    resultsTitle.value = "Search Results";
  }

  try {
    const results = await AnimeService.searchAnimes(
      filters,
      searchParams.value,
    );
    newestAnimes.value = results.data;
  } catch (error) {
    console.error("Error fetching filtered animes:", error);
  }
};

onMounted(async () => {
  try {
    const newestResults = await AnimeService.searchAnimes(
      {},
      {
        ...searchParams.value,
        page: 1,
        limit: 20,
      },
    );
    newestAnimes.value = newestResults.data;

    const fetchedStats = await StatsService.getStats();
    stats.value = {
      Animes: fetchedStats.totalAnimes,
      Media: fetchedStats.totalMedia,
    };
  } catch (error) {
    console.error("Error during onMounted operations:", error);
  }
});
</script>
