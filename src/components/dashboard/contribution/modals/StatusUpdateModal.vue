<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    role="dialog"
    aria-modal="true"
  >
    <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-lg">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">
        Update Status to {{ capitalizedStatus }}
      </h3>

      <div v-if="targetStatus === 'rejected'" class="mb-4">
        <label
          for="status-comment"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Comment <span class="text-gray-400">(optional)</span>
        </label>
        <textarea
          id="status-comment"
          v-model="localComment"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          rows="3"
          placeholder="Add a comment about this status change..."
          :disabled="isUpdating"
        />
      </div>

      <div class="flex justify-end space-x-3">
        <button
          class="px-4 py-2 hover:cursor-pointer bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          :disabled="isUpdating"
          @click="cancel"
        >
          Cancel
        </button>
        <button
          class="px-4 py-2 hover:cursor-pointer bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          :disabled="isUpdating"
          @click="submit"
        >
          <span v-if="isUpdating">Updating...</span>
          <span v-else>Update Status</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";

export default defineComponent({
  name: "StatusUpdateModal",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    isUpdating: {
      type: Boolean,
      default: false,
    },
    contributionId: {
      required: true,
      type: String,
    },
    targetStatus: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue", "confirm"],
  setup(props, { emit }) {
    const localComment = ref("");

    const capitalizedStatus = computed(
      () =>
        props.targetStatus.charAt(0).toUpperCase() +
        props.targetStatus.slice(1),
    );

    const cancel = () => {
      emit("update:modelValue", false);
    };

    const submit = () => {
      emit("confirm", {
        status: props.targetStatus,
        comment: localComment.value,
      });
    };

    watch(
      () => props.modelValue,
      (newVal) => {
        if (newVal) {
          localComment.value = "";
        }
      },
    );

    return {
      localComment,
      capitalizedStatus,
      cancel,
      submit,
    };
  },
});
</script>
