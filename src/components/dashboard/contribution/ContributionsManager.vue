<template>
  <div
    class="max-w-6xl overflow-hidden mx-auto mt-12 p-4 sm:p-8 relative bg-white rounded-2xl border border-gray-200"
  >
    <LoadingOverlay :is-loading="loading" />

    <h2 class="text-2xl sm:text-4xl font-semibold text-gray-800 mb-6">
      Contributions
    </h2>

    <div
      v-if="!loading && contributions.length === 0"
      class="text-center text-gray-500 py-8"
    >
      You haven't made any contributions yet.
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full table-auto border-collapse">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider w-sm"
            >
              Title
            </th>
            <th
              class="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider w-40"
            >
              Status
            </th>
            <th
              class="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell"
            >
              Created At
            </th>
            <th
              class="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell"
            >
              ID
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr
            v-for="contribution in contributions"
            :key="contribution.id"
            class="hover:bg-gray-50 transition"
            @click="router.push(`/dashboard/contributions/${contribution.id}`)"
          >
            <td class="px-3 sm:px-6 py-4">
              <div class="text-sm font-medium text-gray-800 truncate max-w-xs">
                {{
                  contribution?.anime?.title ||
                  contribution?.data?.title ||
                  "Untitled"
                }}
                <span
                  v-if="!contribution.anime"
                  class="ml-2 bg-green-100 text-green-800 text-xs font-semibold py-1 px-2 rounded-md"
                >
                  New
                </span>
              </div>

              <div class="text-xs text-gray-500 sm:hidden mt-1">
                {{ formatDate(contribution.createdAt) }}
              </div>
            </td>
            <td class="px-3 sm:px-6 py-4">
              <span
                :class="[
                  'text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-md inline-block',
                  statusClass(contribution.status),
                ]"
              >
                {{ contribution.status }}
              </span>
            </td>
            <td
              class="px-3 sm:px-6 py-4 text-sm text-gray-500 hidden sm:table-cell whitespace-nowrap"
            >
              {{ formatDate(contribution.createdAt) }}
            </td>
            <td
              class="px-3 sm:px-6 py-4 text-sm text-gray-500 hidden md:table-cell"
            >
              <span class="font-mono text-xs">{{
                contribution.id || "Undefined"
              }}</span>
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
import { computed, onMounted, ref, watch } from "vue";
import { ContributionService } from "@/services/endpoints/contribution.service.ts";
import LoadingOverlay from "@/components/common/LoadingOverlay.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const contributions = ref<any[]>([]);
const page = ref(1);
const limit = 10;
const total = ref(0);
const loading = ref(true);

const fetchContributions = async () => {
  loading.value = true;
  try {
    const res = await ContributionService.getMyContributions({
      page: page.value,
      limit,
    });
    contributions.value = res.items ?? [];
    total.value = res.total ?? 0;
  } catch (err) {
    console.error("Failed to fetch contributions:", err);
  } finally {
    loading.value = false;
  }
};

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / limit)));

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++;
  }
};

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
  }
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

onMounted(fetchContributions);
watch(page, fetchContributions);
</script>
