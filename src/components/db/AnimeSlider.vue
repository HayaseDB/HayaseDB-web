<template>
  <swiper
      :navigation="true"
      :slidesPerView="'auto'"
      spaceBetween="10"
      :modules="[Navigation]"
      class="mySwiper"
  >
    <swiper-slide v-for="anime in displayedAnimes" :key="anime.id">
      <div class="slide-item">
        <div class="image-wrapper">
          <img :src="getImageSrc(anime.cover)" :alt="anime.title" />
          <div v-if="!anime.cover" class="placeholder">No Image</div>
        </div>
        <div class="anime-info">
          <h4>{{ anime.title }}</h4>
          <div class="genre-tags">
            <span v-for="(genre, index) in anime.genre" :key="index" class="genre-tag">
              {{ genre }}
            </span>
          </div>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide v-if="loading">
      <div class="loading">Loading...</div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import { fetchAnimes } from '@/services/fetchService';

export default {
  name: 'AnimeSwiper',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    filter: {
      type: String,
      default: 'date',
    },
    sort: {
      type: String,
      default: 'asc',
    },
    limit: {
      type: Number,
      default: 20,
    },

  },
  data() {
    return {
      animes: [],
      page: 1,
      loading: false,
    };
  },
  computed: {
    displayedAnimes() {
      return this.animes.slice(0, this.limit);
    },
  },
  methods: {
    Navigation,
    async fetchAnimesData() {
      if (this.loading) return;

      this.loading = true;
      let fetchedItems = 0;

      try {
        while (fetchedItems < this.limit) {
          const response = await fetchAnimes(this.filter, this.sort, this.page);
          this.animes.push(...response.animes);
          fetchedItems += response.animes.length;
          this.page += 1;

          if (response.animes.length === 0) break;
        }
      } catch (error) {
        console.error('Failed to fetch animes:', error);
      } finally {
        this.loading = false;
      }
    },
    getImageSrc(cover) {
      return cover?.url || '';
    },
  },
  mounted() {
    this.fetchAnimesData();
  },
};
</script>
<style scoped>
.mySwiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  max-width: 140px;
}

.slide-item {
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  height: 270px;
  cursor: pointer;
}

.slide-item:hover img{
  transform: scale(1.05);
}
.slide-item:hover .anime-info {
  filter: grayscale(0%);

}

.slide-item img{
  overflow: hidden;
  transition: transform 0.3s ease;
}

.image-wrapper {
  height: 80%;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.slide-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--background-100);
  color: var(--text-400);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-xl);
  text-align: center;
}

.anime-info {
  background-color: var(--anime-slider-card);

  height: 20%;
  padding: 6px;
  filter: grayscale(50%);
  transition: filter 0.3s ease;
  box-sizing: border-box;
}

.anime-info h4 {
  color: var(--text-800);
  font-size: 15px;
  padding: 0;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.anime-info p {
  color: var(--text-600);
  font-size: 13px;
  overflow: hidden;
  padding: 0;
  margin: 0;
  word-break: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.genre-tags {
  display: flex;
  gap: 4px;
  word-break: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.genre-tag {

  background-color: var(--background-200);
  color: var(--text-600);
  padding: 2px 5px;
  border-radius: var(--border-radius-sm);
  font-size: 10px;
}

.loading {
  text-align: center;
  padding: 16px;
  font-size: var(--text-lg);
  color: var(--text-500);
}
</style>
