<template>
  <div class="anime-view-container">
    <div class="anime-view">
      <div class="left-block" v-if="anime || createMode">
        <CoverImage :url="currentData?.cover?.url || null" />
      </div>
      <div class="right-block" v-if="anime || createMode">
        <div class="info-head">
          <TitleModule
              :title="currentData?.title || 'New Anime'"
              :id="currentData?._id || null"
              :edit-mode="internalEditMode"
              @update="updateField('title')"
              :create-mode="createMode"
          />
        </div>
        <div class="card-body background-card-xs">
          <GenreModule
              :genres="currentData?.genre || ['N/A']"
              :edit-mode="internalEditMode"
              @update="updateField('genre')"
          />
          <DescriptionModule
              :description="currentData?.description || 'N/A'"
              :edit-mode="internalEditMode"
              @update="updateField('description')"
          />
          <div class="row">
            <ReleaseDateModule
                :release-date="currentData?.releaseDate || 'N/A'"
                :edit-mode="internalEditMode"
                @update="updateField('releaseDate')"
            />
            <StatusModule
                :status="currentData?.status || 'N/A'"
                @update="updateField('status')"
            />
            <RatingModule
                :rating="currentData?.averageRating"
                :rating-count="currentData?.ratingCount"
                :id="currentData?._id || null"
                :edit-mode="internalEditMode"
                @update="updateField('averageRating')"
            />
          </div>
          <div class="row">
            <AuthorModule
                :author="currentData?.author || 'N/A'"
                :edit-mode="internalEditMode"
                @update="updateField('author')"
            />
            <StudioModule
                :studio="currentData?.studio || 'N/A'"
                :edit-mode="internalEditMode"
                @update="updateField('studio')"
            />
          </div>
          <EpisodesModule
              :episodes="currentData?.episodes || 'N/A'"
              :edit-mode="internalEditMode"
              @update="updateField('episodes')"
          />
        </div>

        <div class="action-buttons">
          <button v-if="!createMode && !internalEditMode" @click="enterEditMode">Request Changes</button>
          <button v-if="internalEditMode" @click="saveChanges">Save</button>
          <button v-if="internalEditMode" @click="cancelEdit">Cancel</button>
          <button v-if="createMode" @click="saveChanges">Create Anime</button>
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
import { useRouter } from 'vue-router';
import { fetchAnime, createAnime, requestAnimeChange } from '@/services/animeService';
import CoverImage from '@/components/db/anime/CoverModule.vue';
import GenreModule from '@/components/db/anime/GenreModule.vue';
import StatusModule from '@/components/db/anime/StatusModule.vue';
import StudioModule from '@/components/db/anime/StudioModule.vue';
import AuthorModule from '@/components/db/anime/AuthorModule.vue';
import ReleaseDateModule from '@/components/db/anime/ReleaseDateModule.vue';
import EpisodesModule from '@/components/db/anime/EpisodesModule.vue';
import TitleModule from '@/components/db/anime/TitleModule.vue';
import DescriptionModule from '@/components/db/anime/DescriptionModule.vue';
import RatingModule from '@/components/db/anime/RatingModule.vue';

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
    },
    editMode: {
      type: Boolean,
      default: false
    },
    animeId: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const router = useRouter();
    const anime = ref(null);
    const currentData = ref(null);
    const internalEditMode = ref(props.editMode);
    const loading = ref(true);

    const getAnime = async () => {
      if (props.animeId) {
        try {
          loading.value = true;
          anime.value = await fetchAnime(props.animeId);
          currentData.value = { ...anime.value };
        } catch (error) {
          console.error('Error fetching anime:', error.message);
          alert('Failed to load anime details');
        } finally {
          loading.value = false;
        }
      }
    };

    const saveChanges = async () => {
      try {
        loading.value = true;
        if (props.createMode) {
          await createAnime(currentData.value);
          alert('Anime created successfully');
          await router.push('/anime-list');
        } else {
          await requestAnimeChange(props.animeId, currentData.value);
          alert('Changes requested successfully');
          internalEditMode.value = false;
          await router.push(`/anime/${props.animeId}`);
        }
      } catch (error) {
        console.error('Error saving changes:', error.message);
        alert('Failed to save changes');
      } finally {
        loading.value = false;
      }
    };

    const enterEditMode = () => {
      internalEditMode.value = true;
    };

    const cancelEdit = () => {
      internalEditMode.value = false;
      if (!props.createMode) {
        getAnime();
      }
    };

    const updateTitle = (newTitle) => {
      if (currentData.value) {
        currentData.value.title = newTitle;
      }
    };

    const updateGenres = (newGenres) => {
      if (currentData.value) {
        currentData.value.genre = newGenres;
      }
    };

    const updateDescription = (newDescription) => {
      if (currentData.value) {
        currentData.value.description = newDescription;
      }
    };

    const updateReleaseDate = (newReleaseDate) => {
      if (currentData.value) {
        currentData.value.releaseDate = newReleaseDate;
      }
    };

    const updateStatus = (newStatus) => {
      if (currentData.value) {
        currentData.value.status = newStatus;
      }
    };

    const updateRating = (newRating) => {
      if (currentData.value) {
        currentData.value.averageRating = newRating;
      }
    };

    const updateAuthor = (newAuthor) => {
      if (currentData.value) {
        currentData.value.author = newAuthor;
      }
    };

    const updateStudio = (newStudio) => {
      if (currentData.value) {
        currentData.value.studio = newStudio;
      }
    };

    const updateEpisodes = (newEpisodes) => {
      if (currentData.value) {
        currentData.value.episodes = newEpisodes;
      }
    };

    watch(() => props.editMode, (newVal) => {
      internalEditMode.value = newVal;
    });

    onMounted(() => {
      if (!props.createMode && props.animeId) {
        getAnime();
      }
    });

    return {
      anime,
      currentData,
      internalEditMode,
      saveChanges,
      enterEditMode,
      cancelEdit,
      loading,
      updateTitle,
      updateGenres,
      updateDescription,
      updateReleaseDate,
      updateStatus,
      updateRating,
      updateAuthor,
      updateStudio,
      updateEpisodes
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
  gap: 20px;
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
  gap: 20px;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.row {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.row > div {
  flex: 1;
  min-width: 150px;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.action-buttons button {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.action-buttons button:hover {
  background-color: var(--primary-100);
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

  .action-buttons {
    justify-content: center;
  }
}
</style>
