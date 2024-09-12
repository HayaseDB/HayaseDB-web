<template>
  <div class="title-module background-card-sm">
    <div v-if="editMode || createMode">
      <input v-model="editableTitle" @input="emitUpdate" />
    </div>
    <div v-else>
      <div class="title-container">
        {{ title }}
      </div>
      <div class="id-container" v-if="id">
        {{ id }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TitleModule',
  props: {
    title: {
      type: String,
      required: true
    },
    id: {
      type: String,
      default: null
    },
    editMode: {
      type: Boolean,
      default: false
    },
    createMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editableTitle: this.title
    };
  },
  methods: {
    emitUpdate() {
      this.$emit('update', this.editableTitle);
    }
  },
  watch: {
    title(newTitle) {
      this.editableTitle = newTitle;
    },
    editMode(newMode) {
      if (!newMode) {
        this.editableTitle = '';
      } else {
        this.editableTitle = this.title;
      }
    },
    createMode(newMode) {
      if (newMode) {
        this.editableTitle = '';
      }
    }
  }
};
</script>

<style scoped>
.title-container {
  font-size: 30px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
}

.id-container {
  font-size: 13px;
  font-weight: 300;
  color: var(--accent-300);
  display: flex;
  flex-direction: row;
}

.title-module {
  padding: 27px;
}

input {
  font-size: 30px;
  font-weight: bold;
  width: 100%;
  padding: 8px;
  border: 1px solid var(--accent-200);
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
