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
      v-if="isMessageVisible"
      message="Be careful! This project is still in early development, visit <a href='https://hayasedb.com' target='_blank' rel='noopener noreferrer'>HayaseDB.com</a> for more details."
      variant="danger"
      @close="handleCloseMessageBox"
  />

  <CookieBanner />
</template>

<script>
import { computed, ref, onMounted } from 'vue';
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

    const isMessageVisible = ref(false);

    onMounted(() => {
      const messageShown = localStorage.getItem('messageShown');

      if (!messageShown) {
        isMessageVisible.value = true;
      }
    });

    const handleCloseMessageBox = () => {
      isMessageVisible.value = false;
      localStorage.setItem('messageShown', 'true');
    };

    return {
      showNavBar,
      showFooter,
      isMessageVisible,
      handleCloseMessageBox,
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
