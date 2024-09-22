<template>
  <div v-if="visible" class="cookie-banner background-card">
    <img src="@/assets/Cookie.png" alt="Cookie Icon" class="cookie-icon" />
    <p class="text">
      We use cookies to keep the website running smoothly, <b>no secret ingredient here!</b> We promise, we only use cookies for the user experience, not to collect your personal information. By continuing to visit this site, you agree to our use of cookies.
    </p>
    <div class="buttons">
      <button class="btn-primary" @click="acceptCookies">Accept</button>
      <button class="btn-secondary" @click="rejectCookies">Reject</button>
    </div>
  </div>

  <transition name="slide">
    <img v-if="showSlide" src="@/assets/nagatoro_thumb_up.png" alt="Sliding Image" class="slide-image" />
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: true,
      showSlide: false,
      preloadedImage: null,
    };
  },
  created() {
    this.checkCookieConsent();
    this.preloadSlideImage();
  },
  methods: {
    checkCookieConsent() {
      const consent = localStorage.getItem('cookieConsent');
      if (consent === 'accepted') {
        this.visible = false;
      }
    },
    preloadSlideImage() {
      this.preloadedImage = new Image();
      this.preloadedImage.src = require('@/assets/nagatoro_thumb_up.png');
    },
    acceptCookies() {
      localStorage.setItem('cookieConsent', 'accepted');
      this.visible = false;
      console.log("Cookies accepted");

      this.showSlide = true;

      setTimeout(() => {
        this.showSlide = false;
      }, 2000);
    },
    rejectCookies() {
      localStorage.setItem('cookieConsent', 'rejected');
      this.visible = false;
      console.log("Cookies rejected");
    },
  },
};
</script>

<style scoped>
.cookie-banner {
  gap: 20px;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  z-index: 9999999;
  display: flex;
  align-items: center;
  width: 90%;
  max-width: 1000px;
  background: var(--background-150);
  backdrop-filter: blur(10px);
}
.cookie-icon {
  width: 70px;
  height: 70px;
  margin-right: 15px;
}
.text {
  flex: 1;
  margin: 0 15px;
}
.buttons {
  display: flex;
  gap: 10px;
}
.slide-image {
  z-index: 99999999;
  position: fixed;
  left: 20px;
  bottom: 0;
  width: 200px;
}

@keyframes slideIn {
  from {
    bottom: -200px;
  }
  to {
    bottom: 0;
  }
}

@keyframes slideOut {
  from {
    bottom: 0;
  }
  to {
    bottom: -200px;
  }
}

.slide-enter-active {
  animation: slideIn 0.5s forwards;
}

.slide-leave-active {
  animation: slideOut 0.5s forwards;
}

@media (max-width: 700px) {
  .cookie-banner {
    flex-direction: column;
  }
}
</style>
