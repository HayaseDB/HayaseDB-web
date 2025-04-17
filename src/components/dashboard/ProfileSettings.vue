<template>
  <div
    class="max-w-3xl relative mx-auto mt-12 p-8 bg-white rounded-2xl overflow-hidden border border-gray-200"
  >
    <LoadingOverlay :is-loading="isSubmitting" />
    <h2 class="text-4xl font-semibold text-gray-800 mb-6">Profile Settings</h2>

    <div class="flex flex-col sm:flex-row items-center gap-6 mb-10">
      <div class="relative">
        <img
          v-if="authStore.getUser?.pfp?.url"
          :src="authStore.getUser?.pfp?.url"
          alt="Profile Picture"
          class="w-32 h-32 sm:w-40 sm:h-40 rounded-md object-cover"
        />
        <div
          v-else
          class="w-32 h-32 sm:w-40 sm:h-40 rounded-md bg-gray-200 flex items-center justify-center text-gray-600 text-3xl"
        >
          <span class="material-icons">N/A</span>
        </div>
      </div>

      <div class="flex flex-col mt-4 sm:mt-0">
        <label class="text-sm font-semibold text-gray-700 mb-2"
          >Change Profile Picture</label
        >
        <input
          type="file"
          accept="image/*"
          class="block w-full text-sm text-gray-700 border border-gray-300 rounded-md p-3 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          @change="onFileSelected"
        />
      </div>
    </div>

    <form class="grid grid-cols-1 gap-8" @submit.prevent="updateProfile">
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2"
          >Username</label
        >
        <input
          v-model="form.username"
          :placeholder="authStore.user?.username || ''"
          type="text"
          class="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
        />
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2"
          >Email</label
        >
        <input
          v-model="form.email"
          :placeholder="authStore.user?.email || ''"
          type="email"
          class="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
        />
      </div>

      <div class="flex flex-col sm:flex-row gap-6">
        <div class="flex-1">
          <label class="block text-sm font-semibold text-gray-700 mb-2"
            >New Password</label
          >
          <input
            v-model="form.password"
            type="password"
            placeholder="Enter new password"
            class="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
          />
        </div>

        <div class="flex-1">
          <label class="block text-sm font-semibold text-gray-700 mb-2"
            >Repeat New Password</label
          >
          <input
            v-model="form.repeatPassword"
            type="password"
            placeholder="Repeat new password"
            :class="[
              'w-full px-4 py-3 rounded-md border focus:ring-2 focus:outline-none transition duration-300',
              !passwordsMatch
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500',
            ]"
          />
          <p v-if="!passwordsMatch" class="text-sm text-red-600 mt-1">
            Passwords do not match.
          </p>
        </div>
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          :disabled="!canSubmit"
          class="px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-300"
        >
          <span v-if="isSubmitting">Saving...</span>
          <span v-else>Save Changes</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth.store.ts";
import { UserService } from "@/services/endpoints/user.service.ts";
import { toast } from "vue3-toastify";
import LoadingOverlay from "@/components/common/LoadingOverlay.vue";

const authStore = useAuthStore();
const isSubmitting = ref(false);
const selectedFile = ref<File | null>(null);

const form = ref({
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
});

const passwordsMatch = computed(() => {
  const { password, repeatPassword } = form.value;
  return !password || password === repeatPassword;
});

const isFormDirty = computed(() => {
  if (!authStore.user) return false;

  return (
    form.value.username.trim() !== "" ||
    form.value.email.trim() !== "" ||
    form.value.password.trim() !== "" ||
    selectedFile.value !== null
  );
});

const canSubmit = computed(
  () => isFormDirty.value && passwordsMatch.value && !isSubmitting.value,
);

const updateProfile = async () => {
  if (!authStore.user) return;

  try {
    isSubmitting.value = true;

    const updates = {};
    if (form.value.username.trim()) updates.username = form.value.username;
    if (form.value.email.trim()) updates.email = form.value.email;
    if (form.value.password) updates.password = form.value.password;

    if (Object.keys(updates).length > 0) {
      await UserService.updateUserProfile(updates);
    }

    if (selectedFile.value) {
      await UserService.uploadProfilePicture(selectedFile.value);
      selectedFile.value = null;
    }
    toast.success("Profile updated Successfully.");
    form.value = { username: "", email: "", password: "", repeatPassword: "" };
  } catch (error) {
    console.log(error);
  } finally {
    await authStore.hydrateUser(true);
    isSubmitting.value = false;
  }
};

const onFileSelected = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) selectedFile.value = file;
};
</script>
