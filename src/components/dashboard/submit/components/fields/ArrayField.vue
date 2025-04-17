<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>

    <div class="flex items-center gap-2">
      <input
        v-model="inputValue"
        type="text"
        class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        :class="{
          'ring-1 ring-indigo-500 bg-indigo-50 transition-all duration-200':
            isChanged,
        }"
        @keydown.enter.prevent="addItem"
      />
      <button
        type="button"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        :disabled="!inputValue.trim()"
        @click="addItem"
      >
        Add
      </button>
    </div>

    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>

    <div v-if="fieldValue.length > 0" class="mt-3">
      <VueDraggableNext
        v-model="fieldValue"
        class="flex flex-wrap gap-2 cursor-grab active:cursor-grabbing"
        @end="onDragEnd"
      >
        <span
          v-for="(item, index) in fieldValue"
          :key="index"
          class="flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-lg border border-blue-300"
        >
          {{ item }}
          <button
            type="button"
            class="ml-2 text-red-500 hover:text-red-700"
            aria-label="Remove tag"
            @click="removeItem(index)"
          >
            ×
          </button>
        </span>
      </VueDraggableNext>
    </div>

    <p v-if="fieldValue.length === 0" class="text-sm text-gray-500 italic mt-2">
      No tags added yet
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { toast } from "vue3-toastify";
import { VueDraggableNext } from "vue-draggable-next";

interface Props {
  label: string;
  error?: string;
  modelValue: any;
  isChanged?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [value: any];
}>();

const inputValue = ref("");
const fieldValue = ref<any>([]);

watch(
  () => props.modelValue,
  (newValue) => {
    fieldValue.value = Array.isArray(newValue) ? [...newValue] : [];
  },
  { immediate: true },
);

function addItem() {
  const tag = inputValue.value.trim();
  if (!tag) return;

  if (fieldValue.value.includes(tag)) {
    try {
      toast.error(`"${tag}" already exists`);
    } catch (e) {
      console.error("Toast failed:", e);
    }
    return;
  }

  fieldValue.value.push(tag);
  inputValue.value = "";
  emit("update:modelValue", [...fieldValue.value]);
}

function removeItem(index: number) {
  fieldValue.value.splice(index, 1);
  if (fieldValue.value.length === 0) {
    emit("update:modelValue", null);
  } else {
    emit("update:modelValue", [...fieldValue.value]);
  }
}

function onDragEnd() {
  emit("update:modelValue", [...fieldValue.value]);
}
</script>
