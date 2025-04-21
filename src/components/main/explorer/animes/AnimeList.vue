<template>
  <div class="w-full">
    <div v-if="!animes.length && !loading" class="bg-white border border-gray-200 rounded-xl p-8 text-center">
      <p class="text-gray-600">No anime found. Try adjusting your filters.</p>
    </div>

    <div v-else-if="animes.length" class="bg-white border border-gray-200 rounded-xl p-4">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div v-for="anime in animes" :key="anime.id">
          <AnimeCard :anime="anime" />
        </div>
      </div>
    </div>

    <div v-if="loading" class="mt-6 flex justify-center">
      <div class="flex items-center gap-2">
        <div class="h-4 w-4 rounded-full bg-indigo-600 opacity-75 animate-ping"></div>
        <span class="text-indigo-600 font-medium">Loading...</span>
      </div>
    </div>

    <div ref="observerTarget" class="h-4 mt-2"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import AnimeCard from '../components/AnimeCard.vue'

const props = defineProps({
  animes: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['load-more'])
const observerTarget = ref(null)
let observer = null

const createObserver = () => {
  if (observer) observer.disconnect()

  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !props.loading) {
      emit('load-more')
    }
  }, {
    threshold: 0.1,
    rootMargin: '200px'
  })

  if (observerTarget.value) {
    observer.observe(observerTarget.value)
  }
}

onMounted(() => {
  createObserver()
  if (document.documentElement.scrollHeight <= window.innerHeight) {
    emit('load-more')
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

watch(() => props.animes.length, createObserver)
</script>
