<template>
  <div>
    <h1>Profile Settings</h1>
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

