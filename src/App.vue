<template>
  <header v-if="showNavBar">
    <NavBar />
  </header>

  <main class="main-content">
    <router-view />
  </main>

  <footer v-if="showFooter">
    <FooterSection />
  </footer>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import NavBar from './components/NavBar.vue';
import FooterSection from './components/FooterSection.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    FooterSection
  },
  setup() {
    const route = useRoute();

    const showNavBar = computed(() => route.meta.showNavBar !== false);
    const showFooter = computed(() => route.meta.showFooter !== false);

    return {
      showNavBar,
      showFooter
    };
  }
}
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
}

main.main-content {
  flex: 1;
}
</style>
