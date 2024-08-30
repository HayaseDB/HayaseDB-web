<template>
  <section class="hero">
    <div class="container">
      <div class="hero-left">
        <div class="hero-text-left">

          <h1>Welcome to <span class="gradient-animation">HayaseDB</span></h1>
        <p>HayaseDB is an open-source anime database designed for fans and developers alike. It offers comprehensive information on anime titles, characters, episode summaries, and more, all in one easy-to-navigate platform.</p>
        </div>

        <div class="hero-buttons">
          <button class="btn-primary">Get Started</button>
          <button class="btn-accent">Learn More</button>
        </div>
      </div>
      <div class="hero-right">
        <img src="../../assets/mascot.png" alt="Mascot" class="mascot-image">
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection'
};
</script>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 40px 0;
  background-color: var(--background-50);
}

.container {
  display: flex;
  max-width: 1050px;
  width: 100%;
  margin: 0 auto;
}

.hero-left {
  flex: 1;
  padding: 20px;
}

.hero-left h1 {
  font-size: var(--text-3xl);
  color: var(--text);
  line-height: var(--text-lg);
}

.hero-left p {
  font-size: var(--text-base);
  color: var(--text-600);
  margin-bottom: 50px;
}

.hero-buttons {
  display: flex;
  gap: 15px;
}

.hero-right {
  flex: 1;
  display: flex;
  justify-content: center;
}

.hero-text-left{
  max-width: 450px;
}

.mascot-image {
  max-width: 30%;
  min-width: 300px;
  height: auto;
  display: block;
}




@media (max-width: 720px) {
  .container {
    flex-direction: column;
    align-items: center;

  }
  .hero-left h1 {
    padding-top: 0;
  }


  .hero-left {
    padding-bottom: 20px;
  }

  .hero-right {
    margin-bottom: 0;
    order: -1;
  }

  .mascot-image {
    max-width: 30%;
    min-width: 170px;
  }
}


</style>
