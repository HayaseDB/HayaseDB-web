import { defineStore } from "pinia";
import { AuthService } from "@/services/endpoints/auth.service.ts";
import Cookies from "js-cookie";
import { User } from "@/services/types/user.type.ts";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    getUser: (state) => state.user,
  },

  actions: {
    async hydrateUser(force?: boolean) {
      const token = Cookies.get("token");
      if (!token) {
        await this.logout();
        return;
      }
      if (this.user && !force) {
        return;
      }

      try {
        this.user = await AuthService.getMe();
      } catch {
        await this.logout();
      }
    },

    async logout() {
      this.user = null;
      Cookies.remove("token");
    },
  },
});
