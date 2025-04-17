<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth'; // Adjust import path based on your file structure

export default {
  setup() {
    const authStore = useAuthStore();
    const email = ref('');
    const password = ref('');
    const errorMessage = ref<string | null>(null);

    const handleLogin = async () => {
      try {
        errorMessage.value = null;
        await authStore.login(email.value, password.value);
      } catch (error) {
        errorMessage.value = 'Login failed. Please check your credentials.';
      }
    };

    return { email, password, errorMessage, handleLogin };
  },
};
</script>

<style scoped>
/* Add some basic styling here */
.error-message {
  color: red;
}
</style>
