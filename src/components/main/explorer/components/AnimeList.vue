<template>
  <div class="w-full flex flex-col items-center">
    <div v-if="animes.length > 0" class="my-4 w-full relative">
      <button
        v-if="animes.length > 1"
        @click="swiperInstance?.slidePrev()"
        class="absolute hover:cursor-pointer -left-4 top-1/2 bg-white border border-gray-200 rounded-lg p-1 -translate-y-1/2 z-10"
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
        v-if="animes.length > 1 && !atEnd"
        @click="swiperInstance?.slideNext()"
        class="absolute hover:cursor-pointer -right-4 top-1/2 bg-white border border-gray-200 rounded-lg p-1 -translate-y-1/2 z-10"
        aria-label="Next slide"
      >
        <ChevronRight class="w-8 h-8 text-gray-500" />
      </button>

      <router-link
        v-else-if="animes.length > 1 && atEnd"
        to="/animes"
        class="absolute hover:cursor-pointer -right-4 top-1/2 bg-white border border-gray-200 rounded-lg px-3 py-1 -translate-y-1/2 z-10 text-sm font-lg text-gray-700"
      >
        Show More
      </router-link>
    </div>

    <div v-else class="text-center p-8 rounded-lg my-4 w-full">
      <p>
        No anime found. Please try adjusting your filters or check back later.
      </p>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref, watch } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation as SwiperNavigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import AnimeCard from "./AnimeCard.vue";

const props = defineProps({
  animes: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const swiperInstance = ref(null);
const atEnd = ref(false);

const setSwiperInstance = (swiper) => {
  swiperInstance.value = swiper;
};

const onReachEnd = () => {
  atEnd.value = true;
};

const onFromEdge = () => {
  atEnd.value = false;
};

watch(
  () => props.animes,
  () => {
    nextTick(() => {
      if (swiperInstance.value) {
        const swiper = swiperInstance.value;
        swiper.slideTo(0);
        if (!swiper.isEnd) {
          atEnd.value = false;
        }
      }
    });
  },
);
</script>
