<template>
  <div class="episodes-module background-card-child">
    <label class="card-title">Episodes</label>
    <div class="episodes-container">
      {{ episodes }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'EpisodesModule',
  props: {
    episodes: {
      type: [Number, String],
      required: true
    }
  }
};
</script>

<style scoped>
.episodes-container {
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin-top: 5px;
}
</style>
