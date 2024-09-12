<template>
  <div class="status-module background-card-child">
    <label class="card-title">Status</label>
    <div v-if="editMode">
      <input v-model="editableStatus" @input="emitUpdate" />
    </div>
    <div v-else>
      <div class="status-container">
        {{ status }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatusModule',
  props: {
    status: {
      type: String,
      required: true
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
      editableStatus: this.status
    };
  },
  methods: {
    emitUpdate() {
      this.$emit('update', this.editableStatus);
    }
  },
  watch: {
    status(newStatus) {
      this.editableStatus = newStatus;
    },
    editMode(newMode) {
      if (!newMode) {
        this.editableStatus = '';
      } else {
        this.editableStatus = this.status;
      }
    },
    createMode(newMode) {
      if (newMode) {
        this.editableStatus = '';
      }
    }
  }
};
</script>

<style scoped>
.status-container {
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin-top: 5px;
}
input {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--accent-200);
  border-radius: 4px;
  box-sizing: border-box;
}

</style>
