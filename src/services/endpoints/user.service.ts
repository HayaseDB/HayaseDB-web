import api from "@/services/api.ts";
import { userTypes } from "@/services/types";
import { useAuthStore } from "@/stores/auth.store.ts";

export const UserService = {
  async getUserProfile(userId: string): Promise<userTypes.User> {
    const res = await api.get(`/users/${userId}`);
    return res.data;
  },

  async verifyUser(userId: string): Promise<any> {
    const res = await api.patch(`/users/${userId}/verify`);
    return res.data;
  },

  async unverifyUser(userId: string): Promise<any> {
    const res = await api.patch(`/users/${userId}/unverify`);
    return res.data;
  },

  async banUser(userId: string): Promise<any> {
    const res = await api.patch(`/users/${userId}/ban`);
    return res.data;
  },

  async unbanUser(userId: string): Promise<any> {
    const res = await api.patch(`/users/${userId}/unban`);
    return res.data;
  },

  async updateUserProfile(
    updateUserDto: userTypes.UpdateUserDto,
  ): Promise<userTypes.User> {
    const res = await api.patch("/users", updateUserDto);

    await useAuthStore().hydrateUser();

    return res.data;
  },
  async getUsers({
    page = 1,
    limit = 20,
    role,
    verified,
    search,
    sortColumn = "createdAt",
    sortDirection = "ASC",
  }: {
    page?: number;
    limit?: number;
    role?: string;
    verified?: boolean;
    search?: string;
    sortColumn?: string;
    sortDirection?: "ASC" | "DESC";
  }): Promise<{ items: userTypes.User[]; total: number; totalPages: number }> {
    try {
      const response = await api.get("/users", {
        params: {
          page,
          limit,
          role,
          verified,
          search,
          sortColumn,
          sortDirection,
        },
      });

      return {
        items: response.data.users,
        total: response.data.total,
        totalPages: response.data.totalPages,
      };
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  async uploadProfilePicture(file: File): Promise<userTypes.User> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await api.put("/users/pfp", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  async deleteUser(userId: string): Promise<void> {
    await api.delete(`/users/${userId}`);
  },
};
