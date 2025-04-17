<template>
  <div class="flex items-center justify-center">
    <div
      class="bg-white rounded-md shadow-sm px-10 py-12 text-center space-y-4"
    >
      <h1 class="text-3xl md:text-4xl font-semibold text-gray-800">
        Welcome<span v-if="userName">, {{ userName }}</span>
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useAuthStore } from "@/stores/auth.store";

const authStore = useAuthStore();

onMounted(() => {
  if (!authStore.user) {
    authStore.hydrateUser();
  }
});

const userName = computed(() => authStore.getUser?.username);
</script>
