<template>
  <div class="cover-image-container background-card-sm">
    <img v-if="url" :src="url" alt="Cover Image" class="cover-image" />
    <div v-else class="cover-placeholder">No Image</div>
  </div>
</template>

<script>
export default {
  name: 'CoverModule',
  props: {
    url: {
      type: String,
      default: null
    }
  }
};
</script>

<style scoped>
.cover-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
  overflow: hidden;
  position: relative;
}

.cover-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: inherit;
}

.cover-placeholder {
  width: 100%;
  height: 450px;
  background-color: var(--background-100);
  color: var(--text-400);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-xl);
  text-align: center;
  border-radius: inherit;
}
</style>
