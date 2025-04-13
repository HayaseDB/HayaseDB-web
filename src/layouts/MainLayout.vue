<template>
  <header class="flex border-b h-16 border-gray-200 items-center justify-between bg-white p-4">
    <div class="flex items-center space-x-4">
      <div class="flex items-center space-x-3">
        <img src="@/assets/hayasedb.svg" class="h-8" alt="HayaseDB Logo" />
        <span class="text-2xl font-extrabold">HayaseDB</span>
      </div>
    </div>

    <div class="flex items-center space-x-4">
      <template v-if="isAuthenticated">
        <ProfileMenu />
      </template>
      <template v-else>
        <button
            @click="goToLogin"
            class="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
        >
          Login
        </button>
      </template>
    </div>
  </header>

</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import ProfileMenu from "@/components/common/ProfileMenu.vue";
import { AuthService } from '@/services/auth.service.ts';
import { useAuthStore } from '@/stores/auth.store.ts';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const isAuthenticated = ref(false);
const router = useRouter();

const checkAuth = async () => {
  isAuthenticated.value = await AuthService.isAuthenticated();
};

onMounted(() => {
  checkAuth();
});

const goToLogin = () => {
  router.push('/login');
};
</script>

