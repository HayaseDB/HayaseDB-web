<template>
  <ConfirmModal
      v-if="showDeleteModal"
      :is-visible="showDeleteModal"
      title="Delete User"
      message="Are you sure you want to delete this user? This action cannot be undone."
      confirm-text="Delete"
      @confirmed="confirmDelete"
      @cancelled="showDeleteModal = false"
  />

  <div class="p-6 relative overflow-hidden bg-white rounded-2xl max-w-2xl mx-auto space-y-6 border border-gray-200">
    <LoadingOverlay :is-loading="loading" />

    <div v-if="user" class="space-y-6">
      <div class="flex items-center gap-4">
        <img
            :src="user.pfp?.url || placeholder"
            v-if="user.pfp?.url"
            :alt="`${user.username} profile picture`"
            class="w-20 h-20 rounded-xl object-cover border border-gray-200 bg-gray-100"
        />
        <div>
          <h2 class="text-2xl font-semibold text-gray-800">
            {{ user.username || 'Unnamed User' }}
          </h2>
          <p class="text-sm text-gray-500">{{ user.email || 'Email not provided' }}</p>
        </div>
      </div>

      <table class="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
        <thead class="bg-gray-50">
        <tr>
          <th class="px-4 py-2 text-left text-gray-600 font-medium">Field</th>
          <th class="px-4 py-2 text-left text-gray-600 font-medium">Value</th>
        </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
        <tr v-for="field in userFields" :key="field.label" class="hover:bg-gray-50 transition-colors">
          <td class="px-4 py-2 text-gray-700 font-medium">{{ field.label }}</td>
          <td
              class="px-4 py-2"
              :class="field.isStatus ? (field.value === 'Yes' ? 'text-green-600' : 'text-red-500') : 'text-gray-900'"
          >
            <span v-if="field.label === 'Role'" :class="roleTagClasses(field.value)">
              {{ field.value }}
            </span>
            <span v-else>
              {{ field.value }}
            </span>
          </td>
        </tr>
        </tbody>
      </table>

      <div class="flex items-end justify-between">
        <button
            @click="$router.go(-1)"
            class="text-gray-600 hover:text-gray-800 flex items-center"
        >
          <ChevronLeft />
          Back
        </button>
        <div class="flex flex-wrap gap-3 pt-4">
          <button
              class="px-4 py-2 text-sm rounded-lg border border-red-500 text-red-600 hover:bg-red-50 transition"
              v-if="isAdmin"
              @click="showDeleteModal = true"
          >
            Delete
          </button>
          <button
              v-if="!user.verified"
              class="px-4 py-2 text-sm rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 transition"
              @click="toggleVerification(true)"
          >
            Verify
          </button>

          <button
              v-else
              class="px-4 py-2 text-sm rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-50 transition"
              @click="toggleVerification(false)"
          >
            Unverify
          </button>

          <button
              class="px-4 py-2 text-sm rounded-lg border border-yellow-500 text-yellow-600 hover:bg-yellow-50 transition"
              @click="toggleBan"
          >
            {{ isBanned ? 'Unban' : 'Ban' }}
          </button>
        </div>
      </div>

    </div>

    <div v-else class="text-gray-500 text-center text-sm">User not found.</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import ConfirmModal from '@/components/common/modals/ConfirmModal.vue';
import { UserService } from '@/services';
import { userTypes } from "@/services/types";
const route = useRoute();
const userId = route.params.id as string;
import { useAuthStore } from '@/stores/auth';
import LoadingOverlay from "@/components/common/LoadingOverlay.vue";
import { ChevronLeft } from 'lucide-vue-next'
const authStore = useAuthStore();

const isAdmin = computed(() => authStore.user?.role === "admin");

const user = ref<userTypes.User | null>(null);
const loading = ref(true);
const isBanned = ref(false);
const showDeleteModal = ref(false);
const placeholder = '/default-avatar.png';

onMounted(fetchUser);

async function fetchUser() {
  loading.value = true;
  try {
    const data = await UserService.getUserProfile(userId);
    user.value = data;
    isBanned.value = data.banned ?? false;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}


const userFields = computed(() => {
  if (!user.value) return [];

  const formatDate = (date: string) =>
      new Date(date).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      });

  const capitalize = (s: string) =>
      s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  return [
    { label: 'Username', value: user.value.username },
    { label: 'Email', value: user.value.email || 'N/A' },
    { label: 'Role', value: user.value.role },
    { label: 'Verified', value: user.value.verified ? 'Yes' : 'No', isStatus: true },
    { label: 'Banned', value: user.value.banned ? 'Yes' : 'No', isStatus: true },
    { label: 'Created At', value: formatDate(user.value.createdAt) },
    { label: 'Updated At', value: formatDate(user.value.updatedAt) },
    { label: 'User ID', value: user.value.id },
  ];
});

const roleTagClasses = (role: any) => {
  const roleClasses: { [key: string]: string } = {
    admin: 'bg-red-100 text-red-800 text-sm px-2 py-1 rounded-lg border border-red-300',
    moderator: 'bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-lg border border-blue-300',
    user: 'bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded-lg border border-gray-300'
  };

  return roleClasses[role.toLowerCase()] || 'bg-gray-500 text-white';
};

async function confirmDelete() {
  showDeleteModal.value = false;
  try {
    const response = await UserService.deleteUser(userId);
    toast.success(response.message);
  } catch (error) {
    console.error(error);
  }
}

async function toggleVerification(verify: boolean) {
  try {
    if (verify) {
      const response = await UserService.verifyUser(userId);
      toast.success(response.message);
    } else {
      const response = await UserService.unverifyUser(userId);
      toast.success(response.message);
    }
    await fetchUser();
  } catch (error) {
    console.error(error);
  }
}

async function toggleBan() {
  try {
    if (!isBanned.value) {
      const response = await UserService.banUser(userId);
      toast.success(response.message);
    } else {
      const response = await UserService.unbanUser(userId);
      toast.success(response.message);
    }
    await fetchUser();
  } catch (error) {
    console.error(error);
  }
}

</script>
