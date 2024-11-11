<template>
  <div class="page-container">
    <div class="anime-grid">
      <div
          class="grid-item"
          v-for="anime in animes"
          :key="anime.meta.id"
          @click="goToAnimeDetail(anime.meta.id)"
      >
        <div class="image-wrapper">
          <img :src="anime.anime.media.coverImage?.url" :alt="anime.anime.details.title.value" />
          <div v-if="!anime.anime.media.coverImage" class="placeholder">No Image</div>
        </div>
        <div class="anime-info">
          <h4>{{ anime.anime.details.title.value }}</h4>
          <div class="genre-tags">
            <span v-for="(genre, index) in anime.anime.details.genre.value" :key="index" class="genre-tag">
              {{ genre }}
            </span>
          </div>
        </div>
      </div>
      <div v-if="loading" class="loading">Loading...</div>
    </div>
  </div>
</template>

<script>
import { fetchAnimes } from '@/services/animeService';

export default {
  name: 'AnimeGrid',
  props: {
    filter: {
      type: String,
      default: 'date',
    },
    sort: {
      type: String,
      default: 'desc',
    },
    initialCount: {
      type: Number,
      default: 40,
    },
    pageSize: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      animes: [],
      page: 1,
      loading: false,
      totalCount: 0,
      totalAvailable: Infinity,
    };
  },
  methods: {
    async fetchAndAppendAnimes(page) {
      if (this.totalCount >= this.totalAvailable) {
        return;
      }

      this.loading = true;

      try {
        // Pass filter (which corresponds to page), sort (limit), order, and detailed as params
        const response = await fetchAnimes(page, this.pageSize, this.sort, true);  // true for 'detailed'

        const newAnimes = response.data.animes;

        if (newAnimes.length > 0) {
          this.animes.push(...newAnimes);
          this.totalCount += newAnimes.length;

          if (typeof response.data.total !== 'undefined') {
            this.totalAvailable = response.data.total;
          }

          this.page += 1;

          if (this.totalCount < this.initialCount && this.totalCount < this.totalAvailable) {
            await this.fetchAndAppendAnimes(this.page);
          }
        }
      } catch (error) {
        console.error('Failed to load animes:', error);
      } finally {
        this.loading = false;
      }
    },
    handleScroll() {
      const {scrollTop, scrollHeight} = document.documentElement;
      const clientHeight = window.innerHeight;
      if (scrollHeight - scrollTop - clientHeight < 100 && !this.loading) {
        this.fetchAndAppendAnimes(this.page);
      }
    },
    goToAnimeDetail(id) {
      this.$router.push(`/anime/${id}`);
    },
  },
  mounted() {
    this.fetchAndAppendAnimes(this.page);
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  padding: 16px;
  margin: 0;
  overflow-y: auto;
}

.anime-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
}

.grid-item {
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  height: 270px;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.image-wrapper {
  height: 80%;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.grid-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.grid-item:hover img {
  transform: scale(1.05);
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
  background-color: var(--background-card-slider-tag);
  color: var(--text-600);
  padding: 2px 5px;
  border-radius: var(--border-radius-sm);
  font-size: 10px;
}

.grid-item:hover .anime-info {
  filter: grayscale(0%);
}

.loading {
  text-align: center;
  padding: 16px;
  font-size: var(--text-lg);
  color: var(--text-500);
}
</style>
