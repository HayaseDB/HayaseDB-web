<template>
  <div class="space-y-5">
    <AnimeTitleField :title="anime.title" :bannerImage="anime.bannerImage" />

    <div v-if="anime.releaseDate.value || anime.genres.value" class="flex flex-row w-full gap-5">
      <GenericFieldCard card class="flex-1" :field="anime.releaseDate" />
      <GenericFieldCard card class="flex-1" :field="anime.genres" />
    </div>

    <GenericFieldCard card :field="anime.description" />

    <GenericFieldCard card :field="anime.trailer" type="Embed" />
  </div>
</template>

<script setup lang="ts">
import GenericFieldCard from "./components/GenericFieldCard.vue";
import AnimeTitleField from "@/components/main/explorer/animes/fields/custom/AnimeTitleField.vue";

defineProps<{ anime: any }>();
</script>
