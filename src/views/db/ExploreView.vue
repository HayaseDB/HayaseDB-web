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
          <div v-if="loading" class="loading-indicator">Loading...</div>
          <div v-if="error" class="error-message">{{ error }}</div>
          <table v-if="!loading && !error" class="key-table">
            <thead>
            <tr>
              <th>Statistic</th>
              <th>Value</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Animes</td>
              <td>{{ stats.totalAnime }}</td>
            </tr>

            <tr>
              <td>Media</td>
              <td>{{ stats.totalMedia }}</td>
            </tr>
            <tr>
              <td>Database Size</td>
              <td>{{ stats.totalDatabaseSize }}</td>
            </tr>
            <tr>
              <td>Total Media Size</td>
              <td>{{ stats.mediaSize }}</td>
            </tr>
            <tr>
              <td>Total Anime Size</td>
              <td>{{ stats.animeSize }}</td>
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
import { fetchDatabaseStats } from "@/services/fetchService";

export default {
  components: {
    AnimeSlider,
  },
  data() {
    return {
      stats: {},
      loading: true,
      error: null,
    };
  },
  async created() {
    try {
      const response = await fetchDatabaseStats();
      this.stats = response.data.databaseInfo;
    } catch (err) {
      this.error = "Failed to load database statistics. Please try again later.";
      console.error("Error fetching stats:", err);
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.explore-container {
  display: flex;
  justify-content: center;
  padding: 20px;
  height: 100%;
  min-height: 100vh;
  box-sizing: border-box;
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
  .explore-container {
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

.loading-indicator {
  text-align: center;
  color: var(--text);
  font-size: var(--text-lg);
}

.error-message {
  color: var(--danger);
  text-align: center;
  font-size: var(--text-base);
}
</style>
