<template>
  <div class="episodes-module background-card-child">
    <label class="card-title">Episodes</label>
    <div v-if="isEditMode || isCreateMode">
      <div class="input-container" v-for="(episode, index) in editableEpisodes" :key="index">
        <input
          v-model.number="editableEpisodes[index].number"
          class="input-field"
          placeholder="Episode Number"
          type="number"
          min="0"
        />
        <input
          v-model="editableEpisodes[index].title"
          class="input-field"
          placeholder="Title"
          type="text"
        />
        <button @click="removeEpisode(index)" class="remove-button">Remove</button>
      </div>
      <button @click="addEpisode" class="add-button">Add Episode</button>
    </div>
    <div v-else class="table-container">
      <table class="episodes-table">
        <thead>
        <tr>
          <th>Episode Number</th>
          <th>Title</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="episode in episodes" :key="episode.number">
          <td>{{ episode.number }}</td>
          <td>{{ episode.title }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EpisodesModule',
  props: {
    episodes: {
      type: Array,
      default: () => []
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
      editableEpisodes: []
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
  watch: {
    mode(newMode) {
      if (newMode === 'read') {
        this.editableEpisodes = [];
      } else {
        this.editableEpisodes = this.episodes.map(ep => ({ ...ep }));
      }
    }
  },
  methods: {
    addEpisode() {
      this.editableEpisodes.push({ number: '', title: '' });
    },
    removeEpisode(index) {
      this.editableEpisodes.splice(index, 1);
    },
    emitUpdate() {
      this.$emit('update', this.editableEpisodes);
    }
  },
  mounted() {
    if (this.isEditMode || this.isCreateMode) {
      this.editableEpisodes = this.episodes.map(ep => ({ ...ep }));
    }
  }
};
</script>

<style scoped>
.card-title {
  font-weight: bold;
}

.table-container {
  width: 100%;
  margin-top: 10px;
}

.episodes-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
}

.episodes-table th, .episodes-table td {
  padding: 0.6em;
  text-align: left;
  border-bottom: 1px solid var(--background-300);
  font-size: 0.875em;
}

.episodes-table th {
  background-color: var(--background-200);
  font-size: 0.9em;
}

.episodes-table td {
  white-space: normal;
  word-wrap: break-word;
}

.episodes-table tr:nth-child(even) {
  background-color: var(--background-50);
}

.input-container {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--accent-200);
  border-radius: 4px;
  box-sizing: border-box;
}

.add-button, .remove-button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: auto;
}

.add-button {
  background-color: var(--primary-200);
  color: white;
}

.remove-button {
  background-color: var(--danger);
  color: white;
}
</style>
