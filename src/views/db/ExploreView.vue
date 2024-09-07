<template>
  <div class="explore-container">
    <div class="explore-view">
      <div class="left-block background-card">
        <AnimeSlider
            filter="date"
            sort="desc"
            limit="5"
        />
        <AnimeGrid
            filter="date"
            sort="desc"
            initial-count="20"
        />
      </div>

    </div>
  </div>

</template>

<script>
import AnimeGrid from '@/components/db/AnimesGrid.vue';
import AnimeSlider from "@/components/db/AnimeSlider.vue";

export default {
  components: {
    AnimeSlider,
    AnimeGrid,
  },
};
</script>

<style>

.explore-container {
  display: flex;
  justify-content: center;
}

.explore-view {
  margin-top: 80px;
  max-width: 1000px;
  width: 100%;
}





</style>
