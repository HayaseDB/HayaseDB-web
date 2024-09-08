<template>
  <div class="studio-module background-card-child">
    <label class="card-title">Studio:</label>
    <div class="studio-container">
      {{ studio }}
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
    }
  }
};
</script>

<style>
.studio-container {
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin-top: 5px;
}
</style>
