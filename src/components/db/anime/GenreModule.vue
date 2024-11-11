<template>
  <div class="genre-module background-card-child">
    <label class="card-title">Genres</label>
    <div class="tags-container">
      <!-- Edit or Create Mode -->
      <template v-if="isEditMode || isCreateMode">
        <div class="tag" v-for="(genre, index) in editedGenres" :key="index">
          <input
              v-model="editedGenres[index]"
              class="tag-input"
              @input="updateTags"
              @keyup.enter="updateTags"
              type="text"
          />
          <span class="remove-tag" @click="removeTag(index)">
            <fontAwesomeIcon :icon="['fa', 'xmark']" />
          </span>
        </div>
        <div class="add-tag" @click="addTag">+ Add Genre</div>
      </template>
      <!-- Read Mode -->
      <template v-else>
        <div class="tag" v-for="(genre, index) in genres.value" :key="index">
          {{ genre }}
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GenreTags',
  props: {
    genres: {
      type: Object,  // Adjusted to expect an object
      required: true,
      default: () => {}  // Ensure that the default is an empty object
    },
    mode: {
      type: String,
      required: true,
      validator(value) {
        return ['read', 'edit', 'create'].includes(value);
      }
    }
  },
  data() {
    return {
      // Accessing the genres array from genres.value
      editedGenres: Array.isArray(this.genres.value) ? [...this.genres.value] : [],
    };
  },
  computed: {
    isEditMode() {
      return this.mode === 'edit';
    },
    isCreateMode() {
      return this.mode === 'create';
    }
  },
  methods: {
    updateTags() {
      // Emit the updated genres array to the parent
      this.$emit('update', this.editedGenres.filter((genre) => genre.trim() !== ''));
    },
    addTag() {
      // Add a new empty genre when in create or edit mode
      this.editedGenres.push('');
    },
    removeTag(index) {
      // Remove a genre tag
      this.editedGenres.splice(index, 1);
      this.updateTags();
    }
  },
  watch: {
    genres(newGenres) {
      // Ensure that genres is an array before assigning to editedGenres
      this.editedGenres = Array.isArray(newGenres.value) ? [...newGenres.value] : [];
    },
    mode(newMode) {
      // Update editedGenres based on mode
      if (newMode === 'read') {
        this.editedGenres = Array.isArray(this.genres.value) ? [...this.genres.value] : [];
      } else if (newMode === 'edit') {
        this.editedGenres = Array.isArray(this.genres.value) ? [...this.genres.value] : [];
      } else if (newMode === 'create') {
        this.editedGenres = [];
      }
    }
  },
  mounted() {
    // Initialize editedGenres based on the mode when the component mounts
    if (this.isCreateMode) {
      this.editedGenres = [];
    } else if (this.isEditMode) {
      this.editedGenres = Array.isArray(this.genres.value) ? [...this.genres.value] : [];
    }
  }
};
</script>


<style scoped>
.tags-container {
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin-top: 5px;
  flex-wrap: wrap;
}

.tag {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background-color: var(--secondary-500);
  color: #fff;
  border-radius: 5px;
  font-size: 0.9em;
  text-transform: capitalize;
  white-space: nowrap;
}

.tag-input {
  padding: 5px;
  border: none;
  background-color: var(--secondary-300);
  border-radius: 5px;
  color: #fff;
  font-size: 0.9em;
  line-height: 1.2em;
}

.remove-tag {
  margin-left: 8px;
  cursor: pointer;
  color: #ff4d4d;
  font-size: 0.9em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.add-tag {
  cursor: pointer;
  padding: 5px 10px;
  background-color: var(--primary-500);
  color: #fff;
  border-radius: 5px;
  font-size: 0.9em;
}
</style>
