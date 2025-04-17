<template>
  <div class="profile">
    <h2>Profile</h2>
    <p v-if="isAuthenticated">Welcome to your profile page!</p>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/auth'; // Adjust import path based on your file structure

export default {
  setup() {
    const authStore = useAuthStore();

    const handleLogout = () => {
      authStore.logout();
      this.$router.push('/login'); // Redirect to login page after logout
    };

    return {
      isAuthenticated: authStore.isAuthenticated,
      handleLogout,
    };
  },
};
</script>

<style scoped>
/* Add some basic styling here */
button {
  margin-top: 10px;
}
</style>
