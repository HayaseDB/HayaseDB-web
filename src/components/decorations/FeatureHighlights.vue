<template>
  <section class="feature-highlights">
    <h1 class="section-title">Key Features</h1>
    <div class="features-container">
      <div class="feature-card">
        <img src="/path/to/feature1-icon.png" alt="Feature 1" class="feature-icon" />
        <h3 class="feature-title">Feature One</h3>
        <p class="feature-description">Detailed description of the first feature highlighting its benefits and functionalities.</p>
      </div>
      <div class="feature-card">
        <img src="/path/to/feature2-icon.png" alt="Feature 2" class="feature-icon" />
        <h3 class="feature-title">Feature Two</h3>
        <p class="feature-description">Detailed description of the second feature, explaining its unique value and advantages.</p>
      </div>
      <div class="feature-card">
        <img src="/path/to/feature3-icon.png" alt="Feature 3" class="feature-icon" />
        <h3 class="feature-title">Feature Three</h3>
        <p class="feature-description">In-depth details about the third feature and how it stands out from the rest.</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FeatureHighlights',
};
</script>

<style scoped>
.feature-highlights {
  background-color: var(--background-75);
  padding: 4em 2em;
  text-align: center;
}

.section-title {
  font-size: var(--text-2xl);
  font-weight: bold;
  color: var(--text-800);
  margin-bottom: 1.5em;
}

.features-container {
  display: flex;
  justify-content: center;
  gap: 2em;
  flex-wrap: wrap;
}

.feature-card {
  background-color: var(--background-50);
  border: 1px solid var(--background-300);
  border-radius: var(--border-radius-md);
  padding: 1.5em;
  text-align: center;
  max-width: 300px;
  width: 100%;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.feature-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 1em;
}

.feature-title {
  font-size: var(--text-lg);
  font-weight: bold;
  color: var(--text-800);
  margin-bottom: 0.5em;
}

.feature-description {
  color: var(--text-600);
  font-size: var(--text-base);
}

@media (max-width: 768px) {
  .features-container {
    gap: 1em;
  }

  .feature-card {
    max-width: 100%;
  }
}
</style>
