import api from "@/services/api.ts";

export const AnimeService = {
  async create(payload: any): Promise<void> {
    await api.post("/animes", payload);
  },

  async getAnimeById(id: string): Promise<any> {
    const res = await api.get(`/animes/${id}`);
    return res.data;
  },

  async updateAnime(id: string, payload: any): Promise<void> {
    await api.patch(`/animes/${id}`, payload);
  },

  async deleteAnime(id: string): Promise<void> {
    await api.delete(`/animes/${id}`);
  },

  async searchAnimes(
    filters: any = {},
    queryParams: {
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: "ASC" | "DESC";
      caseSensitive?: boolean;
    } = {},
  ): Promise<any> {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "DESC",
      caseSensitive = false,
    } = queryParams;

    const res = await api.post("/animes/search", filters, {
      params: {
        page,
        limit,
        sortBy,
        sortOrder,
        caseSensitive,
      },
    });
    return res.data;
  },
};
