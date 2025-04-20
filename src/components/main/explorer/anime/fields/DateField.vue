<template>
  <div class="field-container">
    <h3 class="text-lg font-medium text-gray-800 mb-1">{{ field.label }}</h3>
    <p v-if="field.value" class="text-gray-700">{{ formattedDate }}</p>
    <p v-else class="text-gray-400 italic">No date specified</p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
});

const formattedDate = computed(() => {
  if (!props?.field?.value) return "";
  return new Date(props.field.value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
</script>
