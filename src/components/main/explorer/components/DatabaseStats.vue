<template>
  <h2 class="text-xl font-bold mb-4">Database Stats</h2>
  <table class="w-full">
    <thead class="bg-gray-100">
      <tr>
        <th class="text-left p-2">Statistic</th>
        <th class="text-left p-2">Value</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(value, key) in stats"
        :key="key"
        class="border-t border-gray-200"
      >
        <td class="p-2">{{ key }}</td>
        <td class="p-2">{{ value }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
defineProps({
  stats: {
    type: Object,
    required: true,
  },
});
</script>
