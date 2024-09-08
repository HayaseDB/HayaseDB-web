<template>
  <div class="description-module background-card-child">
    <label class="card-title">Description:</label>
    <div class="description-container">
      {{ description }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'DescriptionModule',
  props: {
    description: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.description-container {
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin-top: 5px;
}
</style>
