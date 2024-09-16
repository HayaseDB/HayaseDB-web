<template>
  <section class="plans-overview">
    <div class="section-head">
      <h1 class="section-title">Our Plans</h1>
      <h2 class="section-subtitle">Choose the perfect plan for your needs</h2>
    </div>

    <div class="plans-container">
      <div class="plan-card plan-card-free smooth-slide-in-bottom">
        <div class="plan-card-top">
          <h3 class="plan-title">Free Plan</h3>
          <p class="plan-description">Perfect for getting started at no cost. Includes basic features and limited support.</p>
        </div>
        <div class="plan-features">
          <ul>
            <li><font-awesome-icon :icon="['fa', 'circle-check']" class="checkmark" /> Basic Features</li>
            <li><font-awesome-icon :icon="['fa', 'circle-xmark']" class="cross" /> Priority Support</li>
            <li><font-awesome-icon :icon="['fa', 'circle-xmark']" class="cross" /> Advanced Analytics</li>
          </ul>
        </div>
        <div class="plan-card-bottom">
          <span class="plan-price">FREE</span>
          <button class="btn-primary">Register</button>
        </div>
      </div>

      <div class="plan-card plan-card-highlight smooth-slide-in-top">
        <div class="plan-card-top">
          <h3 class="plan-title">Basic Plan</h3>
          <p class="plan-description">Ideal for individuals looking for more features. Includes standard support.</p>
        </div>
        <div class="plan-features">
          <ul>
            <li><font-awesome-icon :icon="['fa', 'circle-check']" class="checkmark" /> Basic Features</li>
            <li><font-awesome-icon :icon="['fa', 'circle-check']" class="checkmark" /> Priority Support</li>
            <li><font-awesome-icon :icon="['fa', 'circle-xmark']" class="cross" /> Advanced Analytics</li>
          </ul>
        </div>
        <div class="plan-card-bottom">
          <span class="plan-price">€1/month</span>
          <button class="btn-primary">Select</button>
        </div>
      </div>

      <div class="plan-card plan-card-basic smooth-slide-in-bottom">
        <div class="plan-card-top">
          <h3 class="plan-title">Pro Plan</h3>
          <p class="plan-description">For professionals who need advanced features and priority support.</p>
        </div>
        <div class="plan-features">
          <ul>
            <li><font-awesome-icon :icon="['fa', 'circle-check']" class="checkmark" /> Basic Features</li>
            <li><font-awesome-icon :icon="['fa', 'circle-check']" class="checkmark" /> Priority Support</li>
            <li><font-awesome-icon :icon="['fa', 'circle-check']" class="checkmark" /> Advanced Analytics</li>
          </ul>
        </div>
        <div class="plan-card-bottom">
          <span class="plan-price">€5/month</span>
          <button class="btn-primary">Select</button>
        </div>
      </div>
    </div>
    <img src="../../assets/nagatoro_presents.png" alt="" class="section-image">
  </section>
</template>

<script>
export default {
  name: 'PlansOverview',
};
</script>

<style scoped>
.plans-overview {
  background-color: var(--background);
  text-align: center;
  margin: 0 auto;
  padding: 5em 2em 7em;
  position: relative;
}

.section-subtitle {
  font-size: var(--text-lg);
  color: var(--text-800);
  font-weight: 300;
}

.section-title {
  font-size: 40px;
  font-weight: 500;
  color: var(--text);
  padding-bottom: 0;
}

.section-head {
  margin-bottom: 4em;
}

.plans-container {
  display: flex;
  justify-content: center;
  gap: 3em;
  flex-wrap: wrap;
}

.plan-card {
  background-color: var(--background-50);
  border: 1px solid var(--background-300);
  border-radius: var(--border-radius-md);
  padding: 1.5em;
  box-shadow: var(--shadow-md);
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  max-width: 300px;
  min-width: 250px;
  text-align: left;
  margin: 0.5em;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.plan-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

.plan-card-free {
  background-color: var(--background-75);
  border-color: var(--background-400);
}

.plan-card-basic {
  background-color: var(--background-75);
  border-color: var(--background-300);
}

.plan-card-highlight {
  background-color: var(--primary-100);
  border-color: var(--primary);
  box-shadow: var(--shadow-lg);
}

.plan-title {
  font-size: var(--text-lg);
  color: var(--text-800);
  margin-bottom: 0.5em;
  padding-top: 5px;
}

.section-image {
  position: absolute;
  bottom: 0;
  right: 7%;
  width: 250px;
  height: auto;
}

.plan-description {
  min-height: 90px;
  color: var(--text-600);
  margin-bottom: 1em;
  overflow: hidden;
}

.plan-price {
  display: block;
  font-size: var(--text-xl);
  font-weight: bold;
  color: var(--primary);
  margin-bottom: 1em;
}

.btn-primary {
  background-color: var(--primary-400);
}

.btn-primary:hover {
  background-color: var(--primary-500);
}

.plan-features {
  margin-bottom: 3.5em;
}

.plan-features ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.plan-features li {
  display: flex;
  align-items: center;
  margin-bottom: 0.5em;
}

.checkmark {
  color: var(--primary);
  font-size: 1.2em;
  margin-right: 0.5em;
}

.cross {
  color: var(--danger-50);
  font-size: 1.2em;
  margin-right: 0.5em;
}

@media (max-width: 1500px) {
  .section-image {
    right: 1%;
    width: 240px;
  }
}

@media (max-width: 1110px) {
  .plans-container {
    gap: 1.5em;
  }

  .plan-card {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .plan-card {
    margin: 0.5em 0;
  }
}

@media (max-width: 400px) {
  .plan-card {
    min-width: auto;
  }
}
</style>
