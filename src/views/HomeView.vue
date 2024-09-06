<template>
  <HeroSection/>
  <ProjectOverview/>

  <TeamOverview/>
  <PlansOverview/>
</template>

<script>
import HeroSection from '@/components/decorations/HeroSection.vue';
import PlansOverview from "@/components/decorations/PlansOverview.vue";
import ProjectOverview from "@/components/decorations/ProjectStats.vue";
import TeamOverview from "@/components/decorations/TeamOverview.vue";


export default {
  name: 'App',
  components: {
    TeamOverview,
    ProjectOverview,
    PlansOverview,
    HeroSection,
  }
};
</script>


