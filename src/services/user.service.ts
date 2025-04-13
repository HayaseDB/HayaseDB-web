import api from '@/services/api.ts';
import {User} from "@/services/auth.service.ts";

export interface UpdateUserDto {
    username?: string;
    email?: string;
    password?: string;
}

export const UserService = {
    async getUserProfile(userId: string): Promise<User> {
        try {
            const res = await api.get(`/users/${userId}`);
            return res.data;
        } catch (error: any) {
            throw new Error('Failed to fetch user profile.');
        }
    },

    async updateUserProfile(updateUserDto: UpdateUserDto): Promise<User> {
        try {
            const res = await api.patch('/users', updateUserDto);
            return res.data;
        } catch (error: any) {
            throw new Error('Failed to update user profile.');
        }
    },

    async uploadProfilePicture(file: File): Promise<User> {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await api.put('/users/pfp', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return res.data;
        } catch (error: any) {
            throw new Error('Failed to upload profile picture.');
        }
    },

    async getUserProfilePictureUrl(userId: string): Promise<string> {
        return `${api.defaults.baseURL}/users/pfp/${userId}`;
    },

    async deleteUser(userId: string): Promise<void> {
        try {
            await api.delete(`/users/${userId}`);
        } catch (error: any) {
            throw new Error('Failed to delete user.');
        }
    },
};
