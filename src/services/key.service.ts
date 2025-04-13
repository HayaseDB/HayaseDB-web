import api from '@/services/api.ts';

export interface Key {
    id: string;
    name: string;
    key: string;
}

export interface CreateKeyDto {
    name: string;
}

export const KeyService = {
    async createKey(createKeyDto: CreateKeyDto): Promise<Key> {
        try {
            const res = await api.post('/keys', createKeyDto);
            return res.data;
        } catch (error: any) {
            throw new Error('Failed to create API key.');
        }
    },

    async getKeys(): Promise<Key[]> {
        try {
            const res = await api.get('/keys');
            return res.data;
        } catch (error: any) {
            throw new Error('Failed to fetch API keys.');
        }
    },

    async validateKey(key: string): Promise<void> {
        try {
            await api.get(`/keys/check/${key}`);
        } catch (error: any) {
            throw new Error('API key is invalid or not found.');
        }
    },

    async deleteKey(id: string): Promise<void> {
        try {
            await api.delete(`/keys/${id}`);
        } catch (error: any) {
            throw new Error('Failed to delete API key.');
        }
    },

    async regenerateKey(id: string): Promise<Key> {
        try {
            const res = await api.patch(`/keys/${id}/regenerate`);
            return res.data;
        } catch (error: any) {
            throw new Error('Failed to regenerate API key.');
        }
    },
};
