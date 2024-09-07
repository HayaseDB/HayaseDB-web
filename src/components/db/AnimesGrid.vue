<template>
  <div class="page-container">
    <div class="anime-grid">
      <div class="grid-item" v-for="anime in animes" :key="anime.id">
        <div class="image-wrapper">
          <img :src="getImageSrc(anime.cover)" :alt="anime.title" />
          <div v-if="!anime.cover" class="placeholder">No Image</div>
        </div>
        <div class="anime-info">
          <h4>{{ anime.title }}</h4>
          <p>{{ anime.genre || 'Unknown' }}</p>
        </div>
      </div>
      <div v-if="loading" class="loading">Loading...</div>
    </div>
  </div>
</template>


<script>
import { fetchAnimes } from '@/services/fetchService';

export default {
  name: 'AnimeGrid',
  props: {
    filter: {
      type: String,
      default: 'date',
    },
    sort: {
      type: String,
      default: 'asc',
    },
    initialPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      animes: [],
      page: this.initialPage,
      loading: false,
      hasMore: true,
    };
  },
  methods: {
    async loadMore() {
      if (!this.hasMore || this.loading) return;

      this.loading = true;
      try {
        console.log(this.sort, this.filter, this.page)
        const response = await fetchAnimes(this.filter, this.sort, this.page);
        console.log(response);
        this.animes.push(...response.animes);
        this.page += 1;
        this.hasMore = response.total > this.animes.length;
      } catch (error) {
        console.error('Failed to load more animes:', error);
      } finally {
        this.loading = false;
      }
    },
    handleScroll() {
      const { scrollTop, scrollHeight } = document.documentElement;
      const clientHeight = window.innerHeight;
      if (scrollHeight - scrollTop - clientHeight < 100) {
        this.loadMore();
      }
    },
    getImageSrc(cover) {
      return cover && cover.url ? cover.url : '';
    },
  },
  mounted() {
    this.loadMore();
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
  background-color: var(--background);
}

.anime-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}

.grid-item {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--background-300);
  border-radius: var(--border-radius-lg);
  background: var(--background-50);
  overflow: hidden;
  height: 310px;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.grid-item:hover {
  box-shadow: var(--shadow-md);
  transform: scale(1.02);
}

.image-wrapper {
  flex: 6;
  position: relative;
  width: 100%;
}

.grid-item img {
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
  flex: 1;
  background: var(--background-50);
  padding: 7px;
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

.loading {
  text-align: center;
  padding: 16px;
  font-size: var(--text-lg);
  color: var(--text-500);
}
</style>
