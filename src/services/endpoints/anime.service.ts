import api from "@/services/api.ts";

export const AnimeService = {
  async create(payload: any): Promise<void> {
    await api.post("/animes", payload);
  },

  async getAnimeById(contributionId: string): Promise<any> {
    const res = await api.get(`/animes/${contributionId}`);
    return res.data;
  },
};
