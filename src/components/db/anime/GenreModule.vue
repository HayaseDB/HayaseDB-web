<template>
  <div class="genre-module background-card-child">
    <label class="card-title">Genres:</label>
    <div class="tags-container">

      <div class="tag" v-for="(genre, index) in genres" :key="index">
        {{ genre }}
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'GenreTags',
  props: {
    genres: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.tags-container{
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin-top: 5px;
}

.tag {

  display: inline-block;
  padding: 5px 10px;
  background-color: var(--secondary-200);
  border-radius: 5px;
  font-size: 0.9em;
  color: var(--text);
  text-transform: capitalize;
}
</style>
