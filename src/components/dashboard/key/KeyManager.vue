<template>
  <div
    class="max-w-3xl mt-12 w-full relative p-8 bg-white rounded-2xl overflow-hidden border border-gray-200"
  >
    <h2 class="text-4xl font-semibold text-gray-800 mb-6">API Key Manager</h2>

    <div class="mb-6">
      <label for="keyName" class="block text-gray-700 font-medium mb-2"
        >API Key Name</label
      >
      <div class="flex-row flex space-x-2">
        <input
          id="keyName"
          v-model="newKeyName"
          type="text"
          placeholder="Enter a name for the new API key"
          class="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          :disabled="isCreating"
          @keyup.enter="createKey"
        />
        <div class="text-center">
          <button
            :disabled="isCreating || !newKeyName"
            aria-label="Create"
            class="w-25 h-full bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-300"
            @click="createKey"
          >
            <span v-if="isCreating">Creating...</span>
            <span v-else>Create</span>
          </button>
        </div>
      </div>
    </div>

    <div class="overflow-x-auto min-h-40 rounded-xl relative">
      <LoadingOverlay :is-loading="isLoading" />
      <div
        v-if="!isLoading && apiKeys.length === 0"
        class="text-center text-gray-500"
      >
        <p class="mb-2">No API keys found.</p>
      </div>

      <div v-else>
        <div
          v-for="key in apiKeys"
          :key="key.id"
          class="flex justify-between items-center p-4 mt-4 border border-gray-200 rounded-md"
        >
          <div>
            <p class="text-lg font-semibold text-gray-800">{{ key.name }}</p>
            <p class="text-sm text-gray-600">{{ key.id }}</p>
          </div>

          <div class="flex gap-2">
            <button
              :disabled="loadingKeyId === key.id && isProcessing"
              aria-label="Regenerate API Key"
              class="flex hover:cursor-pointer justify-center items-center h-10 w-10 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
              @click="showRegenerateModal(key.id)"
            >
              <span v-if="loadingKeyId === key.id && isProcessing">
                <span>Working...</span>
              </span>
              <span v-else>
                <RefreshCcw class="h-4 w-4" />
              </span>
            </button>

            <button
              :disabled="loadingKeyId === key.id && isProcessing"
              aria-label="Delete API Key"
              class="flex justify-center items-center hover:cursor-pointer h-10 w-10 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
              @click="showDeleteModal(key.id)"
            >
              <span v-if="loadingKeyId === key.id && isProcessing">
                <span>Deleting...</span>
              </span>
              <span v-else>
                <Trash2 class="h-4 w-4" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <ConfirmModal
      :is-visible="deleteModalVisible"
      title="Confirm Delete"
      message="Are you sure you want to delete this API key?"
      confirm-text="Delete"
      @confirmed="deleteKey"
      @cancelled="deleteModalVisible = false"
    />

    <RegenerateModal
      :is-visible="regenerateModalVisible"
      title="Regenerated API Key"
      :input-value="regeneratedKey"
      message="Save this key now. It won't be shown again."
      @cancelled="regenerateModalVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { KeyService } from "@/services/endpoints/key.service.ts";
import { RefreshCcw, Trash2 } from "lucide-vue-next";

import ConfirmModal from "@/components/common/modals/ConfirmModal.vue";
import RegenerateModal from "@/components/dashboard/key/modals/RegenerateModal.vue";
import LoadingOverlay from "@/components/common/LoadingOverlay.vue";
import { toast } from "vue3-toastify";

const isLoading = ref(true);
const isCreating = ref(false);
const isProcessing = ref(false);
const loadingKeyId = ref<string | null>(null);

const apiKeys = ref<any[]>([]);

const deleteModalVisible = ref(false);
const regenerateModalVisible = ref(false);
const regeneratedKey = ref<string>("");
const keyIdToDelete = ref<string | null>(null);

const newKeyName = ref("");

onMounted(async () => {
  await fetchKeys();
});

const fetchKeys = async () => {
  try {
    isLoading.value = true;
    apiKeys.value = await KeyService.getKeys();
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const createKey = async () => {
  if (!newKeyName.value) return;

  try {
    isCreating.value = true;
    const newKey = await KeyService.createKey({ name: newKeyName.value });
    apiKeys.value.unshift(newKey);
    newKeyName.value = "";
  } catch (error) {
    console.error(error);
  } finally {
    toast.success("Key created successfully.");
    isCreating.value = false;
  }
};

const showDeleteModal = (keyId: string) => {
  keyIdToDelete.value = keyId;
  deleteModalVisible.value = true;
};

const deleteKey = async () => {
  if (!keyIdToDelete.value) return;
  loadingKeyId.value = keyIdToDelete.value;
  isProcessing.value = true;

  try {
    await KeyService.deleteKey(keyIdToDelete.value);
    apiKeys.value = apiKeys.value.filter(
      (key) => key.id !== keyIdToDelete.value,
    );
  } catch (error) {
    console.error(error);
  } finally {
    toast.success("Key deleted successfully.");
    deleteModalVisible.value = false;
    isProcessing.value = false;
    loadingKeyId.value = null;
  }
};

const showRegenerateModal = (keyId: string) => {
  regenerateModalVisible.value = true;
  regenerateKey(keyId);
};

const regenerateKey = async (keyId: string) => {
  loadingKeyId.value = keyId;
  isProcessing.value = true;
  regeneratedKey.value = "";

  try {
    const result = await KeyService.regenerateKey(keyId);
    regeneratedKey.value = result.key;
  } catch (error) {
    console.error(error);
  } finally {
    isProcessing.value = false;
    loadingKeyId.value = null;
  }
};
</script>

<style scoped></style>
