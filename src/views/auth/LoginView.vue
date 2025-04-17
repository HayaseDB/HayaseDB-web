<template>
  <div
    class="relative bg-gray-100 flex items-center justify-center min-h-screen"
  >
    <Login />
    <img
      src="@/assets/nagatoro_presents.webp"
      alt="Nagatoro"
      class="absolute md:block hidden bottom-0 xl:right-20 right-0 w-sm"
    />
  </div>
</template>

<script setup lang="ts">
import Login from "@/components/auth/LoginForm.vue";
</script>
