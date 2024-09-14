<template>
  <div class="title-module background-card-sm">
    <div v-if="isEditMode || isCreateMode">
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
      editableTitle: this.title
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
    title(newTitle) {
      if (this.isEditMode) {
        this.editableTitle = newTitle;
      }
    },
    mode(newMode) {
      if (newMode === 'read') {
        this.editableTitle = '';
      } else if (newMode === 'edit') {
        this.editableTitle = this.title;
      } else if (newMode === 'create') {
        this.editableTitle = '';
      }
    }
  },
  methods: {
    emitUpdate() {
      this.$emit('update', this.editableTitle);
    }
  },
  mounted() {
    if (this.isCreateMode) {
      this.editableTitle = '';
    } else if (this.isEditMode) {
      this.editableTitle = this.title;
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
