<template>
  <div class="status-module background-card-child">
    <label class="card-title">Status</label>
    <div v-if="editMode">
      <input v-model="editableStatus" @blur="handleBlur" />
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
    }
  },
  data() {
    return {
      editableStatus: this.status
    };
  },
  methods: {
    handleBlur() {
      this.$emit('update-status', this.editableStatus);
    }
  },
  watch: {
    status(newStatus) {
      this.editableStatus = newStatus;
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
</style>
