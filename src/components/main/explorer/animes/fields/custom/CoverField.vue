<template>
  <div v-if="field.value">
    <img :src="field.value.url" :alt="field.label" class="w-full  border-1 border-gray-200 rounded-lg" />
  </div>
  <div
    v-else
    class="w-full h-90 border-1 border-gray-200 bg-gray-200 flex items-center justify-center rounded-lg"
  >
    <p class="text-gray-400 italic">No Image</p>
  </div>
</template>

<script setup>
defineProps({
  field: {
    type: Object,
    required: true,
  },
});
</script>
