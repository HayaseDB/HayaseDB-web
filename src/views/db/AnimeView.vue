<template>
  <div class="anime-view-container">
    <div class="anime-view">
      <div class="left-block" v-if="anime">
        <CoverImage :url="anime.cover.url" />
      </div>
      <div class="right-block" v-if="anime">
        <div class="info-head">
          <div class="background-card-sm">
            <h1>{{ anime.title || 'N/A' }}</h1>
          </div>
        </div>
        <div class="card-body background-card-xs">
          <GenreModule :genres="anime.genre || ['N/A']"/>
          <div class="two-columns">
            <ReleaseDate :release-date="anime.releaseDate || 'N/A'" />
            <ReleaseDate :release-date="anime.releaseDate || 'N/A'" />
          </div>
        </div>
        <div class="anime-details">
          <p><strong>Status:</strong> {{ anime.status || 'N/A' }}</p>
          <p><strong>Studio:</strong> {{ anime.studio || 'N/A' }}</p>
          <p><strong>Author:</strong> {{ anime.author || 'N/A' }}</p>
          <p><strong>Episodes:</strong> {{ anime.episodes?.length || 'N/A' }}</p>
        </div>
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
import GenreModule from '@/components/db/anime/GenreModule.vue';
import ReleaseDate from '@/components/db/anime/ReleaseDateModule.vue';

export default {
  name: 'AnimeView',
  components: {
    CoverImage,
    GenreModule,
    ReleaseDate
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

    onMounted(getAnime);

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
  display: flex;
  flex-direction: row;
  gap: 10px;
  max-width: 1100px;
  width: 100%;
  margin: 100px 0 40px;
}

.left-block {
  flex: 1.1;
}

.right-block {
  flex: 2.5;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: min-content;
}



.card-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.two-columns {
  display: flex;
  gap: 10px;
  width: 100%;
}

.two-columns > div {
  flex: 1;
  min-width: 0;
}

.anime-details p {
  margin: 5px 0;
}

@media (max-width: 700px) {
  .anime-view {
    flex-direction: column;
  }

  .anime-view-container {
    padding: 10px;
  }

  .left-block,
  .right-block {
    flex: auto;
  }
}
</style>
