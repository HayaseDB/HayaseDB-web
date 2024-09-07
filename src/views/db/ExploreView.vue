<template>
  <div class="explore-view">
    <AnimeGrid
        filter="date"
        sort="desc"
        :initialPage="1"
    />
  </div>
</template>

<script>
import AnimeGrid from '@/components/db/AnimesGrid.vue';

export default {
  components: {
    AnimeGrid,
  },
};
</script>

<style>
.explore-view {
  margin-top: 80px;
}
</style>
