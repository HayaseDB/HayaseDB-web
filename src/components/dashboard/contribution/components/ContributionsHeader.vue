<template>
  <div
    class="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center"
  >
    <div>
      <h2 class="text-xl font-semibold text-gray-800 flex items-center">
        <template v-if="contribution?.anime">
          <router-link
            :to="`/explorer/animes/${contribution.anime.id.value}`"
            class="hover:underline text-blue-600"
          >
            {{ contribution.anime.title.value }}
          </router-link>
        </template>
        <template v-else>
          {{ contribution?.data?.title?.value || "Untitled Contribution" }}
          <span
            class="ml-2 bg-green-100 text-green-800 text-xs font-semibold py-1 px-2 rounded-md"
          >
            New
          </span>
        </template>
      </h2>

      <p class="text-gray-500 text-sm mt-1">
        Submitted on {{ formatDate(contribution?.createdAt) }}
      </p>
    </div>
    <div class="text-right">
      <span
        :class="[
          'px-3 py-1 text-xs font-semibold rounded-md',
          statusClass(contribution?.status),
        ]"
      >
        {{ contribution?.status?.toUpperCase() }}
      </span>
      <div
        v-if="
          contribution?.rejectionComment && contribution?.status === 'rejected'
        "
        class="text-xs mt-2 text-gray-500"
      >
        {{ contribution?.rejectionComment }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  contribution: {
    type: Object,
    required: true,
  },
  statusClass: {
    type: Function,
    required: true,
  },
  formatDate: {
    type: Function,
    required: true,
  },
});
</script>
