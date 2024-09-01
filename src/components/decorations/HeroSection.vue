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

          <p>HayaseDB is a free, open-source anime database providing comprehensive details through a user-friendly web platform and a powerful API for developers.</p>
          <div class="social-icons">
            <a href="#" class="social-icon instagram"><fontAwesomeIcon :icon="['fab', 'instagram']" /></a>
            <a href="#" class="social-icon discord"><fontAwesomeIcon :icon="['fab', 'discord']" /></a>
            <a href="#" class="social-icon twitter"><fontAwesomeIcon :icon="['fab', 'twitter']" /></a>
            <a href="#" class="social-icon github"><fontAwesomeIcon :icon="['fab', 'github']" /></a>
          </div>
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

.social-icons{
  flex-direction: row;
  display: flex;
  margin-top: 20px;
  gap: 30px;
}



.social-icon {
  font-size: var(--text-lg);
  opacity: 0;
  animation: fadeIn 0.5s forwards;
  transition: color 0.3s ease;
}


@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.social-icon:nth-child(1) {
  animation-delay: 0.2s;
}
.social-icon:nth-child(2) {
  animation-delay: 0.4s;
}
.social-icon:nth-child(3) {
  animation-delay: 0.6s;
}
.social-icon:nth-child(4) {
  animation-delay: 0.8s;
}


.social-icon{
  font-size: var(--text-lg);
}

.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 140px 40px 0;
  background-color: var(--background-50);
  overflow: hidden;


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
  margin-bottom: 50px;
}

.mascot-image {
  max-width: 300px;
  min-width: 200px;
  height: auto;
  display: block;
}


@media (max-width: 720px) {

  .social-icons{
    gap: 20px;

  }

  .social-icon{
    font-size: var(--text-xl);
  }

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
