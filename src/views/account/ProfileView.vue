<template>
  <div class="profile-view">
    <div class="profile-view-header">
      <h1>Profile Dashboard</h1>
      <hr class="header-hr" />
    </div>
    <ProfileSettings/>


  </div>

</template>

<script>
import ProfileSettings from "@/components/account/ProfileSettings.vue";

export default {
  components: {
    ProfileSettings
  },
  name: 'ProfileView',
};
</script>

