<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
  >
    <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
      <h3 class="text-lg font-medium text-gray-900 mb-2">Confirm Deletion</h3>
      <p class="text-gray-600 mb-4">
        Are you sure you want to delete this contribution? This action cannot be
        undone.
      </p>
      <div class="flex justify-end space-x-3">
        <button
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          @click="cancel"
        >
          Cancel
        </button>
        <button
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          :disabled="isDeleting"
          @click="confirm"
        >
          <span v-if="isDeleting">Deleting...</span>
          <span v-else>Delete</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "DeleteConfirmationModal",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    isDeleting: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "confirm"],
  methods: {
    cancel() {
      this.$emit("update:modelValue", false);
    },
    confirm() {
      this.$emit("confirm");
    },
  },
};
</script>
