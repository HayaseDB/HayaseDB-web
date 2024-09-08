<template>
  <div class="cover-image-container background-card-sm">
    <img :src="url" alt="Cover Image" class="cover-image" />
  </div>
</template>

<script>
export default {
  name: 'CoverModule',
  props: {
    url: {
      type: String,
      required: true
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
}

.cover-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: inherit;
}
</style>
