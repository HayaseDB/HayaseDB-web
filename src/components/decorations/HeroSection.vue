<template>
  <section class="hero">
    <div class="container">
      <div class="hero-left">
        <div class="hero-text-left">

          <h1>
            <div class="slide-in-right welcome-text"><span>Welcome to</span></div>
            <div class="slide-in-left">
              <span class="gradient-animation brand-name-text">HayaseDB</span>
            </div>
          </h1>
          <p>HayaseDB is an <b>open-source anime database</b> designed for fans and developers alike. It offers comprehensive information on anime titles, characters, episode summaries, and more, all in one easy-to-navigate platform.</p>
        </div>

        <div class="hero-buttons">
          <button class="btn-primary hover-rotate">Get Started</button>
          <button class="btn-accent">Learn More</button>
        </div>
      </div>
      <div class="hero-right">
        <div class="hero-image-wrapper">
          <img src="../../assets/mascot.png" alt="Mascot" class="mascot-image">

        </div>
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
  padding: 140px 40px 0;
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
  color: var(--text-800);
  font-weight: 350;
  margin-bottom: 50px;
}

.hero-buttons {
  display: flex;
  gap: 15px;
}

.welcome-text {
  font-weight: 250;
}


.brand-name-text {
  font-weight: 500;
}



.hero-right {
  flex: 1;
  display: flex;
  justify-content: center;
  z-index: 999;
}

.hero-text-left{
  max-width: 450px;
}

.mascot-image {
  max-width: 300px;
  min-width: 200px;
  height: auto;
  display: block;
}


@media (max-width: 720px) {

  .hero-image-wrapper{
    overflow: hidden;
    height: 430px;
    width: 100%;

  }

  .hero{
    padding: 100px 15px;
  }
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
    max-width: 250px;
    min-width: 170px;
    width: auto;
  }
}


</style>
