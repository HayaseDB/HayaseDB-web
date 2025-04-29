<template>
  <div class="flex flex-col flex-1">
    <iframe
      ref="iframe"
      :src="iframeSrc"
      class="flex-1 w-full border-none"
      @load="sendDataToIframe"
    ></iframe>
  </div>
</template>

<script setup>
import { ref } from "vue";

const iframeSrc = "/stoplight/stoplight.html";
const iframe = ref(null);

const sendDataToIframe = () => {
  iframe.value.contentWindow.postMessage(
    import.meta.env.VITE_API_BASE_URL + "/doc.json",
    "*",
  );
};
</script>
