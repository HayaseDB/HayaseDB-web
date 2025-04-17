<template>
  <div
    v-if="isLoading"
    class="absolute inset-0 flex items-center justify-center bg-gray-400/30 backdrop-blur-sm z-10"
  >
    <div class="flex flex-col items-center space-y-2">
      <img
        src="../../assets/spinner.webp"
        alt="Loading..."
        class="w-16 h-16 animate-spin"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
