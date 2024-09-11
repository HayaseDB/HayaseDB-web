<template>
  <div class="anime-view-container">
    <div class="anime-view">
      <div class="left-block" v-if="currentData || createMode">
        <CoverImage :url="currentData?.cover?.url || null" />
      </div>
      <div class="right-block" v-if="currentData || createMode">
        <div class="info-head">
          <TitleModule
              :title="currentData?.title || 'New Anime'"
              :id="currentData?._id || null"
              :edit-mode="internalEditMode"
              @update="updateField('title', $event)"
              :create-mode="createMode"
          />
        </div>
        <div class="card-body background-card-xs">
          <GenreModule
              :genres="currentData?.genre || ['N/A']"
              :edit-mode="internalEditMode"
              @update="updateField('genre', $event)"
          />
          <DescriptionModule
              :description="currentData?.description || 'N/A'"
              :edit-mode="internalEditMode"
              @update="updateField('description', $event)"
          />
          <div class="row">
            <ReleaseDateModule
                :release-date="currentData?.releaseDate || 'N/A'"
                :edit-mode="internalEditMode"
                @update="updateField('releaseDate', $event)"
            />
            <StatusModule
                :status="currentData?.status || 'N/A'"
                :edit-mode="internalEditMode"
                @update="updateField('status', $event)"
            />
            <RatingModule
                :rating="currentData?.averageRating"
                :rating-count="currentData?.ratingCount"
                :id="currentData?._id || null"
                :edit-mode="internalEditMode"
                @update="updateField('averageRating', $event)"
            />
          </div>
          <div class="row">
            <AuthorModule
                :author="currentData?.author || 'N/A'"
                :edit-mode="internalEditMode"
                @update="updateField('author', $event)"
            />
            <StudioModule
                :studio="currentData?.studio || 'N/A'"
                :edit-mode="internalEditMode"
                @update="updateField('studio', $event)"
            />
          </div>
          <EpisodesModule
              :episodes="currentData?.episodes || 'N/A'"
              :edit-mode="internalEditMode"
              @update="updateField('episodes', $event)"
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
    const currentData = ref(null);
    const inputData = ref(null);
    const internalEditMode = ref(props.editMode);
    const loading = ref(true);

    const getAnime = async () => {
      if (props.animeId) {
        try {
          loading.value = true;
          currentData.value = await fetchAnime(props.animeId);
          inputData.value = { ...currentData.value };
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
          await createAnime(inputData.value);
          alert('Anime created successfully');
          await router.push('/anime-list');
        } else {
          await requestAnimeChange(props.animeId, inputData.value);
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
      if (props.animeId) {
        router.push(`/anime/${props.animeId}/edit`);
      }
    };

    const cancelEdit = () => {
      internalEditMode.value = false;
      if (props.animeId) {
        router.push(`/anime/${props.animeId}`);
      }
    };

    const updateField = (field, value) => {
      if (inputData.value) {
        inputData.value[field] = value;
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
      currentData,
      inputData,
      internalEditMode,
      saveChanges,
      enterEditMode,
      cancelEdit,
      loading,
      updateField
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
