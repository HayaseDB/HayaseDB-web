<template>
  <div class="auth-form">

    <div v-if="loading" class="loading-overlay">
      <img class="loading-icon rotate-scale" src="../assets/nagatoro_loading.webp" alt="Loading" />
    </div>


    <h1 class="auth-title">{{ isLogin ? 'Login' : 'Register' }}</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email</label>
        <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="Enter your email"
            required
            autocomplete="email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Enter your password"
            required
            autocomplete="current-password"
        />
      </div>
      <div v-if="!isLogin" class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
            id="confirmPassword"
            v-model="form.confirmPassword"
            type="password"
            placeholder="Confirm your password"
            required
            autocomplete="password"
        />
      </div>
      <p v-if="successMessage" class="message success-message">{{ successMessage }}</p>
      <p v-if="errorMessage" class="message error-message">{{ errorMessage }}</p>
      <div class="form-bottom">
        <button
            :class="{
              'btn-primary': !isLogin,
              'btn-secondary': isLogin,
              'btn-disabled': loading
            }"
            type="submit"
            :disabled="loading"
        >
          {{ isLogin ? 'Login' : 'Register' }}
        </button>

        <p class="auth-toggle">
          {{ isLogin ? "Don't have an account?" : 'Already have an account?' }}
          <a @click="toggleAuthMode">{{ isLogin ? 'Register' : 'Login' }}</a>
        </p>
      </div>
    </form>
    <img class="form-image" src="../assets/nagatoro_inspect.webp" alt="">
  </div>
</template>


<script setup>
import {onBeforeUnmount, ref, watch} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { register, login } from '@/services/authService';

const route = useRoute();
const router = useRouter();

const isLogin = ref(route.path === '/login');
const loading = ref(false);

const form = ref({
  email: '',
  password: '',
  confirmPassword: '',
});

const successMessage = ref('');
const errorMessage = ref('');

watch(
    () => route.path,
    (newPath) => {
      isLogin.value = newPath === '/login';
      form.value = {
        confirmPassword: '',
        password: '',
        email: ''
      };
      successMessage.value = '';
      errorMessage.value = '';
    }
);
const redirectTimeout = ref(null);
const toggleAuthMode = () => {
  clearTimeout(redirectTimeout.value);

  const newPath = isLogin.value ? '/register' : '/login';
  router.push(newPath);
};


onBeforeUnmount(() => {
  if (redirectTimeout.value) {
    clearTimeout(redirectTimeout.value);
  }
});
const handleSubmit = async () => {
  successMessage.value = '';
  errorMessage.value = '';
  loading.value = true;

  if (!isLogin.value && form.value.password !== form.value.confirmPassword) {
    errorMessage.value = 'Passwords do not match!';
    loading.value = false;
    return;
  }

  try {
    if (isLogin.value) {
      await login(form.value.email, form.value.password);
      form.value = {
        confirmPassword: '',
        password: '',
        email: ''
      };
      successMessage.value = 'Login successful! Redirecting...';

      window.location.href = '/explore';
    } else {
      await register(form.value.email, form.value.password);
      form.value = {
        confirmPassword: '',
        password: '',
        email: ''
      };
      successMessage.value = 'Registration successful!';
      redirectTimeout.value = setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
};
</script>


<style scoped>
.auth-form {
  background: var(--background);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 30px;
  border: 1px solid var(--background-100);
  max-width: 400px;
  width: 100%;
  position: relative;
  overflow: hidden;
  text-align: center;
}

form {
  height: 440px;
  display: flex;
  flex-direction: column;
}

.form-bottom {
  margin-top: auto;
}

.auth-title {
  color: var(--text);
  margin-bottom: 30px;
  font-size: var(--text-3xl);
  font-weight: 700;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.loading-icon {
  width: 70px;
  height: 70px;
}


.form-group label {
  display: block;
  margin-bottom: 8px;
  color: var(--text-600);
  font-weight: 500;
}

input {
  padding: 12px;
  border: 1px solid var(--background-300);
  border-radius: var(--border-radius-md);
  background-color: var(--background-50);
  color: var(--text);
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus {
  border-color: var(--primary);
  outline: none;
  box-shadow: 0 0 5px rgba(var(--primary), 0.3);
}

button {
  border: none;
  padding: 12px 25px;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-size: var(--text-base);
  font-weight: 600;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
  color: rgb(241, 243, 248);
  white-space: nowrap;
  flex-shrink: 0;
}

button:active {
  transform: scale(0.98);
}

.auth-toggle {
  margin-top: 20px;
  font-size: var(--text-sm);
  color: var(--text-400);
}

.auth-toggle a {
  color: var(--primary);
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
}

.auth-toggle a:hover {
  color: var(--primary-500);
  text-decoration: underline;
}

.message {
  margin-top: 0;
  margin-bottom: 0;
  font-size: var(--text-sm);
}

.success-message {
  color: var(--success);
}

.error-message {
  color: var(--danger);
}

.form-image {
  width: 80px;
  position: absolute;
  bottom: 0;
  left: -10px;
}
</style>
