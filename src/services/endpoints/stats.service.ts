import api from "@/services/api.ts";
import { statsTypes } from "@/services/types";

export const StatsService = {
  async getStats(): Promise<statsTypes.Stats> {
    const res = await api.get("/stats");
    return res.data;
  },
};
