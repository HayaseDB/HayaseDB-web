<template>
  <div class="anime-view-container">
    <div class="anime-view">
      <div class="left-block" v-if="currentData || createMode">
        <CoverImage :url="currentData?.cover?.url || null" />
      </div>
      <div class="right-block" v-if="currentData || createMode">
        <div class="info-head">
          <TitleModule
              :title="currentData?.title"
              :id="currentData?._id || null"
              :edit-mode="internalEditMode"
              @update="updateField('title', $event)"
              :create-mode="createMode"
          />
        </div>
        <div class="card-body background-card-xs">
          <GenreModule
              :genres="currentData?.genre || []"
              :edit-mode="internalEditMode"
              :create-mode="createMode"
              @update="updateField('genre', $event)"
          />
          <DescriptionModule
              :description="currentData?.description || ''"
              :edit-mode="internalEditMode"
              :create-mode="createMode"
              @update="updateField('description', $event)"
          />
          <div class="row">
            <ReleaseDateModule
                :release-date="currentData?.releaseDate || ''"
                :edit-mode="internalEditMode"
                :create-mode="createMode"
                @update="updateField('releaseDate', $event)"
            />
            <StatusModule
                :status="currentData?.status || ''"
                :edit-mode="internalEditMode"
                :create-mode="createMode"
                @update="updateField('status', $event)"
            />
            <RatingModule
                :rating="currentData?.averageRating"
                :rating-count="currentData?.ratingCount"
                :id="currentData?._id || null"
                :edit-mode="internalEditMode"
                :create-mode="createMode"
                @update="updateField('averageRating', $event)"
            />
          </div>
          <div class="row">
            <AuthorModule
                :author="currentData?.author || ''"
                :edit-mode="internalEditMode"
                :create-mode="createMode"
                @update="updateField('author', $event)"
            />
            <StudioModule
                :studio="currentData?.studio || ''"
                :edit-mode="internalEditMode"
                :create-mode="createMode"
                @update="updateField('studio', $event)"
            />
          </div>
          <EpisodesModule
              :episodes="currentData?.episodes || ''"
              :edit-mode="internalEditMode"
              :create-mode="createMode"
              @update="updateField('episodes', $event)"
          />
        </div>

        <div class="action-buttons">
          <button class="btn-primary" v-if="!createMode && !internalEditMode" @click="enterEditMode">Request Changes</button>
          <button class="btn-secondary" v-if="internalEditMode && !createMode" @click="saveChanges">Save</button>
          <button class="btn-danger" v-if="internalEditMode && !createMode" @click="cancelEdit">Cancel</button>
          <button class="btn-warning" v-if="createMode" @click="createAnime">Create Anime</button>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, onMounted, watch} from 'vue';
import {useRouter} from 'vue-router';
import {fetchAnime, createAnime as createAnimeService, requestAnimeChange} from '@/services/animeService';
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
    const inputData = ref({});
    const internalEditMode = ref(props.editMode);
    const loading = ref(true);

    const getAnime = async () => {
      if (props.animeId && !props.createMode) {
        try {
          loading.value = true;
          currentData.value = await fetchAnime(props.animeId);
          inputData.value = {...currentData.value};
        } catch (error) {
          console.error('Error fetching anime:', error.message);
          alert('Failed to load anime details');
        } finally {
          loading.value = false;
        }
      } else {
        inputData.value = {
          title: '',
          genre: [],
          description: '',
          releaseDate: '',
          status: '',
          averageRating: null,
          ratingCount: null,
          author: '',
          studio: '',
          episodes: ''
        };
      }
    };

    const prepareData = (data) => {
      const preparedData = {...data};

      if (!preparedData.releaseDate) {
        delete preparedData.releaseDate;
      }

      return preparedData;
    };

    const validateFields = () => {
      if (props.createMode && !inputData.value.title) {
        alert('Title is required for creating a new anime.');
        return false;
      }
      return true;
    };

    const saveChanges = async () => {
      if (!validateFields()) return;

      try {
        loading.value = true;
        const dataToSend = prepareData(inputData.value);

        if (props.createMode) {
          await createAnimeService(dataToSend);
          alert('Anime created successfully');
          await router.push('/explore');
        } else {
          await requestAnimeChange(props.animeId, dataToSend);
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

    const createAnime = async () => {
      if (!validateFields()) return;

      try {
        loading.value = true;
        const dataToSend = prepareData(inputData.value);
        await createAnimeService(dataToSend);
        alert('Anime created successfully');
        await router.push('/explore');
      } catch (error) {
        console.error('Error creating anime:', error.message);
        alert('Failed to create anime');
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

    watch(() => props.createMode, (newVal) => {
      internalEditMode.value = newVal;
    });

    onMounted(() => {
      getAnime();
    });

    return {
      currentData,
      inputData,
      internalEditMode,
      saveChanges,
      createAnime,
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
  min-width: 200px;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
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
