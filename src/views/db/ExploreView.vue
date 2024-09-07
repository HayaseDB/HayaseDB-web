<template>
  <div class="explore-container">
    <div class="explore-view">

      <div class="left-block background-card">
        <div class="text-container">
          <h1>Welcome to HayaseDB</h1>
          <p>HayaseDB is a free, open-source anime database providing comprehensive details through a user-friendly web platform and a powerful API for developers.</p>
        </div>
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
        <h2>Database Stats</h2>
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
  padding: 20px;
}

.explore-view {
  margin-bottom: 40px;
  margin-top: 120px;
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
  flex: 1;
  width: 100%;
  height: min-content;
}

@media (max-width: 700px) {
  .explore-view {
    flex-direction: column;
  }
  .explore-container{
    padding: 10px;
  }

  .right-block {
    flex: auto;
  }

  .left-block {
    flex: auto;
  }





}
</style>
