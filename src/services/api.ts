import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "vue3-toastify";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const handleError = (error: any, fallbackMessage: string) => {
  const message = error?.response?.data?.message;

  if (Array.isArray(message)) {
    message.forEach((msg) => toast.error(msg));
  } else if (typeof message === "string") {
    toast.error(message);
  } else {
    toast.error(fallbackMessage);
  }

  throw new Error(message || fallbackMessage);
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            handleUnauthorized();
        }

        handleError(error, "API Error");
        return Promise.reject(error);
    },
);
const handleUnauthorized = () => {
    const authStore = useAuthStore();
    authStore.logout();
    toast.error("You are not authorized. Please log in again.");
};
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    handleError(error, "API Error");
    return Promise.reject(error);
  },
);

export default api;
