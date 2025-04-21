<template>
  <div
    class="max-w-7xl mx-auto mt-12 p-4 sm:p-8 bg-white rounded-2xl border border-gray-200 relative"
  >
    <h2 class="text-2xl sm:text-4xl font-semibold text-gray-800 mb-6">
      User Moderation
    </h2>
    <div class="flex flex-wrap gap-4 mb-6">
      <select
        v-model="filters.role"
        class="border px-3 py-2 rounded-md text-sm"
      >
        <option value="">All Roles</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="moderator">Moderator</option>
      </select>
      <select
        v-model="filters.verified"
        class="border px-3 py-2 rounded-md text-sm"
      >
        <option value="">All Verified Status</option>
        <option value="true">Verified</option>
        <option value="false">Not Verified</option>
      </select>
      <input
        v-model="filters.search"
        placeholder="Search for User"
        class="border px-3 py-2 rounded-md text-sm"
      />
    </div>
    <div
      v-if="!loading && users.length === 0"
      class="text-center text-gray-500 py-8"
    >
      No users found.
    </div>
    <div class="overflow-x-auto rounded-xl relative">
      <LoadingOverlay :is-loading="loading" />

      <table class="w-full table-auto border-collapse">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase"
            >
              Profile Picture
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase cursor-pointer select-none relative"
              @click="sort('username')"
            >
              <span class="mr-2">Username</span>
              <span
                v-if="sortColumn === 'username'"
                class="inline-block absolute right-0 top-1/2 transform -translate-y-1/2"
              >
                <ChevronUp
                  v-if="sortDirection === 'ASC'"
                  class="w-3 h-3 text-gray-600"
                />
                <ChevronDown
                  v-if="sortDirection === 'DESC'"
                  class="w-3 h-3 text-gray-600"
                />
              </span>
            </th>

            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase cursor-pointer select-none relative"
              @click="sort('email')"
            >
              Email
              <span
                v-if="sortColumn === 'email'"
                class="inline-block absolute right-0 top-1/2 transform -translate-y-1/2"
              >
                <ChevronUp
                  v-if="sortDirection === 'ASC'"
                  class="w-3 h-3 text-gray-600"
                />
                <ChevronDown
                  v-if="sortDirection === 'DESC'"
                  class="w-3 h-3 text-gray-600"
                />
              </span>
            </th>

            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase cursor-pointer select-none relative"
              @click="sort('role')"
            >
              Role
              <span
                v-if="sortColumn === 'role'"
                class="inline-block absolute right-0 top-1/2 transform -translate-y-1/2"
              >
                <ChevronUp
                  v-if="sortDirection === 'ASC'"
                  class="w-3 h-3 text-gray-600"
                />
                <ChevronDown
                  v-if="sortDirection === 'DESC'"
                  class="w-3 h-3 text-gray-600"
                />
              </span>
            </th>

            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase cursor-pointer select-none relative"
              @click="sort('verified')"
            >
              Verified
              <span
                v-if="sortColumn === 'verified'"
                class="inline-block absolute right-0 top-1/2 transform -translate-y-1/2"
              >
                <ChevronUp
                  v-if="sortDirection === 'ASC'"
                  class="w-3 h-3 text-gray-600"
                />
                <ChevronDown
                  v-if="sortDirection === 'DESC'"
                  class="w-3 h-3 text-gray-600"
                />
              </span>
            </th>

            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase cursor-pointer select-none relative"
              @click="sort('createdAt')"
            >
              Created
              <span
                v-if="sortColumn === 'createdAt'"
                class="inline-block absolute right-0 top-1/2 transform -translate-y-1/2"
              >
                <ChevronUp
                  v-if="sortDirection === 'ASC'"
                  class="w-3 h-3 text-gray-600"
                />
                <ChevronDown
                  v-if="sortDirection === 'DESC'"
                  class="w-3 h-3 text-gray-600"
                />
              </span>
            </th>

            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase hidden md:table-cell select-none"
            >
              ID
            </th>
          </tr>
        </thead>

        <tbody class="bg-white divide-y divide-gray-100">
          <tr
            v-for="user in users"
            :key="user.id"
            class="hover:bg-gray-50 cursor-pointer"
            @click="router.push(`/dashboard/admin/users/${user.id}`)"
          >
            <td class="px-4 py-4 text-sm text-gray-800">
              <img
                v-if="user.pfp?.url"
                :src="user.pfp.url"
                alt="Profile Picture"
                class="w-20 h-20 rounded-md object-cover"
              />
              <span v-else class="text-gray-400">No Image</span>
            </td>
            <td
              class="px-4 py-4 text-sm font-medium text-gray-800 truncate max-w-xs"
            >
              {{ user.username || "Untitled" }}
            </td>
            <td class="px-4 py-4 text-sm text-gray-600">{{ user.email }}</td>
            <td class="px-4 py-4 text-sm text-gray-600">{{ user.role }}</td>
            <td class="px-4 py-4 text-sm text-gray-600">
              <span
                :class="[
                  'text-xs font-medium px-2 py-1 rounded-md inline-block',
                  verifiedClass(user.verified),
                ]"
              >
                {{ user.verified ? "Verified" : "Not Verified" }}
              </span>
            </td>
            <td
              class="px-4 py-4 text-sm text-gray-500 hidden sm:table-cell whitespace-nowrap"
            >
              {{ formatDate(user.createdAt) }}
            </td>
            <td class="px-4 py-4 text-sm text-gray-500 hidden md:table-cell">
              <span class="font-mono text-xs">{{ user.id }}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="flex justify-between items-center mt-6 pt-4 border-t border-gray-200"
      >
        <button
          :disabled="page <= 1 || loading"
          class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium disabled:opacity-50"
          @click="prevPage"
        >
          Prev
        </button>
        <span class="text-sm text-gray-600"
          >Page {{ page }} of {{ totalPages }}</span
        >
        <button
          :disabled="page >= totalPages || loading"
          class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium disabled:opacity-50"
          @click="nextPage"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import LoadingOverlay from "@/components/common/LoadingOverlay.vue";
