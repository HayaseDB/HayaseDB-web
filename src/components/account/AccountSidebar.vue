<template>
  <aside :class="['sidebar', { 'collapsed': isCollapsed }]">
    <div class="sidebar-content">
      <div class="sidebar-header">
        <h2 v-if="!isCollapsed">Account</h2>
        <button class="btn-primary" @click="toggleSidebar">{{ isCollapsed ? '>>' : '<<' }}</button>
      </div>
      <hr>

      <nav class="sidebar-nav">
        <ul>
          <li v-for="(item, index) in menuItems" :key="index">
            <router-link :to="item.link" active-class="active" @click="currentSection = item.name">
              {{ item.label }}
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="sidebar-footer">
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false,
      currentSection: 'Profile',
      menuItems: [
        { name: 'Settings', label: 'Profile', link: '/account/profile' },
        { name: 'Developer', label: 'Developer', link: '/account/developer' },
      ],
    };
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
};
</script>

<style scoped>
.sidebar {
  z-index: 100;
  width: 250px;
  background-color: var(--background);
  color: var(--text);
  min-height: 100vh;
  box-sizing: border-box;
  padding: 1em;
  border-right: 1px solid var(--background-300);
  position: relative;
  left: 0;
  transition: width 0.3s ease, padding 0.3s ease;

}

.sidebar.collapsed {
  width: 0;
  padding: 1em 0;
  left: -3px;




}
hr{
  width: 100%;
  border-color: var(--background-50);
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

.sidebar-content {
  padding-top: 80px;
  display: flex;
  flex-direction: column;
}

.sidebar-nav{
  overflow: hidden;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-header h2 {
  font-size: var(--text-lg);
  white-space: nowrap;
  overflow: hidden;
  transition: opacity 0.3s ease;
  padding: 10px;
}

.sidebar.collapsed .sidebar-header h2 {
  opacity: 0;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav ul li {
  margin: 0.6em 0;
}

nav ul li a {
  color: var(--text);
  text-decoration: none;
  font-size: var(--text-base);
  padding: 10px;
  border-radius: var(--border-radius-md);
  transition: background-color 0.3s, color 0.3s;
  height: auto;
  display: block;
}

nav ul li a:hover {
  background-color: var(--primary-100);
  color: var(--primary);
}

nav ul li a.active {
  background-color: var(--primary-100);
  color: var(--primary);
}


.sidebar-footer {
  margin-top: auto;
  text-align: center;
}
@media (max-width: 1150px) {
.sidebar {
  position: fixed;
  height: 100%;
}
}
</style>
