<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-left">
        <router-link to="/" class="navbar-brand">HayaseDB</router-link>
      </div>

      <a class="navbar-toggler" @click="toggleMenu">
        <fontAwesomeIcon :icon="['fa', 'bars']" />
      </a>

      <div :class="{'navbar-collapse': true, 'show': isMenuOpen}">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
          <li class="nav-item dropdown">
            <router-link to="/services" class="nav-link">Services</router-link>
            <ul class="dropdown-menu">
              <li class="dropdown-list"><router-link to="/service1" class="dropdown-item">Service 1</router-link></li>
              <li class="dropdown-list"><router-link to="/service2" class="dropdown-item">Service 2</router-link></li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link">Contact</router-link>
          </li>
        </ul>
        <a class="theme-toggler" @click="toggleTheme">
          <fontAwesomeIcon :icon="['fa', 'sun']" />
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
  align-items: center;
  cursor: pointer;
  padding: 0 10px;
}

.navbar-left {
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
  position: relative;
}

.nav-link {
  color: var(--text);
  text-decoration: none;
  font-size: var(--text-base);
  padding: 10px;
  border-radius: var(--border-radius-md);
  transition: background-color 0.3s, color 0.3s;
  height: auto;
  display: block;
}

.nav-link:hover {
  background-color: var(--primary-100);
  color: var(--primary);
}

.dropdown-menu {
  display: none;
  position: absolute;
  flex-direction: column;

  top: 100%;
  left: 0;
  background: var(--background);
  box-shadow: var(--shadow-md);
  list-style: none;
  padding: 10px 0;
  margin: 0;
  white-space: nowrap;
  border-radius: var(--border-radius-md);
  z-index: 1000;
  min-width: 150px;

}

.dropdown-menu .dropdown-item {
  text-decoration: none;
  color: var(--text);
  padding: 10px 20px;
  display: block;
}

.dropdown-menu .dropdown-item:hover {
  background-color: var(--primary-100);
  color: var(--primary);
}

.nav-item:hover .dropdown-menu {
  display: flex;

}

.dropdown{
  display: flex;
  flex-direction: column;
  height: min-content;
}

@media (max-width: 768px) {
  .theme-toggler {
    margin: 20px auto 15px;

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
    padding-bottom: 10px;
    padding-top: 10px;
    border-bottom: 1px solid var(--background-100);
  }
  .dropdown {
    width: 100%;
    display: block;
    text-align: center;
  }

  .navbar-collapse.show ul {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .nav-item {
    margin: 5px 0;
    position: relative;
    width: 100%;
    text-align: center;
  }


  .dropdown-menu {
    background-color: var(--background-100);
    position: relative;
    width: 100%;
    box-shadow: none;
    gap: 5px;

  }



  .dropdown-list{
    width: 100%;
  }


}

</style>
