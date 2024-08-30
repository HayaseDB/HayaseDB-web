<template>
    <header>
      <NavBar />
    </header>

    <main class="main-content">
      <router-view/>
    </main>

    <footer>
      <p>Footer test</p>
    </footer>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar
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


footer {
  background: var(--background);
  text-align: center;
  padding: 10px;
}
</style>
