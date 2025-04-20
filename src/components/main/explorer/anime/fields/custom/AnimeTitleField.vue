<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white">
    <div v-if="bannerImage?.value?.url" class="h-48 w-full overflow-hidden">
      <img
        :src="bannerImage?.value?.url"
        alt="Banner Image"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="p-6">
      <h1 class="text-3xl font-bold text-gray-800">
        {{ title.value }}
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: any;
  bannerImage?: any;
}>();
</script>
