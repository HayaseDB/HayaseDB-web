<template>
  <div class="author-module background-card-child">
    <label class="card-title">Author</label>
    <div class="author-container">
      {{ author }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthorModule',
  props: {
    author: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.author-container {
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin-top: 5px;
}
</style>
