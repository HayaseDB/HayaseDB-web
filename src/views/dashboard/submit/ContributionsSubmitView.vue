<template>
  <div class="max-w-6xl mx-auto">
    <ContributionsSubmit :initial-values="initialValues" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import ContributionsSubmit from "@/components/dashboard/submit/ContributionsSubmit.vue";
import { AnimeService } from "@/services";

const route = useRoute();
const initialValues = ref(null);

onMounted(async () => {
  const contributionId = route.params.id;
  if (contributionId) {
    try {
      initialValues.value = await AnimeService.getAnimeById(contributionId);
    } catch (error) {
      console.error("Failed to fetch contribution:", error);
    }
  }
});
</script>
