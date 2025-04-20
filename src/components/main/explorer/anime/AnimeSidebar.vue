<template>
  <div class="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
      <CoverField :field="anime.coverImage" />


      <GenericFieldCard :field="anime.status" />

      <GenericFieldCard :field="anime.type" />

      <GenericFieldCard :field="anime.studio" />

      <GenericFieldCard :field="anime.mainDirector" />

      <GenericFieldCard :field="anime.musicComposer" />

      <GenericFieldCard :field="anime.officialWebsiteUrl" />
  </div>
</template>

<script setup lang="ts">
import GenericFieldCard from "./components/GenericFieldCard.vue";
import CoverField from "@/components/main/explorer/anime/fields/custom/CoverField.vue";

defineProps<{ anime: any }>();
</script>
