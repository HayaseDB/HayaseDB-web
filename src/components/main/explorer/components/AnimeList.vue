<template>
  <div class="w-full flex flex-col items-center">
    <div v-if="animes.length" class="my-4 w-full relative">
      <button
          v-if="showNavigation && !isFirstSlide"
          @click="swiperInstance?.slidePrev()"
          class="absolute -left-4 top-1/2 p-1 bg-white border border-gray-200 rounded-lg -translate-y-1/2 z-10 hover:cursor-pointer"
          aria-label="Previous slide"
      >
        <ChevronLeft class="w-8 h-8 text-gray-500" />
      </button>

      <Swiper
          :modules="[SwiperNavigation]"
          :loop="false"
          slidesPerView="auto"
          :space-between="5"
          @swiper="setSwiperInstance"
          @reachEnd="onReachEnd"
          @fromEdge="onFromEdge"
      >
        <SwiperSlide
            v-for="anime in animes"
            :key="anime.id"
            class="p-2 !w-auto"
        >
          <AnimeCard :anime="anime" />
        </SwiperSlide>
      </Swiper>

      <button
          v-if="showNavigation && !atEnd"
          @click="swiperInstance?.slideNext()"
          class="absolute -right-4 top-1/2 p-1 bg-white border border-gray-200 rounded-lg -translate-y-1/2 z-10 hover:cursor-pointer"
          aria-label="Next slide"
      >
        <ChevronRight class="w-8 h-8 text-gray-500" />
      </button>

      <router-link
          v-else-if="showNavigation && !isFirstSlide"
          to="/animes"
          class="absolute -right-4 top-1/2 px-3 py-1 bg-white border border-gray-200 rounded-lg -translate-y-1/2 z-10 text-sm font-medium text-gray-700 hover:cursor-pointer"
      >
        Show More
      </router-link>
    </div>

    <div v-else class="text-center p-8 rounded-lg my-4 w-full">
      <p>No anime found. Please try adjusting your filters or check back later.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation as SwiperNavigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import AnimeCard from './AnimeCard.vue';

const props = defineProps({
  animes: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const swiperInstance = ref(null);
const atEnd = ref(false);
const isFirstSlide = ref(false);

const setSwiperInstance = (swiper) => {
  swiperInstance.value = swiper;

  swiper.on('slideChange', () => {
    isFirstSlide.value = swiper.realIndex === 0;
    atEnd.value = swiper.isEnd;
  });

  swiper.on('reachEnd', onReachEnd);
  swiper.on('fromEdge', onFromEdge);
};

const onReachEnd = () => {
  atEnd.value = true;
};

const onFromEdge = () => {
  atEnd.value = false;
};

const showNavigation = computed(() => props.animes.length > 1);

watch(
    () => props.animes,
    () => {
      nextTick(() => {
        if (swiperInstance.value) {
          swiperInstance.value.slideTo(0);
          atEnd.value = swiperInstance.value.isEnd;
        }
      });
    }
);

watch(
    () => swiperInstance.value?.realIndex,
    (newIndex) => {
      isFirstSlide.value = newIndex === 0;
    }
);
</script>
