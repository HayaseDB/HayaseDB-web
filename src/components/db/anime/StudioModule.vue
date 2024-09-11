<template>
  <div class="studio-module background-card-child">
    <label class="card-title">Studio</label>
    <div v-if="editMode">
      <input v-model="editableStudio" @blur="handleBlur" />
    </div>
    <div v-else>
      <div class="studio-container">
        {{ studio }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudioModule',
  props: {
    studio: {
      type: String,
      required: true
    },
    editMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editableStudio: this.studio
    };
  },
  methods: {
    handleBlur() {
      this.$emit('update-studio', this.editableStudio);
    }
  },
  watch: {
    studio(newStudio) {
      this.editableStudio = newStudio;
    }
  }
};
</script>


<style scoped>
.studio-container {
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin-top: 5px;
}
</style>
