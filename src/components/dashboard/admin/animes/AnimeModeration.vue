<template>
  <div
    class="max-w-7xl mx-auto mt-12 p-4 sm:p-8 bg-white rounded-2xl border border-gray-200 relative"
  >
    <h2 class="text-2xl sm:text-4xl font-semibold text-gray-800 mb-6">
      Anime Moderation
    </h2>

    <div class="flex flex-wrap gap-4 mb-6">
      <input
        v-model="filters.title"
        placeholder="Search by Title"
        class="border px-3 py-2 rounded-md text-sm"
      />
      <input
        v-model="filters.genres"
        placeholder="Filter by Genre (comma separated)"
        class="border px-3 py-2 rounded-md text-sm"
      />
      <input
        v-model="filters.id"
        placeholder="Search by ID"
        class="border px-3 py-2 rounded-md text-sm"
      />
    </div>

    <div
      v-if="!loading && animes.length === 0"
      class="text-center text-gray-500 py-8"
    >
      No anime found.
    </div>

    <div class="overflow-x-auto rounded-xl relative">
      <LoadingOverlay :is-loading="loading" />

      <table
        v-if="animes.length !== 0"
        class="w-full table-auto border-collapse"
      >
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase"
            >
              Poster
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase cursor-pointer select-none relative"
              @click="sortByColumn('title')"
            >
              <span class="mr-2">Title</span>
              <span
                v-if="sortColumn === 'title'"
                class="inline-block absolute right-0 top-1/2 transform -translate-y-1/2"
              >
                <ChevronUp
                  v-if="sortDirection === 'ASC'"
                  class="w-3 h-3 text-gray-600"
                />
                <ChevronDown
                  v-if="sortDirection === 'DESC'"
                  class="w-3 h-3 text-gray-600"
                />
              </span>
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase"
            >
              Status
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase cursor-pointer select-none relative"
              @click="sortByColumn('releaseDate')"
            >
              Release Date
              <span
                v-if="sortColumn === 'releaseDate'"
                class="inline-block absolute right-0 top-1/2 transform -translate-y-1/2"
              >
                <ChevronUp
                  v-if="sortDirection === 'ASC'"
                  class="w-3 h-3 text-gray-600"
                />
                <ChevronDown
                  v-if="sortDirection === 'DESC'"
                  class="w-3 h-3 text-gray-600"
                />
              </span>
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase hidden md:table-cell"
            >
              ID
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr
            v-for="anime in animes"
            :key="anime.id"
            class="hover:bg-gray-50 cursor-pointer"
            @click="goToAnimeDetail(anime.id)"
          >
            <td class="px-4 py-4 text-sm text-gray-800">
              <img
                v-if="anime.coverImage"
                :src="anime.coverImage.url"
                alt="Anime Cover"
                class="w-20 h-35 rounded-md object-cover"
              />
              <span v-else class="text-gray-400">No Cover</span>
            </td>
            <td
              class="px-4 py-4 text-sm font-medium text-gray-800 truncate max-w-xs"
            >
              {{ anime.title || "Untitled" }}
            </td>
            <td class="px-4 py-4 text-sm text-gray-600">
              {{ anime.status || "Unknown" }}
            </td>
            <td
              class="px-4 py-4 text-sm text-gray-500 hidden sm:table-cell whitespace-nowrap"
            >
              {{
                anime.releaseDate
                  ? formatDate(anime.releaseDate)
                  : "No Release Date"
              }}
            </td>
            <td class="px-4 py-4 text-sm text-gray-500 hidden md:table-cell">
              <span class="font-mono text-xs">{{ anime.id }}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        class="flex justify-between items-center mt-6 pt-4 border-t border-gray-200"
      >
        <button
          :disabled="page <= 1 || loading"
          class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium disabled:opacity-50"
          @click="prevPage"
        >
          Prev
        </button>
        <span class="text-sm text-gray-600"
          >Page {{ page }} of {{ totalPages }}</span
        >
        <button
          :disabled="page >= totalPages || loading"
          class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium disabled:opacity-50"
          @click="nextPage"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import LoadingOverlay from "@/components/common/LoadingOverlay.vue";
import { AnimeService } from "@/services/endpoints/anime.service.ts";
import { ChevronUp, ChevronDown } from "lucide-vue-next";
import { useLocalStorage } from "@vueuse/core";

const router = useRouter();
const animes = ref<any[]>([]);
const page = ref(1);
const total = ref(0);
const limit = 20;
const loading = ref(false);

const filters = useLocalStorage("anime-filters", {
  title: "",
  genres: "",
  id: "",
});

const sortColumn = ref("releaseDate");
const sortDirection = ref<"ASC" | "DESC">("DESC");

const sortByColumn = (column: string) => {
  sortColumn.value = column;
  sortDirection.value = sortDirection.value === "ASC" ? "DESC" : "ASC";
  fetchAnimes();
};

const goToAnimeDetail = (id: string) => {
  router.push(`/explorer/animes/${id}`);
};

const fetchAnimes = async () => {
  loading.value = true;
  try {
    const res = await AnimeService.searchAnimes(
      {
        ...(filters.value.title &&
          filters.value.title !== "" && { title: filters.value.title }),
        ...(Array.isArray(filters.value.genres) &&
        filters.value.genres.length > 0
          ? { genres: filters.value.genres.join(",") }
          : filters.value.genres !== ""
            ? { genres: filters.value.genres.split(",") }
            : {}),
        ...(filters.value.id &&
          filters.value.id !== "" && { id: filters.value.id }),
      },
      {
        page: page.value,
        limit,
        sortBy: sortColumn.value,
        sortOrder: sortDirection.value,
      },
    );
    animes.value = res.data ?? [];
    total.value = res.total ?? 0;
  } catch (error) {
    console.error("Failed to fetch animes:", error);
    animes.value = [];
    total.value = 0;
  } finally {
    loading.value = false;
  }
};

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / limit)));

const nextPage = () => {
  if (page.value < totalPages.value) page.value++;
};

const prevPage = () => {
  if (page.value > 1) page.value--;
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

watch([page, filters], fetchAnimes, { deep: true });
onMounted(fetchAnimes);
</script>
