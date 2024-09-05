<template>
  <div class="account-view-container">

  <AccountSidebar/>
  <div>
    <h1>Account</h1>
    <router-view />
  </div>
  </div>

</template>

<script>
import AccountSidebar from '@/components/account/AccountSidebar.vue'
export default {
  name: 'AccountView',
  components: {
    AccountSidebar
  }
};
</script>

<style>
.account-view-container{

  display: flex;
  min-height: 100vh;
  flex-direction: row;
}
</style>
