<template>
  <div class="developer-view">
    <h2>Developer Dashboard</h2>
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

<style>

</style>

