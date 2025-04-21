<template>
  <div class="max-w-5xl mx-auto py-8 px-4">
    <h1 class="text-2xl font-bold mb-6">Browse Anime</h1>

    <div class="flex flex-col gap-6">
      <div class="p-6 border bg-white border-gray-200 rounded-xl">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <div class="flex items-center">
              <input
                  id="title"
                  type="text"
                  v-model="filters.title"
                  placeholder="Search by title..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                  v-if="filters.title"
                  @click="resetTitleFilter"
                  class="ml-2 p-2 text-sm text-gray-500 hover:text-gray-800"
                  aria-label="Clear title search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Genres</label>
            <div class="flex flex-wrap gap-4">
              <div
                  v-for="(genre, index) in availableGenres"
                  :key="index"
                  class="flex items-center space-x-2"
              >
                <input
                    type="checkbox"
                    :id="`genre-${index}`"
                    :value="genre"
                    v-model="selectedGenres"
                    class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label :for="`genre-${index}`" class="text-sm text-gray-700">{{ genre }}</label>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4 flex flex-col sm:flex-row justify-end gap-2">
          <button
              @click="resetFilters"
              :disabled="loading"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
          >
            Reset All
          </button>

        </div>
      </div>

      <div class="w-full">
        <AnimeList
            :animes="animes"
            :loading="loading"
            @load-more="fetchAnimes"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import AnimeList from '@/components/main/explorer/animes/AnimeList.vue'
import { AnimeService } from '@/services'

const animes = ref([])
const loading = ref(false)
const page = ref(1)
const hasMore = ref(true)
const pageSize = 20

const filters = ref({ title: '' })
const selectedGenres = ref([])

const availableGenres = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy',
  'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life',
  'Sports', 'Thriller'
]

const searchFilters = computed(() => {
  const result = { ...filters.value }
  if (selectedGenres.value.length) {
    result.genres = selectedGenres.value
  }
  return result
})

const searchAnime = () => {
  animes.value = []
  page.value = 1
  hasMore.value = true
  fetchAnimes()
}

const resetFilters = () => {
  filters.value.title = ''
  selectedGenres.value = []
  searchAnime()
}

const resetTitleFilter = () => {
  filters.value.title = ''
  searchAnime()
}

const fetchAnimes = async () => {
  if (loading.value || !hasMore.value) return

  loading.value = true

  try {
    const response = await AnimeService.searchAnimes(searchFilters.value, {
      page: page.value,
      limit: pageSize,
      sortBy: 'createdAt',
      sortOrder: 'DESC',
    })

    const newAnimes = response?.data || []
    hasMore.value = newAnimes.length === pageSize
    animes.value.push(...newAnimes)
    page.value++
  } catch (err) {
    console.error('Fetch error:', err)
  } finally {
    loading.value = false
  }
}

const debounce = (fn, delay) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}

const debouncedSearch = debounce(searchAnime, 500)

watch([filters, selectedGenres], debouncedSearch, { deep: true })

onMounted(fetchAnimes)
</script>
