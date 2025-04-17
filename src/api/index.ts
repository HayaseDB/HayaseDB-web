import { createApiClient as baseCreateApiClient } from "./client";
import { useAuthStore } from "@/stores/auth";
import router from "@/routers";

const api = baseCreateApiClient({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  getAccessToken: () => {
    try {
      const auth = useAuthStore();
      return auth.token || null;
    } catch (err) {
      console.warn("[API WARNING] Failed to get access token:", err);
      return null;
    }
  },
  onUnauthorized: () => {
    try {
      const auth = useAuthStore();
      auth.logout();
      router.push("/login");
    } catch (err) {
      console.warn("[API WARNING] Failed to handle unauthorized:", err);
    }
  },
  onError: (error) => {
    console.error("[API ERROR]", error);
  },
});

export default api;
