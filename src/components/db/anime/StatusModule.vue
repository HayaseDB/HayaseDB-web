<template>
  <div class="status-module background-card-child">
    <label class="card-title">Status</label>
    <div class="status-container">
      {{ status }}
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
