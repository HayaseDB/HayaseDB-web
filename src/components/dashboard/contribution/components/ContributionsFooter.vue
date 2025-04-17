<template>
  <div class="border-t border-gray-200 px-6 py-4 bg-gray-50">
    <div class="flex justify-between gap-6">
      <div>
        <div class="space-y-1">
          <span class="text-xs text-gray-500">Contribution ID</span>
          <code
            class="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-md block"
          >
            {{ contribution.id || "N/A" }}
          </code>
        </div>
        <div class="flex flex-row gap-6">
          <div v-if="isAdmin && contribution?.user" class="space-y-1 mt-3">
            <span class="text-xs text-gray-500">User</span>
            <div
              class="flex items-center gap-3 p-2 border border-gray-200 rounded-lg bg-white"
            >
              <span
                v-if="!contribution?.user?.pfp?.url"
                class="h-8 w-8 rounded-md bg-indigo-600 flex items-center justify-center text-white font-semibold"
              >
                {{
                  contribution?.user?.username.charAt(0).toUpperCase() || "U"
                }}
              </span>
              <img
                v-else
                :src="contribution?.user?.pfp?.url"
                alt="Profile Picture"
                class="w-10 h-10 rounded-lg object-cover"
              />

              <div class="flex-1">
                <p class="font-semibold pr-4 text-gray-900">
                  {{ contribution?.user?.username }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ contribution?.user?.role }} -
                  {{ contribution?.user?.plan }}
                </p>
              </div>
            </div>
          </div>
          <div v-if="isAdmin && contribution?.moderator" class="space-y-1 mt-3">
            <span class="text-xs text-gray-500">Moderator</span>
            <div
              class="flex items-center gap-3 p-2 border border-gray-200 rounded-lg bg-white"
            >
              <span
                v-if="!contribution?.moderator?.pfp?.url"
                class="h-8 w-8 rounded-md bg-indigo-600 flex items-center justify-center text-white font-semibold"
              >
                {{
                  contribution?.user?.username.charAt(0).toUpperCase() || "U"
                }}
              </span>
              <img
                v-else
                :src="contribution?.moderator?.pfp?.url"
                alt="Profile Picture"
                class="w-10 h-10 rounded-lg object-cover"
              />
              <div class="flex-1">
                <p class="font-semibold pr-4 text-gray-900">
                  {{ contribution?.moderator?.username }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ contribution?.moderator?.role }} -
                  {{ contribution?.moderator?.plan }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="isAdmin && canUpdate" class="flex pt-1 flex-col gap-2">
        <div class="flex flex-row gap-2">
          <button
            v-for="status in statuses"
            :key="status"
            :disabled="status === contribution.status"
            :class="[
              'px-3 py-1 text-xs font-medium rounded-md transition-all',
              status === contribution.status
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:opacity-90',
              getButtonClass(status),
            ]"
            @click="$emit('updateStatus', status)"
          >
            {{ capitalize(status) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  contribution: any;
  isAdmin: boolean;
  canUpdate?: boolean;
}>();

defineEmits<{
  (e: "updateStatus", status: string): void;
}>();

const statuses = ["pending", "accepted", "rejected"] as const;

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

const getButtonClass = (status: string): string => {
  const map: Record<string, string> = {
    pending: "bg-yellow-500 text-white",
    accepted: "bg-green-500 text-white",
    rejected: "bg-red-500 text-white",
  };
  return map[status] || "bg-gray-300 text-white";
};
</script>
