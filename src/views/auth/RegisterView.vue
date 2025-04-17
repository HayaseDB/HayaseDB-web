<template>
  <div class="bg-gray-100 flex items-center justify-center min-h-screen">
    <Register />
    <img
      src="@/assets/nagatoro_presents.webp"
      alt="Nagatoro"
      class="absolute md:block hidden bottom-0 xl:right-20 right-0 w-sm"
    />
  </div>
</template>
<script setup lang="ts">
import Register from "@/components/auth/RegisterForm.vue";
</script>
