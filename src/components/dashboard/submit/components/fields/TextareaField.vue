<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>

    <textarea
      :value="modelValue"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      :class="{
        'border-red-500 focus:ring-red-500': error,
        'ring-1 ring-indigo-500 bg-indigo-50 transition-all duration-200':
          isChanged,
      }"
      rows="4"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  error?: string;
  modelValue: any;
  isChanged?: boolean;
}

defineProps<Props>();
defineEmits(["update:modelValue"]);
</script>
