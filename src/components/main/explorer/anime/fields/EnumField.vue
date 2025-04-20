<template>
  <div class="field-container">
    <h3 class="text-lg font-medium text-gray-800 mb-1">{{ field.label }}</h3>
    <div v-if="field.value" class="flex items-center">
      <span
        class="px-3 py-1 bg-blue-100 border-1 text-blue-900 border-blue-200  rounded-lg text-sm"
      >

        {{ field.value }}
      </span>
    </div>
    <p v-else class="text-gray-400 italic">Not specified</p>
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
