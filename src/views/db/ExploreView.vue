<template>
  <div class="explore-container">
    <div class="explore-view">
      <div class="left-block background-card">
        <div class="newest">
          <h2>Newest Uploads</h2>
          <AnimeSlider
              filter="date"
              sort="desc"
              limit="20"
          />

        </div>
        <div class="popular">
          <h2>Currently Popular</h2>

          <AnimeSlider
              filter="popular"
              sort="desc"
              limit="20"
          />
        </div>


      </div>
      <div class="right-block background-card">
</div>

      </div>
  </div>

</template>

<script>
import AnimeSlider from "@/components/db/AnimeSlider.vue";

export default {
  components: {
    AnimeSlider,
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
  display: flex;
  flex-direction: row;
  gap: 10px;
}




.left-block {
  flex: 3;
  width: 100%;
}

.right-block {
  flex: 1; /* Adjust this value based on how much space you want */
  width: 100%; /* Optional, makes sure it uses the full flex basis */
}



</style>
