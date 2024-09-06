<template>
    <div class="account-view-container">

      <AccountSidebar/>
      <div class="account-view-content-wrapper">

      <div class="account-content-container">
        <router-view />
      </div>
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
  background-color: var(--background-75);
  display: flex;
  min-height: 100vh;
  flex-direction: row;
}

.account-content-container{
  display: block;
  box-sizing: border-box;
  width: 100%;

  margin: 140px auto 0;
  max-width: 1200px;

}

.account-view-content-wrapper{
  margin: 0 15px 50px;
  width: 100%;
}
</style>
