<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-left">
        <router-link to="/" class="navbar-brand">HayaseDB</router-link>

      </div>

      <a class="navbar-toggler" @click="toggleMenu">
        <span class="material-symbols-outlined">menu</span>
      </a>

      <div :class="{'navbar-collapse': true, 'show': isMenuOpen}">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/services" class="nav-link">Services</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link">Contact</router-link>
          </li>

        </ul>
        <a class="theme-toggler" @click="toggleTheme">
          <span class="material-symbols-outlined">brightness_6</span>
        </a>

      </div>

    </div>
  </nav>
</template>

<script>
import { toggleTheme } from "@/utils/theme";
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleTheme() {
      toggleTheme();
    }

  },
};
</script>

<style scoped>
.navbar {
  background: var(--background);
  box-shadow: var(--shadow-md);

  border-bottom: 1px solid var(--background-100);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}
.navbar-container {

  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 20px;
}

.navbar-brand {
  font-size: var(--text-xl);
  color: var(--text);
  text-decoration: none;
  font-weight: bold;
}

.navbar-toggler {
  display: none;
  height: 24px;
  border: none;
  background: none;
  font-size: var(--text-lg);
  color: var(--text);
  cursor: pointer;
  align-items: center;
}
.theme-toggler {
  color: var(--text);
  display: flex;
  height: 24px;
  align-items: center;
  cursor: pointer;
  padding: 0 10px;
}



.navbar-left{
  display: flex;
  align-items: center;
}


.navbar-collapse {
  display: flex;
}

.navbar-nav {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 0 10px;
}

.nav-link {
  color: var(--text);
  text-decoration: none;
  font-size: var(--text-base);
  padding: 10px;
  border-radius: var(--border-radius-md);
  transition: background-color 0.3s, color 0.3s;
}



.nav-link:hover {
  background-color: var(--primary-100);
  color: var(--primary);
}



@media (max-width: 768px) {
  .theme-toggler{
    margin-top: 20px;
    margin-bottom: 15px;
  }

  .navbar-toggler {
    display: flex;
  }

  .navbar-collapse {
    display: none;
    flex-direction: column;
    width: 100%;
    background: var(--background);
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
  }

  .navbar-collapse.show {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    padding-top: 10px;
    border-bottom: 1px solid var(--background-100);

  }

  .navbar-collapse.show ul {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .nav-item {
    margin: 10px 0;

  }
}
</style>
