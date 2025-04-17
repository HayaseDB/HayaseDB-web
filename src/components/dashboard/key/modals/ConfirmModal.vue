<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
  >
    <div class="bg-white rounded-2xl p-6 max-w-md w-full">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">
        {{ title }}
      </h3>
      <p class="text-sm text-gray-600 mb-6">
        {{ message }}
      </p>
      <div class="flex justify-end gap-4">
        <button
          class="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-all duration-200"
          @click="$emit('cancelled')"
        >
          Cancel
        </button>
        <button
          class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-200"
          @click="$emit('confirmed')"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isVisible: Boolean,
  title: {
    default: "",
    type: String,
  },
  message: {
    default: "",
    type: String,
  },
  confirmText: { type: String, default: "Confirm" },
});

defineEmits(["confirmed", "cancelled"]);
</script>
