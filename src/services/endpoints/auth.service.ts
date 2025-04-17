import api from "@/services/api.ts";
import Cookies from "js-cookie";
import { useAuthStore } from "@/stores/auth.store.ts";
import { userTypes } from "@/services/types";

export const AuthService = {
  async login(email: string, password: string): Promise<void> {
    const payload = { email, password };
    const authStore = useAuthStore();

    const res = await api.post("/auth/login", payload);

    if (res.data.token) {
      Cookies.set("token", res.data.token);
    }
    await authStore.hydrateUser();
  },
  async register(email: string, password: string): Promise<void> {
    const payload = { email, password };
    await api.post("/auth/register", payload);
  },
  async getMe(): Promise<userTypes.User> {
    const res = await api.get("/auth/me");
    return res.data.user;
  },
  async isAuthenticated(): Promise<boolean> {
    const authStore = useAuthStore();
    return authStore.user !== null;
  },
};
