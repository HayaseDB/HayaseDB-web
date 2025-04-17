import api from "@/services/api.ts";
import { userTypes } from "@/services/types";
import { useAuthStore } from "@/stores/auth.store.ts";

export const UserService = {
  async getUserProfile(userId: string): Promise<userTypes.User> {
    const res = await api.get(`/users/${userId}`);
    return res.data;
  },

  async updateUserProfile(
    updateUserDto: userTypes.UpdateUserDto,
  ): Promise<userTypes.User> {
    const res = await api.patch("/users", updateUserDto);

    await useAuthStore().hydrateUser();

    return res.data;
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
