<template>
  <div>
    <p>Logging Out...</p>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from "@/stores/auth.store.js";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

export default {
  name: "LogoutView",
  async mounted() {
    const authStore = useAuthStore();
    const router = useRouter();
    await authStore.logout();
    router.push("/").then(() => toast.success("Logged out successfully!"));
  },
};
</script>
