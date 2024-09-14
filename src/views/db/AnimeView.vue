<template>
  <div class="anime-view-container">
    <div class="anime-view">
      <!-- Left Block with Cover Image -->
      <div class="left-block" v-if="currentData">
        <CoverModule :url="currentData.cover?.url || null" :mode="mode" />
      </div>
      
      <!-- Right Block with Anime Details -->
      <div class="right-block" v-if="currentData">
        <div class="info-head">
          <TitleModule
            :title="inputData.title"
            :id="currentData._id || null"
            :mode="mode"
            @update="updateField('title', $event)"
          />
        </div>
        <div class="card-body background-card-xs">
          <GenreModule
            :genres="inputData.genre"
            :mode="mode"
            @update="updateField('genre', $event)"
          />
          
          <LongTextModule
            :value="inputData.description"
            :mode="mode"
            label="Description"
            @update="updateField('description', $event)"
          />
          
          <div class="row">
            <ReleaseDateModule
              :release-date="inputData.releaseDate"
              :mode="mode"
              @update="updateField('releaseDate', $event)"
            />
            <ShortTextModule
              :value="inputData.status"
              :mode="mode"
              label="Status"
              @update="updateField('status', $event)"
            />
            <RatingModule
              :rating="inputData.averageRating"
              :rating-count="inputData.ratingCount"
              :mode="mode"
              :id="currentData._id || null"
              @update="updateField('averageRating', $event)"
            />
          </div>
          <div class="row">
            <ShortTextModule
              :value="inputData.author"
              :mode="mode"
              label="Author"
              @update="updateField('author', $event)"
            />
            <ShortTextModule
              :value="inputData.studio"
              :mode="mode"
              label="Studio"
              @update="updateField('studio', $event)"
            />
          </div>
          <EpisodesModule
            :episodes="inputData.episodes"
            :mode="mode"
            @update="updateField('episodes', $event)"
          />
        </div>

        <!-- Action Buttons -->
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
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { fetchAnime, createAnime as createAnimeService, requestAnimeChange } from '@/services/animeService';
import CoverModule from '@/components/db/anime/CoverModule.vue';
import GenreModule from '@/components/db/anime/GenreModule.vue';
import ShortTextModule from '@/components/db/anime/ShortTextModule.vue';
import ReleaseDateModule from '@/components/db/anime/ReleaseDateModule.vue';
import EpisodesModule from '@/components/db/anime/EpisodesModule.vue';
import TitleModule from '@/components/db/anime/TitleModule.vue';
import LongTextModule from '@/components/db/anime/LongTextModule.vue';
import RatingModule from '@/components/db/anime/RatingModule.vue';

export default {
  name: 'AnimeView',
  components: {
    RatingModule,
    LongTextModule,
    CoverModule,
    GenreModule,
    ReleaseDateModule,
    ShortTextModule,
    EpisodesModule,
    TitleModule
  },
  props: {
    createMode: Boolean,
    editMode: Boolean,
    animeId: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const router = useRouter();
    const currentData = ref(null);
    const inputData = ref({
      title: '',
      genre: [],
      description: '',
      releaseDate: '',
      status: '',
      averageRating: null,
      ratingCount: null,
      author: '',
      studio: '',
      episodes: []
    });
    const internalEditMode = ref(props.editMode);
    const loading = ref(true);

    const mode = computed(() => props.createMode ? 'create' : (props.editMode ? 'edit' : 'read'));

    const getAnime = async () => {
      if (props.animeId && !props.createMode) {
        try {
          loading.value = true;
          currentData.value = await fetchAnime(props.animeId);
          resetInputData();
        } catch (error) {
          console.error('Error fetching anime:', error.message);
          alert('Failed to load anime details');
        } finally {
          loading.value = false;
        }
      } else {
        resetInputData();
      }
    };

    const resetInputData = () => {
      if (props.createMode) {
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
          episodes: []
        };
      } else {
        inputData.value = {
          title: currentData.value?.title || '',
          genre: currentData.value?.genre || [],
          description: currentData.value?.description || '',
          releaseDate: currentData.value?.releaseDate || '',
          status: currentData.value?.status || '',
          averageRating: currentData.value?.averageRating || null,
          ratingCount: currentData.value?.ratingCount || null,
          author: currentData.value?.author || '',
          studio: currentData.value?.studio || '',
          episodes: currentData.value?.episodes || []
        };
      }
    };

    const prepareData = (data) => {
      const preparedData = { ...data };
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
        await requestAnimeChange(props.animeId, dataToSend);
        alert('Changes requested successfully');
        internalEditMode.value = false;
        await router.push(`/anime/${props.animeId}`);
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
      inputData.value[field] = value;
    };

    watch(() => props.editMode, (newVal) => {
      internalEditMode.value = newVal;
      resetInputData();
    });

    watch(() => props.createMode, (newVal) => {
      if (newVal) {
        resetInputData();
      }
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
      updateField,
      mode
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
