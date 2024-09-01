<template>
    <div class="container">
      <LoginForm class="smooth-slide-in-bottom" />
    </div>

</template>

<style scoped>


.container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: var(--background-75);
  padding: 0 20px;
  min-height: 840px;
}


</style>

<script>
import LoginForm from '../components/AuthForm.vue'
export default {
  components: {
    LoginForm
  }
}
</script>