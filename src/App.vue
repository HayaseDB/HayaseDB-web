<template>
  <div id="app">
    <header>
      <NavBar />
    </header>

    <main class="main-content">
      <router-view/>
    </main>

    <footer>
      <p>Footer test</p>
    </footer>
  </div>
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

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
