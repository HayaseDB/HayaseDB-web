<template>
  <div class="field-container">
    <h3 class="text-lg font-medium text-gray-800 mb-1">{{ field.label }}</h3>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(item, index) in field.value"
          :key="index"
          class="px-3 py-1 bg-purple-100 border-1 text-purple-900 border-purple-200 rounded-lg text-sm"
        >
          {{ item }}
        </span>
      </div>
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
