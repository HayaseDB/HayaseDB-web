<template>
  <div class="auth-form">
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
        />
      </div>
      <div class="form-bottom">
        <button
            :class="{'btn-primary': !isLogin, 'btn-secondary': isLogin}"
            type="submit"
        >
          {{ isLogin ? 'Login' : 'Register' }}
        </button>
        <p class="auth-toggle">
          {{ isLogin ? "Don't have an account?" : 'Already have an account?' }}
          <a @click="toggleAuthMode">{{ isLogin ? 'Register' : 'Login' }}</a>
        </p>
      </div>
    </form>
    <img class="form-image" src="../assets/nagatoro_inspect.png" alt="">
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { register, login } from '@/services/authService';

const route = useRoute();
const router = useRouter();

const isLogin = ref(route.path === '/login');

const form = ref({
  email: '',
  password: '',
  confirmPassword: '',
});

watch(
    () => route.path,
    (newPath) => {
      isLogin.value = newPath === '/login';
      form.value = {
        confirmPassword: '',
        password: '',
        email: ''
      }
    }
);

const toggleAuthMode = () => {
  const newPath = isLogin.value ? '/register' : '/login';
  router.push(newPath);
};

const handleSubmit = async () => {
  if (!isLogin.value && form.value.password !== form.value.confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  try {
    if (isLogin.value) {
      await login(form.value.email, form.value.password);
      alert('Login successful!');
      await router.push('/dashboard');
    } else {
      await register(form.value.email, form.value.password);
      alert('Registration successful!');
      await router.push('/login');
    }
  } catch (error) {
    alert(error.message);
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

form{
  height: 400px;
  display: flex;
  flex-direction: column;
}

.form-bottom{
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

.form-image{
  width: 80px;
  position: absolute;
  bottom: 0;
  left: -10px;

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
</style>
