<template>
    <header>
      <NavBar />
    </header>

    <main class="main-content">
      <router-view/>
    </main>

    <footer>
      <FooterSection/>
    </footer>
</template>

<script>
import NavBar from './components/NavBar.vue';
import FooterSection from './components/FooterSection.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    FooterSection
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
