<template>
  <div class="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
    <CoverField :field="anime.coverImage" />

    <GenericFieldCard :field="anime.status" />

    <GenericFieldCard :field="anime.type" />

    <AgeRatingField :field="anime.ageRating" />

    <GenericFieldCard :field="anime.studio" />

    <GenericFieldCard :field="anime.author" />

    <GenericFieldCard :field="anime.website" />
  </div>
</template>

<script setup lang="ts">
import GenericFieldCard from "./components/GenericFieldCard.vue";
import CoverField from "@/components/main/explorer/animes/fields/custom/CoverField.vue";
import AgeRatingField from "@/components/main/explorer/animes/fields/custom/AgeRatingField.vue";

defineProps<{ anime: any }>();
</script>
