<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      :value="modelValue"
      type="text"
      :required="required"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      :class="{
        'border-red-500 focus:ring-red-500': error,
        'ring-1 ring-indigo-500 bg-indigo-50 transition-all duration-200':
          isChanged,
      }"
      @input="onInput"
    />

    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface Props {
  label: string;
  error?: string;
  modelValue: any;
  required?: boolean;
  isChanged?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};

const error = ref<string | null>(props.error || null);

watch(
  () => props.modelValue,
  () => {
    if (error.value === "This field is required" && props.modelValue) {
      error.value = null;
    }
  },
);
</script>
