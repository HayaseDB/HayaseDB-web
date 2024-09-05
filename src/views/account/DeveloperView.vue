<template>
  <div class="developer-view">
    <h1>Developer Dashboard</h1>
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

