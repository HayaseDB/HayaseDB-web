
import { defineStore } from "pinia";
import { AuthService } from "@/services/endpoints/auth.service.ts";
import Cookies from "js-cookie";
import { User } from "@/services/types/user.type.ts";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    isRefreshing: false,
    lastRefreshTime: 0,
  }),

  getters: {
    getUser: (state) => state.user,
  },

  actions: {
    async ensureInitialUserData() {
      const token = Cookies.get("token");
      if (!token) {
        await this.logout();
        return;
      }

      if (!this.user) {
        const cachedUser = localStorage.getItem("user");
        if (cachedUser) {
          this.user = JSON.parse(cachedUser);
        } else {
          await this.refreshUser();
        }
      }
    },

    refreshUserInBackground() {
      const token = Cookies.get("token");
      if (!token) {
        return;
      }
      const now = Date.now();
      if (!this.isRefreshing && (now - this.lastRefreshTime > 30000)) {
        this.isRefreshing = true;

        this.refreshUser()
            .finally(() => {
              this.isRefreshing = false;
              this.lastRefreshTime = Date.now();
            });
      }
    },

    async hydrateUser(force = false) {
      const token = Cookies.get("token");
      if (!token) {
        await this.logout();
        return;
      }

      if (!this.user) {
        const cachedUser = localStorage.getItem("user");
        if (cachedUser) {
          this.user = JSON.parse(cachedUser);
        }
      }

      if (this.user && !force) {
        return;
      }

      await this.refreshUser();
    },

    async refreshUser() {
      try {
        const user = await AuthService.getMe();
        this.user = user;
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      } catch (error) {
        await this.logout();
        throw error;
      }
    },

    async logout() {
      this.user = null;
      localStorage.removeItem("user");
      Cookies.remove("token");
    },
  },
});