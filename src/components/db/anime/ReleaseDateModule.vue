<template>
  <div class="releasedate-module background-card-child">
    <label class="card-title">Release</label>
    <div v-if="isEditMode || isCreateMode">
      <input type="date" v-model="editableReleaseDate" @change="emitUpdate" />
    </div>
    <div v-else class="releasedate-container">
      {{ formattedReleaseDate }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReleaseDateModule',
  props: {
    releaseDate: {
      type: String,
      required: true
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
      editableReleaseDate: this.formatReleaseDateForInput(this.releaseDate)
    };
  },
  computed: {
    isEditMode() {
      return this.mode === 'edit';
    },
    isCreateMode() {
      return this.mode === 'create';
    },
    formattedReleaseDate() {
      if (!this.releaseDate) return '';
      const date = new Date(this.releaseDate);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  },
  watch: {
    releaseDate(newVal) {
      if (this.isEditMode) {
        this.editableReleaseDate = this.formatReleaseDateForInput(newVal);
      }
    },
    mode(newMode) {
      if (newMode === 'read') {
        this.editableReleaseDate = '';
      } else if (newMode === 'edit') {
        this.editableReleaseDate = this.formatReleaseDateForInput(this.releaseDate);
      } else if (newMode === 'create') {
        this.editableReleaseDate = '';
      }
    }
  },
  methods: {
    emitUpdate() {
      const date = new Date(this.editableReleaseDate);
      this.$emit('update', date.toISOString());
    },
    formatReleaseDateForInput(dateString) {
      if (!dateString || isNaN(new Date(dateString).getTime())) {
        return '';
      }
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    }
  }
};
</script>


<style scoped>
.releasedate-container {
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin-top: 5px;
}

input[type="date"] {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--accent-200);
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  color: var(--text);
  background-color: var(--background-50);
}

input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(50%);
}
</style>
