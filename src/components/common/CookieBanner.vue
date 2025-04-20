<template>
  <div
    v-if="!cookieConsent"
    class="fixed bottom-0 inset-x-0 z-50 bg-opacity-75 flex justify-center p-4"
  >
    <div
      class="max-w-screen-lg w-full gap-20 bg-white rounded-2xl p-4 border border-gray-200 px-10 flex justify-between items-center"
    >
      <p class="text-sm text-gray-800">
        This website uses cookies to ensure you get the best experience. By
        continuing to use this site, you agree to our
        <a href="/privacy-policy" class="text-blue-500 hover:underline"
          >Privacy Policy</a
        >
        and
        <a href="/cookie-policy" class="text-blue-500 hover:underline"
          >Cookie Policy</a
        >.
      </p>
      <button
        @click="acceptCookies"
        class="px-4 w-60 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      >
        🍪 I like Cookies
      </button>
    </div>
  </div>

  <div class="fixed left-5 bottom-0 overflow-hidden">
    <img
      v-show="mascotVisible"
      src="@/assets/nagatoro_thumb_up.webp"
      alt="Sliding Image"
      class="w-48 mascot-animation"
      :class="{ 'slide-in': showSlide, 'slide-out': !showSlide }"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      cookieConsent: false,
      showSlide: false,
      mascotVisible: false,
    };
  },
  mounted() {
    if (localStorage.getItem("cookieConsent") === "true") {
      this.cookieConsent = true;
    }
  },
  methods: {
    acceptCookies() {
      this.cookieConsent = true;
      localStorage.setItem("cookieConsent", "true");

      if (!this.mascotVisible) {
        this.mascotVisible = true;
        setTimeout(() => {
          this.showSlide = true;
          setTimeout(() => {
            this.showSlide = false;
            setTimeout(() => {
              this.mascotVisible = false;
            }, 600);
          }, 3000);
        }, 100);
      }
    },
  },
};
</script>

<style scoped>
.mascot-animation {
  transform: translateY(100%);
  transition: transform 0.8s ease-in-out;
}

.slide-in {
  transform: translateY(0) !important;
}

.slide-out {
  transform: translateY(100%) !important;
}
</style>
