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

  <MessageBox
      message="Be careful! This project is still in early development, visit <a class='messagelink' style='color: #fff; text-decoration: underline;' href='https://hayasedb.com' target='_blank' rel='noopener noreferrer'>HayaseDB.com</a> for more details."
      variant="danger"
  />

  <CookieBanner />
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import NavBar from './components/NavBar.vue';
import FooterSection from './components/FooterSection.vue';
import CookieBanner from './components/CookieBanner.vue';
import MessageBox from "@/components/general/pushMessage.vue";

export default {
  name: 'App',
  components: {
    MessageBox,
    NavBar,
    FooterSection,
    CookieBanner,
  },
  setup() {
    const route = useRoute();

    const showNavBar = computed(() => route.meta.showNavBar !== false);
    const showFooter = computed(() => route.meta.showFooter !== false);


    return {
      showNavBar,
      showFooter,
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
