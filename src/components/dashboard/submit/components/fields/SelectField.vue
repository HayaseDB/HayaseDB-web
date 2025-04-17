<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>

    <select
      :value="modelValue"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
      :class="{
        'border-red-500 focus:ring-red-500': error,
        'ring-1 ring-indigo-500 bg-indigo-50 transition-all duration-200':
          isChanged,
      }"
      @change="onChange"
    >
      <option value="">- Select {{ label }} -</option>
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>

    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  modelValue: any;
  options: Option[];
  error?: string;
  isChanged?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [value: any];
}>();

function onChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  emit("update:modelValue", target.value);
}
</script>
