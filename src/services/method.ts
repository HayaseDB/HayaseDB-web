import api from "./api";

export const get = async (url: string, params?: object) => {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const post = async (url: string, data?: object) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const put = async (url: string, data?: object) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patch = async (url: string, data?: object) => {
  try {
    const response = await api.patch(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const del = async (url: string, params?: object) => {
  try {
    const response = await api.delete(url, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
