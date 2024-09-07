<template>
  <div class="anime-view-container">
    <div class="anime-view">
      <div class="left-block" v-if="anime">
        <CoverImage :url="anime.cover.url" />

      </div>
      <div class="right-block" v-if="anime">
        <div class="background-card-sm">
          <h1>{{ anime.title }}</h1>

        </div>
        <GenreModule :genres="anime.genre"/>
        <p><strong>Release Date:</strong> {{ new Date(anime.releaseDate).toLocaleDateString() }}</p>
        <p><strong>Status:</strong> {{ anime.status || 'N/A' }}</p>
        <p><strong>Studio:</strong> {{ anime.studio || 'N/A' }}</p>
        <p><strong>Author:</strong> {{ anime.author || 'N/A' }}</p>
        <p><strong>Episodes:</strong> {{ anime.episodes.length }}</p>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchAnime } from '@/services/fetchService';
import CoverImage from '@/components/db/anime/CoverModule.vue';
import GenreModule from '@/components/db/anime/GenreModule.vue'
export default {
  name: 'AnimeView',
  components: {
    CoverImage,
    GenreModule
  },
  setup() {
    const route = useRoute();
    const animeId = route.params.id;
    const anime = ref(null);

    const getAnime = async () => {
      try {
        anime.value = await fetchAnime(animeId);
      } catch (error) {
        console.error('Error fetching anime:', error.message);
      }
    };

    onMounted(() => {
      getAnime();
    });

    return {
      anime
    };
  }
};
</script>

<style scoped>
.anime-view-container {
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: var(--background-75);
}

.anime-view {
  margin-bottom: 40px;
  margin-top: 100px;
  max-width: 1100px;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.left-block {
  flex: 1.1;
  width: 100%;
}

.right-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 2.5;
  min-width: min-content;
  height: min-content;
}

@media (max-width: 700px) {
  .anime-view {
    flex-direction: column;
  }

  .anime-view-container {
    padding: 10px;
  }

  .right-block {
    flex: auto;
  }

  .left-block {
    flex: auto;
  }
}
</style>
