<template>
  <div class="anime-view-container">
    <div class="anime-view">
      <div class="left-block" v-if="anime || createMode">
        <CoverImage :url="anime?.cover?.url || null" />
      </div>
      <div class="right-block" v-if="anime || createMode">
        <div class="info-head">
          <TitleModule
              :title="anime?.title || 'N/A'"
              :id="anime?._id || null"
              :edit-mode="editMode"
              @update-title="updateTitle"
              :createMode="createMode"
          />
        </div>
        <div class="card-body background-card-xs">
          <GenreModule :genres="anime?.genre || ['N/A']"               :edit-mode="editMode"
          />
          <DescriptionModule :description="anime?.description || 'N/A'"              :edit-mode="editMode"
          />
          <div class="row">
            <ReleaseDateModule :release-date="anime?.releaseDate || 'N/A'"               :edit-mode="editMode"
            />
            <StatusModule :status="anime?.status || 'N/A'" />
            <RatingModule :rating="anime?.averageRating" :ratingCount="anime?.ratingCount" :id="anime?._id || null"               :edit-mode="editMode"
            />
          </div>
          <div class="row">
            <AuthorModule :author="anime?.author || 'N/A'"              :edit-mode="editMode"
            />
            <StudioModule :studio="anime?.studio || 'N/A'"              :edit-mode="editMode"
            />
          </div>
          <EpisodesModule :episodes="anime?.episodes || 'N/A'"              :edit-mode="editMode"
          />
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
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
  props: {
    createMode: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const route = useRoute();
    const animeId = route.params.id;
    const anime = ref(null);
    const editMode = ref(true);

    const getAnime = async () => {
      try {
        if (!props.createMode) {
          anime.value = await fetchAnime(animeId);
        }
      } catch (error) {
        console.error('Error fetching anime:', error.message);
      }
    };

    const updateTitle = (newTitle) => {
      if (anime.value) {
        anime.value.title = newTitle;
      }
    };

    onMounted(() => {
      if (!props.createMode) {
        getAnime();
      }
    });

    watch(() => props.createMode, (newVal) => {
      if (newVal) {
        anime.value = {
          title: '',
          _id: null,
          cover: { url: null },
          genre: [],
          description: '',
          releaseDate: '',
          status: '',
          averageRating: 0,
          ratingCount: 0,
          author: '',
          studio: '',
          episodes: []
        };
        editMode.value = true;
      }
    });

    return {
      anime,
      editMode,
      updateTitle
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
  flex: 1;
}

.right-block {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.row > div {
  flex: 1;
  min-width: 150px;
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
    min-width: 0;
  }
}

</style>
