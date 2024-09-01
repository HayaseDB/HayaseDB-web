<template>
  <section class="project-overview">
    <div class="metrics-container">
      <div class="metric-card">
        <h3 class="metric-title">Total Users</h3>
        <p class="metric-value">1,245</p>
        <p class="metric-description">Number of active users registered on the platform.</p>
      </div>
      <div class="metric-card">
        <h3 class="metric-title">Database Entries</h3>
        <p class="metric-value">5,678</p>
        <p class="metric-description">Total number of entries in the database.</p>
      </div>
      <div class="metric-card">
        <h3 class="metric-title">API Requests</h3>
        <p class="metric-value">12,345</p>
        <p class="metric-description">Number of API requests made in the past month.</p>
      </div>
      <div class="metric-card">
        <h3 class="metric-title">Active Projects</h3>
        <p class="metric-value">87</p>
        <p class="metric-description">Number of ongoing projects currently in progress.</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProjectOverview',
};
</script>

<style scoped>
.project-overview {
  background-color: var(--background);
  text-align: center;
  padding: 4em 2em;
}

.section-title {
  font-size: var(--text-2xl);
  font-weight: 400;
  color: var(--text-800);
  margin-bottom: 0.5em;
}

.section-subtitle {
  font-size: var(--text-xl);
  color: var(--text-600);
  margin-bottom: 2em;
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
