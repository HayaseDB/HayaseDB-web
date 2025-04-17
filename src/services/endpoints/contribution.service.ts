import api from "@/services/api.ts";

export const ContributionService = {
  async createContribution(payload: any): Promise<void> {
    await api.post("/contributions", payload);
  },

  async suggestEdit(animeId: string, payload: any): Promise<void> {
    await api.post(`/contributions/${animeId}`, payload);
  },

  async updateContribution(
    contributionId: string,
    payload: any,
  ): Promise<void> {
    await api.patch(`/contributions/${contributionId}`, payload);
  },

  async updateContributionStatus(
    contributionId: string,
    status: any,
    comment?: string,
  ): Promise<void> {
    await api.patch(`/contributions/${contributionId}/${status}`, { comment });
  },

  async getContributions(query?: any): Promise<any> {
    const res = await api.get("/contributions", { params: query });
    return res.data;
  },

  async getMyContributions(query?: any): Promise<any> {
    const res = await api.get("/contributions/me", { params: query });
    return res.data;
  },

  async getContributionById(contributionId: string): Promise<any> {
    const res = await api.get(`/contributions/${contributionId}`);
    return res.data;
  },

  async deleteContribution(contributionId: string): Promise<void> {
    await api.delete(`/contributions/${contributionId}`);
  },

  async getSchema(): Promise<any> {
    const res = await api.get(`/contributions/schema`);
    return res.data;
  },
};