import { UserService } from "@/services/endpoints/user.service.ts";
import { useLocalStorage } from "@vueuse/core";
import { ChevronUp, ChevronDown } from "lucide-vue-next";

const router = useRouter();
const users = ref<any[]>([]);
const page = ref(1);
const total = ref(0);
const limit = 20;
const loading = ref(false);

const filters = useLocalStorage("user-filters", {
  role: "",
  verified: "",
  search: "",
});

const sortColumn = ref("createdAt");
const sortDirection = ref<"ASC" | "DESC">("DESC");

const sort = (column: string) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === "ASC" ? "DESC" : "ASC";
  } else {
    sortColumn.value = column;
    sortDirection.value = "ASC";
  }
  fetchUsers();
};

const fetchUsers = async () => {
  const { search, verified } = filters.value;
  const verifiedBoolean =
    verified === "true" ? true : verified === "false" ? false : undefined;
  loading.value = true;
  try {
    const res = await UserService.getUsers({
      page: page.value,
      limit,
      role: filters.value.role,
      verified: verifiedBoolean,
      search: search,
      sortColumn: sortColumn.value,
      sortDirection: sortDirection.value,
    });
    users.value = res.items ?? [];
    total.value = res.total ?? 0;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    users.value = [];
    total.value = 0;
  } finally {
    loading.value = false;
  }
};

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / limit)));

const nextPage = () => {
  if (page.value < totalPages.value) page.value++;
};

const prevPage = () => {
  if (page.value > 1) page.value--;
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const verifiedClass = (verified: boolean) => {
  return verified ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
};

watch([page, filters], fetchUsers, { deep: true });
onMounted(fetchUsers);
</script>
