<template>
  <div class="releasedate-module background-card-sm">
    <label class="card-title">Release:</label>
    <div class="releasedate-container">
      {{ formattedReleaseDate }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'ReleaseDate',
  props: {
    releaseDate: {
      type: String,
      required: true
    }
  },
  computed: {
    formattedReleaseDate() {
      if (!this.releaseDate) return '';

      const date = new Date(this.releaseDate);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }
};
</script>

<style>
.releasedate-container{
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin-top: 5px;
}

</style>
