import api from "@/services/api.ts";
import { keyTypes } from "@/services/types";

export const KeyService = {
  async createKey(createKeyDto: keyTypes.CreateKeyDto): Promise<keyTypes.Key> {
    const res = await api.post("/keys", createKeyDto);
    return res.data;
  },

  async getKeys(): Promise<keyTypes.Key[]> {
    const res = await api.get("/keys");

    return res.data;
  },

  async validateKey(key: string): Promise<void> {
    await api.get(`/keys/check/${key}`);
  },

  async deleteKey(id: string): Promise<void> {
    await api.delete(`/keys/${id}`);
  },

  async regenerateKey(id: string): Promise<keyTypes.Key> {
    const res = await api.patch(`/keys/${id}/regenerate`);
    return res.data;
  },
};
