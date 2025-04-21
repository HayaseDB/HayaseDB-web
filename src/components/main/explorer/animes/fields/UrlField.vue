<template>
  <div class="field-container">
    <h3 v-if="title" class="text-lg font-medium text-gray-800 mb-1">{{ field.label }}</h3>
    <div v-if="field.value">
      <a
        :href="field.value"
        target="_blank"
        class="text-blue-600 hover:text-blue-800 underline"
      >
        {{ field.label }}
      </a>
    </div>
    <p v-else class="text-gray-400 italic">No URL provided</p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
  title:{
    type: Boolean,
    required: false,
    default: false,
  }
});

const displayUrl = computed(() => {
  if (!props.field.value) return "";
  try {
    const url = new URL(props.field.value);
    return url.hostname;
  } catch {
    return props.field.value;
  }
});
</script>
