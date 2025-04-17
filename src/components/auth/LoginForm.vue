<template>
  <div
    class="w-full relative border overflow-hidden border-gray-200 max-w-md bg-white p-8 rounded-xl"
  >
    <LoadingOverlay :is-loading="loading" />

    <h2 class="text-3xl font-semibold text-center mb-6 text-gray-800">Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-6">
        <label for="email" class="block text-sm font-medium text-gray-700"
          >Email</label
        >
        <input
          id="email"
          v-model="email"
          type="email"
          class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div class="mb-6">
        <label for="password" class="block text-sm font-medium text-gray-700"
          >Password</label
        >
        <input
          id="password"
          v-model="password"
          type="password"
          class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <button
        type="submit"
        :disabled="loading"
        class="w-full py-2 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Login
      </button>
    </form>
    <div class="mt-6 text-center">
      <span class="text-gray-600"
        >Don't have an account?
        <router-link
          to="/register"
          class="text-indigo-600 hover:text-indigo-700"
          >Register here</router-link
        ></span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { AuthService } from "@/services/endpoints/auth.service.ts";
import { toast } from "vue3-toastify";
import LoadingOverlay from "@/components/common/LoadingOverlay.vue";

export default defineComponent({
  name: "LoginForm",
  components: { LoadingOverlay },
  setup() {
    const email = ref("");
    const password = ref("");
    const loading = ref(false);
    const router = useRouter();

    const handleLogin = async () => {
      loading.value = true;
      try {
        await AuthService.login(email.value, password.value);
        await router
          .push("/dashboard")
          .then(() => toast.success("Login successfully!"));
      } catch (error) {
        console.error("Login error:", error);
      } finally {
        loading.value = false;
      }
    };

    return {
      email,
      password,
      loading,
      handleLogin,
    };
  },
});
</script>
