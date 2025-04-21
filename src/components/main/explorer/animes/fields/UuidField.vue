<template>
  <div class="field-container">
    <h3 class="text-lg font-medium text-gray-800 mb-1">{{ field.label }}</h3>
    <p v-if="field.value" class="text-gray-600 text-sm font-mono">
      {{ field.value }}
    </p>
    <p v-else class="text-gray-400 italic">No ID</p>
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
