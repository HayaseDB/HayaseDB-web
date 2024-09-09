<template>
  <div class="title-module background-card-sm">
    <div class="title-container">
      {{ title }}
    </div>
    <div class="id-container">
      {{ id }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthorModule',
  props: {
    title: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: false
    }
  }
};
</script>

<style scoped>
.title-container {
  font-size: 30px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
}
.id-container {
  font-size: 13px;
  font-weight: 300;
  color: var(--accent-300);
  display: flex;
  flex-direction: row;
}


.title-module{
  padding-left: 27px;
  padding-right: 27px;
}
</style>
