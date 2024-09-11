<template>
  <div class="studio-module background-card-child">
    <label class="card-title">Studio</label>
    <div v-if="editMode">
      <input v-model="editableStudio" @input="emitUpdate" />
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
    emitUpdate() {
      this.$emit('update', this.editableStudio);
    }
  },
  watch: {
    studio(newStudio) {
      this.editableStudio = newStudio;
    },
    editMode(newMode) {
      if (!newMode) {
        this.editableTitle = '';
      } else {
        this.editableTitle = this.title;
      }
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

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
