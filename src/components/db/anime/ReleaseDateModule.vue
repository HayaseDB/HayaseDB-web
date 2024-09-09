<template>
  <div class="releasedate-module background-card-child">
    <label class="card-title">Release</label>
    <div v-if="editMode">
      <input type="date" v-model="formattedReleaseDate" class="input-field" />
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
    editMode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formattedReleaseDate: {
      get() {
        if (!this.releaseDate) return '';
        return new Date(this.releaseDate).toISOString().split('T')[0];
      },
      set(newValue) {
        this.$emit('update-release-date', newValue);
      }
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

.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
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
