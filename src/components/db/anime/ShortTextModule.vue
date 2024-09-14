<template>
  <div class="short-text-module background-card-child">
    <label class="card-title">{{ label }}</label>
    <div v-if="isEditMode || isCreateMode">
      <input @input="emitUpdate" v-model="editableValue" class="input-field" />
    </div>
    <div v-else class="value-container">
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShortTextModule',
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
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
      editableValue: this.value
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
    value(newVal) {
      if (this.isEditMode) {
        this.editableValue = newVal;
      }
    },
    mode(newMode) {
      if (newMode === 'read') {
        this.editableValue = '';
      } else if (newMode === 'edit') {
        this.editableValue = this.value;
      } else if (newMode === 'create') {
        this.editableValue = '';
      }
    }
  },
  methods: {
    emitUpdate() {
      this.$emit('update', this.editableValue);
    }
  },
  mounted() {
    if (this.isCreateMode) {
      this.editableValue = '';
    } else if (this.isEditMode) {
      this.editableValue = this.value;
    }
  }
};
</script>

<style scoped>
.value-container {
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin-top: 5px;
}

.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--accent-200);
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
