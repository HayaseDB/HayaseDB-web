<template>
  <div
    class="max-w-7xl mx-auto mt-12 p-4 sm:p-8 bg-white rounded-2xl border border-gray-200 relative"
  >
    <LoadingOverlay :is-loading="loading" />

    <h2 class="text-2xl sm:text-4xl font-semibold text-gray-800 mb-6">
      Contribution Moderation
    </h2>

    <div class="flex flex-wrap gap-4 mb-6">
      <select
        v-model="filters.status"
        class="border px-3 py-2 rounded-md text-sm"
      >
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
      </select>
      <input
        v-model="filters.userId"
        placeholder="Filter by User ID"
        class="border px-3 py-2 rounded-md text-sm"
      />
      <input
        v-model="filters.animeId"
        placeholder="Filter by Anime ID"
        class="border px-3 py-2 rounded-md text-sm"
      />
    </div>

    <div
      v-if="!loading && contributions.length === 0"
      class="text-center text-gray-500 py-8"
    >
      No contributions found.
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full table-auto border-collapse">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase"
            >
              Title

            </th>
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase"
            >
              User
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase"
            >
              Status
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase hidden sm:table-cell"
            >
              Created
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase hidden md:table-cell"
            >
              ID
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr
            v-for="contribution in contributions"
            :key="contribution.id"
            class="hover:bg-gray-50 cursor-pointer"
            @click="router.push(`/dashboard/contributions/${contribution.id}`)"
          >
            <td
              class="px-4 py-4 text-sm font-medium text-gray-800 truncate max-w-xs"
            >
              {{
                contribution.anime?.title ||
                contribution.data?.title ||
                "Untitled"
              }}
              <span
                  v-if="!contribution.anime"
                  class="ml-2 bg-green-100 text-green-800 text-xs font-semibold py-1 px-2 rounded-md"
              >
                  New
                </span>
            </td>
            <td class="px-4 py-4 text-sm text-gray-600">
              {{ contribution.user?.username || contribution.userId }}
            </td>
            <td class="px-4 py-4">
              <span
                :class="[
                  'text-xs font-medium px-2 py-1 rounded-md inline-block',
                  statusClass(contribution.status),
                ]"
              >
                {{ contribution.status }}
              </span>
            </td>
            <td
              class="px-4 py-4 text-sm text-gray-500 hidden sm:table-cell whitespace-nowrap"
            >
              {{ formatDate(contribution.createdAt) }}
            </td>
            <td class="px-4 py-4 text-sm text-gray-500 hidden md:table-cell">
              <span class="font-mono text-xs">{{ contribution.id }}</span>
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
import { ref, watch, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import LoadingOverlay from "@/components/common/LoadingOverlay.vue";
import { ContributionService } from "@/services/endpoints/contribution.service";
import isUUID from "validator/lib/isUUID";
import {useLocalStorage} from "@vueuse/core";

const router = useRouter();

const contributions = ref<any[]>([]);
const page = ref(1);
const total = ref(0);
const limit = 20;
const loading = ref(false);
const filters = useLocalStorage("contribution-filters", {
  status: "",
  userId: "",
  animeId: "",
});
const fetchContributions = async () => {
  const { userId, animeId } = filters.value;

  if ((userId && !isUUID(userId)) || (animeId && !isUUID(animeId))) {
    contributions.value = [];
    total.value = 0;
    return;
  }

  loading.value = true;

  try {
    const res = await ContributionService.getContributions({
      page: page.value,
      limit,
      ...filters.value,
    });
    contributions.value = res.items ?? [];
    total.value = res.total ?? 0;
  } catch (error) {
    console.error("Failed to fetch contributions:", error);
    contributions.value = [];
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

const statusClass = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "accepted":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

watch([page, filters], fetchContributions, { deep: true });
onMounted(fetchContributions);
</script>
