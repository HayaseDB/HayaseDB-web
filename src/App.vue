<!-- App.vue -->
<template>
  <div id="app">
    <header>
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
export default {
  name: 'App'
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

.main-content {
  flex: 1;
}

footer {
  background: var(--background);
  text-align: center;
  padding: 10px;
}
</style>
