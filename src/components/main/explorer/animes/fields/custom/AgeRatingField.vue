<template>
  <div class="field-container">
    <h3 class="text-lg font-medium text-gray-800 mb-1">{{ field.label }}</h3>
    <div v-if="field.value" class="flex items-center">
      <span
        :class="[
          'px-3 py-1 text-sm rounded-lg border',
          badgeStyles[field.value] || defaultBadge
        ]"
      >
        {{ field.value }}
      </span>
    </div>
    <p v-else class="text-gray-400 italic">Not specified</p>
  </div>
</template>

<script setup>
const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
});

const badgeStyles = {
  'G': 'bg-green-100 text-green-800 border-green-200',
  'PG': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'PG-13': 'bg-orange-100 text-orange-800 border-orange-200',
  'R': 'bg-red-100 text-red-800 border-red-200',
  'NC-17': 'bg-purple-100 text-purple-800 border-purple-200',
  'R-18': 'bg-pink-100 text-pink-800 border-pink-200',
};

const defaultBadge = 'bg-gray-100 text-gray-800 border-gray-300';
</script>
