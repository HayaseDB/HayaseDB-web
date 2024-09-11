<template>
  <div class="author-module background-card-child">
    <label class="card-title">Author</label>
    <div v-if="editMode">
      <input  @input="emitUpdate" v-model="editableAuthor" class="input-field" />
    </div>
    <div v-else class="author-container">
      {{ author }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthorModule',
  props: {
    author: {
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
      editableAuthor: this.author
    };
  },
  watch: {
    author(newVal) {
      this.editableAuthor = newVal;
    },
    editMode(newMode) {
      if (!newMode) {
        this.editableTitle = '';
      } else {
        this.editableTitle = this.title;
      }
    }
  },
  methods: {
    emitUpdate() {
      this.$emit('update', this.editableAuthor);
    }
  }
};
</script>
<style scoped>
.author-container {
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
}
</style>
