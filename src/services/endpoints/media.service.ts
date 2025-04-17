import api from "@/services/api.ts";

export const MediaService = {
  async upload(file: File): Promise<{ id: string; url?: string }> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post("/media", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },

  async getMediaById(mediaId: string): Promise<any> {
    const res = await api.get(`/media/${mediaId}`);
    return res.data;
  },

  async deleteMedia(mediaId: string): Promise<void> {
    await api.delete(`/media/${mediaId}`);
  },
};
