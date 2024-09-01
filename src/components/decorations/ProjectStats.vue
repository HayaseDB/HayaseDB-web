<template>
  <section class="project-overview">
    <div class="metrics-container">
      <div class="metric-card" v-if="stats">
        <h3 class="metric-title">Total Users</h3>
        <p class="metric-value">{{ stats.userCount }}</p>
        <p class="metric-description">Number of active users registered on the platform.</p>
      </div>
      <div class="metric-card" v-if="stats">
        <h3 class="metric-title">Total Animes</h3>
        <p class="metric-value">{{ stats.AnimeEntries }}</p>
        <p class="metric-description">Total number of Anime entries in the database.</p>
      </div>
      <div class="metric-card" v-if="stats">
        <h3 class="metric-title">Total Characters</h3>
        <p class="metric-value">{{ stats.CharacterEntries }}</p>
        <p class="metric-description">Total number of Character entries in the database.</p>
      </div>
      <div class="metric-card" v-if="stats">
        <h3 class="metric-title">API Requests</h3>
        <p class="metric-value">{{ stats.RequestsLast30Days }}</p>
        <p class="metric-description">Number of API requests made in the past month.</p>
      </div>
    </div>
    <div v-if="error" class="error-message">{{ error }}</div>
  </section>
</template>

<script>
import { fetchStats } from '@/services/fetchService';

export default {
  name: 'ProjectOverview',
  data() {
    return {
      stats: null,
      error: null,
    };
  },
  methods: {
    async updateStats() {
      try {
        this.stats = await fetchStats();
        this.error = null;
      } catch (error) {
        this.error = error.message || 'Failed to load stats.';
      }
    }
  },
  created() {
    this.updateStats();
    this.interval = setInterval(this.updateStats, 10000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped>
.project-overview {
  background-color: var(--background);
  text-align: center;
  padding: 4em 2em;
}


.metrics-container {
  display: flex;
  justify-content: center;
  gap: 2em;
  flex-wrap: wrap;
}

.metric-card {
  background-color: var(--background-50);
  border: 1px solid var(--background-300);
  border-radius: var(--border-radius-md);
  padding: 2em;
  box-shadow: var(--shadow-md);
  flex: 1;
  max-width: 250px;
  min-width: 200px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.metric-title {
  font-size: var(--text-lg);
  color: var(--text-800);
  margin-bottom: 0.5em;
}

.metric-value {
  font-size: var(--text-3xl);
  font-weight: bold;
  color: var(--primary);
  margin-bottom: 0.5em;
}

.metric-description {
  color: var(--text-600);
  font-size: var(--text-base);
}

.error-message {
  color: red;
  font-size: var(--text-lg);
  margin-top: 1em;
}

@media (max-width: 1110px) {
  .metrics-container {
    gap: 1.5em;
  }

  .metric-card {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .metric-card {
    margin: 0.5em 0;
  }
}
</style>
