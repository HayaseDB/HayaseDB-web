<template>
  <div class="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-2xl border border-gray-200">
    <h2 class="text-4xl font-semibold text-gray-800 mb-6">Profile Settings</h2>

    <div class="flex flex-col sm:flex-row items-center gap-6 mb-10">
      <div class="relative">
        <img
            v-if="userPfpUrl"
            :src="userPfpUrl"
            alt="Profile Picture"
            class="w-32 h-32 sm:w-40 sm:h-40 rounded-md object-cover"
        />
        <div
            v-else
            class="w-32 h-32 sm:w-40 sm:h-40 rounded-md bg-gray-200 flex items-center justify-center text-gray-600 text-3xl"
        >
          <span class="material-icons">person</span>
        </div>
      </div>

      <div class="flex flex-col mt-4 sm:mt-0">
        <label class="text-sm font-semibold text-gray-700 mb-2">Change Profile Picture</label>
        <input
            type="file"
            @change="onFileSelected"
            accept="image/*"
            class="block w-full text-sm text-gray-700 border border-gray-300 rounded-md p-3 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
      </div>
    </div>

    <form @submit.prevent="updateProfile" class="grid grid-cols-1 gap-8">
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Username</label>
        <input
            v-model="form.username"
            :placeholder="original.username"
            type="text"
            class="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
        />
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
        <input
            v-model="form.email"
            :placeholder="original.email"
            type="email"
            class="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
        />
      </div>

      <div class="flex flex-col sm:flex-row gap-6">
        <div class="flex-1">
          <label class="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
          <input
              v-model="form.password"
              type="password"
              placeholder="Enter new password"
              class="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
          />
        </div>

        <div class="flex-1">
          <label class="block text-sm font-semibold text-gray-700 mb-2">Repeat New Password</label>
          <input
              v-model="form.repeatPassword"
              type="password"
              placeholder="Repeat new password"
              class="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
          />
        </div>
      </div>

      <div v-if="errorMessage" class=" text-red-600 font-semibold bg-red-50 border border-red-600 p-4 rounded-md flex items-center justify-end transition-all duration-300 opacity-100" v-bind:class="{'opacity-0': isSubmitting}">
        <span>{{ errorMessage }}</span>
      </div>

      <div class="flex justify-end">
        <button
            type="submit"
            :disabled="!isProfileChanged || isSubmitting || !passwordsMatch"
            class="px-8 py-3 bg-blue-600 text-white font-semibold rounded-md  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-300"
        >
          <span v-if="isSubmitting">Saving...</span>
          <span v-else>Save Changes</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { AuthService } from '@/services/auth.service.ts';
import { UserService } from '@/services/user.service.ts';
import { useAuthStore } from '@/stores/auth.store.ts';

const authStore = useAuthStore();
const isSubmitting = ref(false);
const form = ref({
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
});

const original = ref({
  username: '',
  email: '',
});

const userPfpUrl = ref<string | null>(null);
const selectedFile = ref<File | null>(null);

const errorMessage = ref<string | null>(null);

const passwordsMatch = computed(() => {

    if (form.value.password || form.value.repeatPassword) {
    if (form.value.password !== form.value.repeatPassword) {
      errorMessage.value = 'The passwords do not match. Please check and try again.';
      return false;
    }
    errorMessage.value = null;
  }
  return true;
});

const isProfileChanged = computed(() => {
  const isUsernameChanged = form.value.username !== original.value.username && form.value.username !== '';
  const isEmailChanged = form.value.email !== original.value.email && form.value.email !== '';
  const isProfilePictureChanged = selectedFile.value !== null;
  const isPasswordChanged = form.value.password !== '';

  return isUsernameChanged || isEmailChanged || isProfilePictureChanged || isPasswordChanged;
});

onMounted(async () => {
  try {
    const user = await AuthService.getMe();
    original.value.username = user.username;
    original.value.email = user.email ?? '';
    userPfpUrl.value = await UserService.getUserProfilePictureUrl(user.userId);
  } catch (error: any) {
    errorMessage.value = 'Failed to load user data. Please try again later.';
    console.error(error);
  }
});

const updateProfile = async () => {
  try {
    isSubmitting.value = true;
    errorMessage.value = null;

    const updatedData: any = {
      username: form.value.username || original.value.username,
      email: form.value.email || original.value.email,
    };

    if (form.value.password) {
      updatedData.password = form.value.password;
    }

    await UserService.updateUserProfile(updatedData);

    if (selectedFile.value) {
      await UserService.uploadProfilePicture(selectedFile.value);
      userPfpUrl.value = await UserService.getUserProfilePictureUrl(authStore.user!.userId);
      selectedFile.value = null;
    }

    await authStore.hydrateUser();

    window.location.reload();
  } catch (error: any) {
    errorMessage.value = 'Something went wrong. Please try again.';
    console.error(error);
  } finally {
    isSubmitting.value = false;
  }
};

const onFileSelected = (e: Event) => {
  const file = (e.target as HTMLInputElement)?.files?.[0];
  if (!file) return;

  selectedFile.value = file;
};
</script>
