<template>
  <HeroSection/>
  <PlansOverview/>
</template>

<script>
import HeroSection from '../components/decorations/HeroSection.vue';
import PlansOverview from "@/components/decorations/PlansOverview.vue";


export default {
  name: 'App',
  components: {
    PlansOverview,
    HeroSection,
  }
};
</script>


