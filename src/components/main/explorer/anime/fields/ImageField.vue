<template>
  <div class="field-container">
    <h3 class="text-lg font-medium text-gray-800 mb-1">{{ field.label }}</h3>
    <div v-if="field.value" class="mt-2">
      <img
        :src="field.value.url"
        :alt="field.label"
        class="w-full rounded-lg"
      />
      <p class="text-xs text-gray-500 mt-1">{{ field.value.filename }}</p>
    </div>
    <p v-else class="text-gray-400 italic">No image</p>
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
