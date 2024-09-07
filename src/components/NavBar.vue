<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-left">
        <router-link to="/" class="navbar-brand">HayaseDB</router-link>
      </div>

      <button class="navbar-toggler" @click="toggleMenu">
        <fontAwesomeIcon :icon="['fa', 'bars']" />
      </button>

      <div :class="{'navbar-collapse': true, 'show': isMenuOpen}">
        <ul class="navbar-nav">
          <li
              v-for="(item, index) in filteredMenuItems"
              :key="index"
              :class="{
                'nav-item': true,
                'dropdown': item.children,
                'active-route': isActiveRoute(item.to, item.children)
              }">
            <router-link
                v-if="!item.children && !item.action"
                :to="item.to"
                class="nav-link"
                :class="{ 'active-route': isActiveRoute(item.to) }"
                @click="closeMenu">
              {{ item.label }}
            </router-link>
            <a
                v-if="item.action"
                class="nav-link"
                :class="item.customClass"
                @click="handleAction(item.action)">
              {{ item.label }}
            </a>
            <a
                v-if="item.children"
                class="nav-link dropdown-toggle"
                :class="{ 'active-route': isActiveRoute(item.to, item.children) }"
                @click="toggleDropdown(index)">
              {{ item.label }}<fontAwesomeIcon class="dropdown-symbol" :icon="['fa', 'caret-down']" />
            </a>
            <ul
                v-if="item.children"
                :id="'dropdown-' + index"
                class="dropdown-menu"
                :class="{ show: isDropdownOpen === index }">
              <li
                  v-for="(child, childIndex) in item.children"
                  :key="childIndex"
                  class="dropdown-list">
                <router-link
                    v-if="!child.action"
                    :to="child.to"
                    class="dropdown-item"
                    :class="[child.customClass, { 'active-route': isActiveRoute(child.to) }]"
                    @click="closeMenu">
                  {{ child.label }}
                </router-link>
                <a
                    v-if="child.action"
                    @click="handleAction(child.action)"
                    class="dropdown-item"
                    :class="child.customClass">
                  {{ child.label }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <button class="theme-toggler" @click="toggleTheme">
          <fontAwesomeIcon :icon="['fa', 'sun']" />
        </button>
      </div>
    </div>
  </nav>
</template>
<script>
import { checkToken } from '@/services/authService';
import { toggleTheme } from "@/utils/theme";
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      isMenuOpen: false,
      isDropdownOpen: null,
      isLoggedIn: false,
      username: null,
      baseMenuItems: [
        { label: 'Home', to: '/' },
        { label: 'About', to: '/about' },
        { label: 'Contact', to: '/contact' },
        {
          label: 'Docs',
          children: [
            { label: 'API', to: '/docs/api' },
            { label: 'Backend', to: '/docs/backend' }
          ]
        },
        { label: 'Login', to: '/login', onlyIfLoggedOut: true }
      ],
    };
  },
  computed: {
    menuItems() {
      if (this.isLoggedIn) {
        return [
          ...this.baseMenuItems,
          {
            label: this.username,
            onlyIfLoggedIn: true,
            children: [
              { label: 'Profile', to: '/account/profile' },
              { label: 'Developer', to: '/account/developer' },
              { label: 'Logout', to: null, customClass: 'logout', action: 'logout' }
            ]
          }
        ];
      }
      return this.baseMenuItems;
    },
    filteredMenuItems() {
      return this.menuItems.filter(item =>
          (item.onlyIfLoggedOut && !this.isLoggedIn) ||
          (item.onlyIfLoggedIn && this.isLoggedIn) ||
          (!item.onlyIfLoggedOut && !item.onlyIfLoggedIn)
      );
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleTheme() {
      toggleTheme();
    },
    closeMenu() {
      this.isMenuOpen = false;
      this.isDropdownOpen = null;
    },
    toggleDropdown(index) {
      if (this.isMenuOpen) {
        this.isDropdownOpen = this.isDropdownOpen === index ? null : index;
      } else {
        this.isDropdownOpen = null;
      }
    },
    isActiveRoute(route, children = []) {
      if (this.$route.path === route) {
        return true;
      }

      if (children && children.length > 0) {
        return children.some(child => this.$route.path === child.to);
      }

      return false;
    },
    async checkLoginStatus() {
    try {
      const loggedInUser = await checkToken();
      this.isLoggedIn = loggedInUser.isValid;
      this.username = loggedInUser.user.username;

      localStorage.setItem('cachedUser', JSON.stringify(loggedInUser));
    } catch (error) {
      this.isLoggedIn = false;
      this.username = null;
      localStorage.removeItem('cachedUser');
    }
  },


    logout() {
      Cookies.remove('token');
      localStorage.removeItem('cachedUser');
      this.isLoggedIn = false;
      this.username = null;
      this.$router.push('/');
    },
    handleAction(action) {
      if (action === 'logout') {
        this.logout();
      }
    },
  },
  created() {
    this.checkLoginStatus();
  }
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
  outline: none;
  display: none;
  border: none;
  background: none;
  font-size: var(--text-lg);
  color: var(--text);
  cursor: pointer;
  align-items: center;
}

.theme-toggler {
  outline: none;
  border: none;
  background: none;
  color: var(--text);
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 10px;
}

.logout:hover{
  background-color: rgba(255, 0, 0, 0.42) !important;
  color: var(--text) !important;
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

.dropdown-toggle{
  cursor: pointer;
}

.dropdown-symbol{
  margin-left: 10px;
}

.nav-link.active-route {
  background-color: var(--primary-100);
  color: var(--primary);
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
  border: 1px solid var(--background-100);
  z-index: 1000;
  min-width: 150px;
}

a{
  cursor: pointer;
}

.dropdown-menu.show {
  display: flex;
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

.dropdown {
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

  .dropdown-list {
    width: 100%;
  }

  .nav-link{
    border-radius: 0;

  }
}
</style>
