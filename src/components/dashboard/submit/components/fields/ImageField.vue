<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>

    <div class="relative">
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 pr-10"
        :class="{
          'border-red-500 focus:ring-red-500': error,
          'ring-1 ring-indigo-500 bg-indigo-50 transition-all duration-200':
            isChanged,
        }"
        @change="onChange"
      />
      <button
        v-if="preview"
        type="button"
        class="absolute right-5 top-1/2 transform -translate-y-1/2 text-sm text-red-600 hover:text-red-800"
        @click="removeFile"
      >
        <X class="h-5" />
      </button>
    </div>

    <div v-if="preview" class="mt-2">
      <img
        :src="preview"
        alt="Preview"
        class="h-32 object-cover rounded-md border border-gray-300"
      />
    </div>

    <div v-if="error" class="text-sm text-red-600 mt-1">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { X } from "lucide-vue-next";

interface Props {
  label: string;
  error?: string;
  modelValue?: any;
  isChanged?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  "update:modelValue": [any];
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const preview = ref<string | File | null>(null);

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue?.url) {
      preview.value = newValue.url;
    } else if (newValue instanceof File) {
      preview.value = URL.createObjectURL(newValue);
    } else {
      preview.value = null;
    }
  },
);

async function onChange(event: Event): Promise<void> {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    preview.value = file;
    emit("update:modelValue", file);
  }
}

function removeFile(): void {
  emit("update:modelValue", null);
  if (fileInput.value) {
    fileInput.value.value = "";
  }
  preview.value = null;
}
</script>
