<template>
  <div class="anime-view-container">
    <div class="anime-view">
      <!-- Left Block with Cover Image -->
      <div class="left-block" v-if="currentData || createMode">
        <CoverModule
            :url="getCoverUrl()"
            :mode="mode"
            @update-cover="handleCoverUpdate"
        />
      </div>

      <div class="right-block" v-if="currentData || createMode">
        <div class="info-head">
          <TitleModule
              :title="mode === 'read' ? currentData?.title : inputData.title"
              :id="mode === 'read' ? this.animeId : null"
              :mode="mode"
              @update="updateField('title', $event)"
          />
        </div>

        <div class="card-body background-card-xs">
          <GenreModule
              :genres="mode === 'read' ? currentData?.genre : inputData.genre"
              :mode="mode"
              @update="updateField('genre', $event)"
          />

          <LongTextModule
              :value="mode === 'read' ? currentData?.description : inputData.description"
              :mode="mode"
              label="Description"
              @update="updateField('description', $event)"
          />

          <div class="row">
            <ReleaseDateModule
                :release-date="mode === 'read' ? currentData?.releaseDate : inputData.releaseDate"
                :mode="mode"
                @update="updateField('releaseDate', $event)"
            />
            <ShortTextModule
                :value="mode === 'read' ? currentData?.status : inputData.status"
                :mode="mode"
                label="Status"
                @update="updateField('status', $event)"
            />
            <RatingModule
                :rating="mode === 'read' ? currentData?.averageRating : inputData.averageRating"
                :rating-count="mode === 'read' ? currentData?.ratingCount : inputData.ratingCount"
                :mode="mode"
                :id="animeId || null"
                @update="updateField('averageRating', $event)"
            />
          </div>

          <div class="row">
            <ShortTextModule
                :value="mode === 'read' ? currentData?.author : inputData.author"
                :mode="mode"
                label="Author"
                @update="updateField('author', $event)"
            />
            <ShortTextModule
                :value="mode === 'read' ? currentData?.studio : inputData.studio"
                :mode="mode"
                label="Studio"
                @update="updateField('studio', $event)"
            />
          </div>

          <EpisodesModule
              :episodes="mode === 'read' ? currentData?.episodes : inputData.episodes"
              :mode="mode"
              @update="updateField('episodes', $event)"
          />
        </div>

        <div class="action-buttons" v-if="isLoggedIn">
          <button class="btn-primary" v-if="!createMode && !editMode" @click="enterEditMode">Request Changes</button>
          <button class="btn-secondary" v-if="!createMode && editMode" @click="saveChanges">Save</button>
          <button class="btn-danger" v-if="!createMode && editMode" @click="cancelEdit">Cancel</button>
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
import {ref, onMounted, computed} from 'vue';
import { useRouter } from 'vue-router';
import { checkToken } from '@/services/authService.js';
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
      genre: {},
      description: '',
      releaseDate: '',
      status: '',
      averageRating: null,
      ratingCount: null,
      author: '',
      studio: '',
      episodes: []
    });
    const coverFile = ref(null);
    const loading = ref(true);
    const isLoggedIn = ref(false);

    const mode = computed(() => props.createMode ? 'create' : props.editMode ? 'edit' : 'read');

    const getAnime = async () => {
      if (props.animeId && !props.createMode) {
        try {
          const response = await fetchAnime(props.animeId);
          if (response.success) {
            currentData.value = response.data.anime.details;
            currentData.value.cover = response.data.anime.media.coverImage;
            inputData.value = { ...currentData.value }; // Initialize input data with fetched values
          } else {
            console.error('Error fetching anime:', response.message);
          }
        } catch (error) {
          console.error('Error fetching anime:', error.message);
        } finally {
          loading.value = false;
        }
      } else {
        loading.value = false;
      }
    };

    const checkUserLoggedIn = async () => {
      isLoggedIn.value = await checkToken();
    };

    const saveChanges = async () => {
      if (!inputData.value.title) {
        alert('Title is required.');
        return;
      }

      const formData = new FormData();

      Object.entries(inputData.value).forEach(([key, value]) => {
        if (key !== 'cover' && value) {
          if (Array.isArray(value)) {
            value.forEach((item) => {
              if (item) formData.append(key, item);
            });
          } else {
            formData.append(key, value);
          }
        }
      });

      if (coverFile.value) {
        formData.append('cover', coverFile.value);
      }

      try {
        await requestAnimeChange(props.animeId, formData);
        alert('Anime updated successfully');
        await router.push(`/anime/${props.animeId}`);
      } catch (error) {
        console.error('Error updating anime:', error.message);
        alert('Failed to update anime');
      }
    };

    const createAnime = async () => {
      if (!inputData.value.title) {
        alert('Title is required.');
        return;
      }

      const formData = new FormData();
      Object.entries(inputData.value).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item) formData.append(key, item);
          });
        } else if (value) {
          formData.append(key, value);
        }
      });

      if (coverFile.value) formData.append('cover', coverFile.value);

      try {
        await createAnimeService(formData);
        alert('Anime created successfully');
        await router.push('/explore');
      } catch (error) {
        console.error('Error creating anime:', error.message);
        alert('Failed to create anime');
      }
    };

    const cancelEdit = () => {
      router.push(`/anime/${props.animeId}`);
    };

    const updateField = (field, value) => {
      inputData.value[field] = value;
    };

    const handleCoverUpdate = (file) => {
      coverFile.value = file;
    };

    const enterEditMode = () => {
      if (props.animeId) {
        router.push(`/anime/${props.animeId}/edit`);
      }
    };

    onMounted(async () => {
      await checkUserLoggedIn();
      await getAnime();
    });

    const getCoverUrl = () => {
      if (mode.value === 'read' || mode.value === 'edit') {
        return currentData.value?.cover?.url || null;
      }
      if (coverFile.value) {
        if (window.URL.createObjectURL) {
          return window.URL.createObjectURL(coverFile.value);
        }
        return null;
      }
      return null;
    };

    return {
      currentData,
      inputData,
      mode,
      loading,
      coverFile,
      isLoggedIn,
      getCoverUrl,
      saveChanges,
      createAnime,
      cancelEdit,
      updateField,
      enterEditMode,
      handleCoverUpdate
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
