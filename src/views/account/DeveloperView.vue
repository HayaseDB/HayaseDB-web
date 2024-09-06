<template>
  <div class="developer-view">
    <div class="developer-view-header">
      <h1>Developer Dashboard</h1>
      <hr class="header-hr" />
    </div>


    <ApiKeyManager/>
  </div>
</template>

<script>
import ApiKeyManager from "@/components/account/ApiKeyManager.vue";
export default {
  name: 'DeveloperView',
  components: {
    ApiKeyManager
  }
};
</script>
