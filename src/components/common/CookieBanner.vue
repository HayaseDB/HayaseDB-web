<template>
  <div
    v-if="!cookieConsent"
    class="fixed bottom-0 inset-x-0 z-50 flex justify-center p-4"
  >
    <div
      class="max-w-screen-lg w-full bg-white rounded-lg p-4 border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <p class="text-sm text-gray-700 md:pr-4">
        This website uses cookies to ensure you get the best experience. By
        continuing to use this site, you agree to our
        <a
          href="/privacy-policy"
          class="text-blue-600 hover:underline font-medium"
        >
          Privacy Policy
        </a>
        and
        <a
          href="/cookie-policy"
          class="text-blue-600 hover:underline font-medium"
        >
          Cookie Policy </a
        >.
      </p>
      <button
        @click="acceptCookies"
        class="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center justify-center gap-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 whitespace-nowrap"
      >
        <span class="text-lg">🍪</span> Accept Cookies
      </button>
    </div>
  </div>

  <div
    class="fixed left-5 bottom-0 w-40 h-40 pointer-events-none overflow-hidden"
  >
    <img
      v-if="showMascot"
      src="@/assets/nagatoro_thumb_up.webp"
      alt="Mascot"
      class="w-32 md:w-40 absolute bottom-0 left-0 mascot-animation"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      cookieConsent: false,
      showMascot: false,
    };
  },

  mounted() {
    this.cookieConsent = localStorage.getItem("cookieConsent") === "true";
  },

  methods: {
    acceptCookies() {
      this.cookieConsent = true;
      localStorage.setItem("cookieConsent", "true");
      this.showMascot = true;

      setTimeout(() => {
        this.showMascot = false;
      }, 3800);
    },
  },
};
</script>

<style scoped>
.mascot-animation {
  animation: slideInOut 3.8s ease-in-out forwards;
}

@keyframes slideInOut {
  0% {
    transform: translateY(100%);
  }
  20% {
    transform: translateY(0);
  }
  80% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}
</style>
