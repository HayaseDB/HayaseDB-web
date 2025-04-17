<template>
  <div
    class="bg-white relative rounded-xl border border-gray-200 overflow-hidden"
  >
    <LoadingOverlay :is-loading="loading" />

    <template v-if="!loading">
      <ContributionHeader
        :contribution="contribution"
        :status-class="statusClass"
        :format-date="formatDate"
      />

      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ContributionField
            v-for="(value, key) in filteredFields"
            :key="key"
            :field-key="key"
            :field-value="contribution?.data[key]"
            :field-status="fieldStatus[key]"
            :get-field-size-class="getFieldSizeClass"
          />
        </div>
      </div>

      <ContributionFooter
        :contribution="contribution"
        :is-admin="isAdmin"
        :can-update="contribution?.status !== 'accepted'"
        @update-status="updateStatus"
      />

      <div
        class="border-t border-gray-200 px-6 py-4 flex justify-between items-center bg-white"
      >
        <router-link
          to="/dashboard/contributions"
          class="text-gray-600 hover:text-gray-800 flex items-center"
        >
          <ChevronLeft />
          Back to List
        </router-link>
        <button
          class="flex hover:cursor-pointer items-center px-3 py-2 text-sm text-red-600 hover:text-red-800"
          @click="confirmDelete"
        >
          <Trash2 class="w-4 h-4 mr-1" />
          Delete
        </button>
      </div>
    </template>

    <DeleteConfirmationModal
      v-model="showDeleteModal"
      :is-deleting="isDeleting"
      @confirm="deleteContribution"
    />

    <StatusUpdateModal
      v-model="showStatusModal"
      :is-updating="isUpdating"
      :target-status="targetStatus"
      :contribution-id="contributionId"
      @confirm="handleStatusUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft, Trash2 } from "lucide-vue-next";
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import lodash from "lodash";
import { ContributionService } from "@/services/endpoints/contribution.service.ts";
import { useAuthStore } from "@/stores/auth.store.ts";

import LoadingOverlay from "@/components/common/LoadingOverlay.vue";
import StatusUpdateModal from "@/components/dashboard/contribution/modals/StatusUpdateModal.vue";
import DeleteConfirmationModal from "@/components/dashboard/contribution/modals/DeleteConfirmationModal.vue";
import ContributionHeader from "@/components/dashboard/contribution/components/ContributionsHeader.vue";
import ContributionField from "@/components/dashboard/contribution/components/ContributionField.vue";
import ContributionFooter from "@/components/dashboard/contribution/components/ContributionsFooter.vue";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const contributionId = computed(() => route.params.id as string);
const contribution = ref<any | null>(null);
const loading = ref(true);
const showDeleteModal = ref(false);
const isDeleting = ref(false);
const showStatusModal = ref(false);
const isUpdating = ref(false);
const targetStatus = ref<string>("pending");
const differences = ref<number[]>([]);
const fieldStatus = ref<{
  [key: string]: "created" | "changed" | "deleted" | "default";
}>({});

const isAdmin = computed(() => authStore.user?.role === "admin");

const filteredFields = computed(() => {
  if (!contribution.value) return {};

  return Object.keys(contribution.value.data).reduce((acc, key) => {
    const dataValue = contribution?.value?.data[key];
    const anime = contribution?.value?.anime;
    const animeValue = anime ? lodash.get(anime, key) : undefined;

    const dataHasValue = dataValue?.value !== null;
    const animeHasValue =
      animeValue !== undefined && animeValue?.value !== null;

    if (dataHasValue || animeHasValue) {
      acc[key] = dataValue;
    }
    fieldStatus.value[key] = getFieldStatus(dataValue, animeValue);

    return acc;
  }, {});
});

const formatDate = (date: string): string =>
  date
    ? new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

const statusClass = (status: string): string =>
  ({
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  })[status] || "bg-gray-100 text-gray-800";

const getFieldSizeClass = (key: string): string =>
  ({
    description: "col-span-2",
    title: "col-span-2",
    bannerImage: "col-span-2",
    genres: "col-span-1",
  })[key] || "col-span-1";

const getFieldStatus = (
  dataValue: any,
  animeValue: any,
): "created" | "changed" | "deleted" | "default" => {
  if (!animeValue) {
    return "created";
  }
  if (
    dataValue &&
    typeof dataValue === "object" &&
    !Array.isArray(dataValue) &&
    animeValue &&
    typeof animeValue === "object" &&
    !Array.isArray(animeValue)
  ) {
    if (dataValue.url && animeValue.url) {
      return dataValue.url === animeValue.url ? "default" : "changed";
    }
  }

  if (animeValue.value === null && dataValue.value !== null) return "created";
  if (animeValue.value !== null && dataValue.value === null) return "deleted";
  if (
    animeValue.value !== null &&
    dataValue.value !== null &&
    !lodash.isEqual(dataValue.value, animeValue.value)
  )
    return "changed";

  return "default";
};

const fetchContribution = async (): Promise<void> => {
  loading.value = true;
  try {
    const result = await ContributionService.getContributionById(
      contributionId.value,
    );
    contribution.value = result;
    differences.value = findDifferences(result.data, result.anime);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const findDifferences = (data: any, anime: any | null): any[] => {
  if (!anime) return [];
  return Object.keys(data).filter(
    (key) => !lodash.isEqual(data[key], lodash.get(anime, key)),
  );
};

const confirmDelete = () => {
  showDeleteModal.value = true;
};

const deleteContribution = async () => {
  if (!contribution.value) return;
  isDeleting.value = true;
  try {
    await ContributionService.deleteContribution(contribution.value.id);
    await router
      .push("/dashboard/contributions")
      .then(() => toast.success("Contribution successfully deleted."));
  } catch (err) {
    console.error(err);
  } finally {
    isDeleting.value = false;
    showDeleteModal.value = false;
  }
};

const updateStatus = (status: string) => {
  targetStatus.value = status;
  showStatusModal.value = true;
};

const handleStatusUpdate = async ({
  status,
  comment,
}: {
  status: string;
  comment?: string;
}) => {
  if (!contribution.value) return;
  isUpdating.value = true;
  try {
    await ContributionService.updateContributionStatus(
      contribution.value.id,
      status,
      comment,
    );
    await fetchContribution();
    toast.success("Contribution status successfully updated.");
  } catch (err) {
    console.error(err);
  } finally {
    isUpdating.value = false;
    showStatusModal.value = false;
  }
};

onMounted(fetchContribution);
</script>
