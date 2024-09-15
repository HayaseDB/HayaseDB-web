<template>
  <div class="genre-module background-card-child">
    <label class="card-title">Genres</label>
    <div class="tags-container">
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
      <template v-else>
        <div class="tag" v-for="(genre, index) in genres" :key="index">
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
      type: Array,
      required: true,
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
      editedGenres: [...this.genres],
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
      this.$emit('update', this.editedGenres.filter((genre) => genre.trim() !== ''));
    },
    addTag() {
      this.editedGenres.push('');
    },
    removeTag(index) {
      this.editedGenres.splice(index, 1);
      this.updateTags();
    },
  },
  watch: {
    genres(newGenres) {
      this.editedGenres = [...newGenres];
    },
    mode(newMode) {
      if (newMode === 'read') {
        this.editedGenres = [...this.genres];
      } else if (newMode === 'edit') {
        this.editedGenres = [...this.genres];
      } else if (newMode === 'create') {
        this.editedGenres = [];
      }
    }
  },
  mounted() {
    if (this.isCreateMode) {
      this.editedGenres = [];
    } else if (this.isEditMode) {
      this.editedGenres = [...this.genres];
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
