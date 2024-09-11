<template>
  <div class="genre-module background-card-child">
    <label class="card-title">Genres</label>
    <div class="tags-container">
      <template v-if="editMode">
        <div class="tag" v-for="(genre, index) in editedGenres" :key="index">
          <input
              v-model="editedGenres[index]"
              class="tag-input"
              @input="updateTags"
              @keyup.enter="updateTags"
              type="text"
          />
          <span class="remove-tag" @click="removeTag(index)"><fontAwesomeIcon :icon="['fa', 'xmark']" /></span>
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
    editMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editedGenres: [...this.genres],
    };
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
    editMode(newMode) {
      if (!newMode) {
        this.editableTitle = '';
      } else {
        this.editableTitle = this.title;
      }
    }
  },
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
