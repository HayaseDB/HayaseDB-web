<template>
  <div class="field-container">
    <div v-if="youtubeId">
      <iframe
        class="w-full aspect-video rounded-xl"
        :src="`https://www.youtube.com/embed/${youtubeId}`"
        allowfullscreen
      ></iframe>
    </div>
    <div v-else-if="field.value">
      <a
        :href="field.value"
        target="_blank"
        class="text-blue-600 hover:text-blue-800 underline"
      >
        {{ displayUrl }}
      </a>
    </div>
    <p v-else class="text-gray-400 italic">No URL provided</p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
});

const displayUrl = computed(() => {
  if (!props?.field?.value) return "";
  try {
    return props.field.label;
  } catch {
    return props.field.value;
  }
});

const youtubeId = computed(() => {
  const url = props?.field?.value;
  if (!url) return null;

  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?&]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?&]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
});
</script>
