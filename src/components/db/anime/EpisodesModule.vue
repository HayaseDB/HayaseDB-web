<template>
  <div class="episodes-module background-card-child">
    <label class="card-title">Episodes</label>
    <div class="table-container">
      <table class="episodes-table">
        <thead>
        <tr>
          <th>Episode Number</th>
          <th>Title</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="episode in episodes" :key="episode.number">
          <td>{{ episode.number }}</td>
          <td>{{ episode.title }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EpisodesModule',
  props: {
    episodes: {
      type: Array,
      default: () => []
    }
  }
};
</script>


<style scoped>

.card-title {
  font-weight: bold;
}

.table-container {
  width: 100%;
  margin-top: 10px;
}

.episodes-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
}

.episodes-table th, .episodes-table td {
  padding: 0.6em;
  text-align: left;
  border-bottom: 1px solid var(--background-300);
  font-size: 0.875em;
}

.episodes-table th {
  background-color: var(--background-200);
  font-size: 0.9em;
}

.episodes-table td {
  white-space: normal;
  word-wrap: break-word;
}

.episodes-table tr:nth-child(even) {
  background-color: var(--background-50);
}
</style>
