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
          <AnimeGrid/>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import AnimeGrid from "@/components/db/AnimesGrid.vue";
export default {
  components: {
    AnimeGrid,
  },
  data() {
    return {
      stats: {},
      loading: true,
      error: null,
    };
  },

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



@media (max-width: 700px) {
  .explore-view {
    flex-direction: column;
  }
  .explore-container {
    padding: 10px;
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
