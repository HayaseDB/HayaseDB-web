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
        <div class="table-container">
          <table class="key-table">
            <thead>
            <tr>
              <th>Statistic</th>
              <th>Value</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Animes</td>
              <td>{{ stats.AnimeEntries }}</td>
            </tr>
            <tr>
              <td>Characters</td>
              <td>{{ stats.CharacterEntries }}</td>
            </tr>
            <tr>
              <td>Media</td>
              <td>{{ stats.MediaEntries }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>


      </div>
  </div>

</template>

<script>
import AnimeSlider from "@/components/db/AnimeSlider.vue";
import {fetchStats} from "@/services/fetchService";

export default {
  components: {
    AnimeSlider,
  },
  data() {
    return {
      stats: {},


    };
  },
  async created() {
    this.stats = await fetchStats();
    console.log(this.stats);
  }
};
</script>

<style scoped>
.explore-container {
  display: flex;
  justify-content: center;
  padding: 20px;
  height: 100%;
  background-color: var(--background-75);
}

.explore-view {
  margin-bottom: 40px;
  margin-top: 100px;
  max-width: 1100px;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.left-block {
  flex: 2.5;
  width: 100%;
}

.right-block {
  flex: 1;
  min-width: min-content;
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

.right-block .table-container {

  width: 100%;
}

.right-block .key-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
}

.right-block .key-table th, .key-table td {
  padding: 0.6em;
  text-align: left;
  border-bottom: 1px solid var(--background-300);
  font-size: 0.875em;
}

.right-block .key-table th {
  background-color: var(--background-200);
  font-size: 0.9em;
}

.right-block .key-table td {
  white-space: normal;
  word-wrap: break-word;
}

.right-block .key-table tr:nth-child(even) {
  background-color: var(--background-50);
}
</style>
