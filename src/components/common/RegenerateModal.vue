<template>
  <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div class="bg-white rounded-2xl p-6 max-w-md w-full">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">{{ title }}</h3>
        <p v-if="message" class="text-sm text-gray-600 mb-4">{{ message }}</p>

        <div class="mb-4 relative">
          <input
              :value="inputValue"
              readonly
              class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800"
          />
          <button
              @click="copyToClipboard"
              class="mt-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all duration-200"
          >
            <span v-if="copied">✅ Copied!</span>
            <span v-else>Copy to Clipboard</span>
          </button>
        </div>

        <div class="flex justify-end">
          <button
              @click="$emit('cancelled')"
              class="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  isVisible: Boolean,
  title: String,
  message: String,
  inputValue: String
});

const emit = defineEmits(['cancelled']);
const copied = ref(false);

const copyToClipboard = () => {
  if (props.inputValue) {
    navigator.clipboard.writeText(props.inputValue);
    copied.value = true;
  }
  setTimeout(() => (copied.value = false), 2000);
};
</script>
