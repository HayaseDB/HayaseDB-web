<template>
  <div class="flex flex-col flex-1">
    <iframe
        ref="iframe"
        :src="iframeSrc"
        class="flex-1 w-full border-none"
    ></iframe>
  </div>
</template>

<script setup>
const iframeSrc = '/stoplight/stoplight.html';
</script>
