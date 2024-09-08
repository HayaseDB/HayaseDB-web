<template>
  <div class="anime-view-container">
    <div class="anime-view">
      <div class="left-block" v-if="anime">
        <CoverImage :url="anime.cover?.url || null" />
      </div>
      <div class="right-block" v-if="anime">
        <div class="info-head">
          <TitleModule :title="anime.title || 'N/A'" :id="anime._id"/>

        </div>
        <div class="card-body background-card-xs">

          <GenreModule :genres="anime.genre || ['N/A']"/>

          <DescriptionModule :description="anime.description || 'N/A'" />

          <div class="row">
            <ReleaseDateModule :release-date="anime.releaseDate || 'N/A'" />
            <StatusModule :status="anime.status || 'N/A'" />
            <RatingModule :rating="anime.averageRating" :id="anime._id" />
          </div>
          <div class="row">
            <AuthorModule :author="anime.author || 'N/A'" />
            <StudioModule :studio="anime.studio || 'N/A'" />
          </div>

          <EpisodesModule :episodes="anime.episodes || 'N/A'" />
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
import StatusModule from '@/components/db/anime/StatusModule.vue';
import StudioModule from '@/components/db/anime/StudioModule.vue';
import AuthorModule from '@/components/db/anime/AuthorModule.vue';
import ReleaseDateModule from '@/components/db/anime/ReleaseDateModule.vue';
import EpisodesModule from '@/components/db/anime/EpisodesModule.vue';
import TitleModule from '@/components/db/anime/TitleModule.vue';
import DescriptionModule from "@/components/db/anime/DescriptionModule.vue";
import RatingModule from "@/components/db/anime/RatingModule.vue";
export default {
  name: 'AnimeView',
  components: {
    RatingModule,
    DescriptionModule,
    CoverImage,
    GenreModule,
    ReleaseDateModule,
    StatusModule,
    StudioModule,
    AuthorModule,
    EpisodesModule,
    TitleModule
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

.row {
  display: flex;
  gap: 10px;
  width: 100%;
}

.row > div {
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
