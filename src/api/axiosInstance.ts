import { conf } from "@/conf/conf";
import { useToast } from "@/hooks/useToast";
import { logger } from "@/utls/logger";
import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: conf.baseUrl,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const { showError } = useToast();

    if (!err.response) {
      // Network error / server unreachable
      logger.error("Network error", err);
      showError("Network error");
      return Promise.reject(new Error("Network error"));
    }

    const { status, data, config } = err.response;

    logger.info("status =>", status, "| data => ", data, "| config =>", config);

    // Handle unauthorized
    if (status === 401) {
      logger.error("Unauthorized", err);
      showError("Unauthorized");
      window.location.href = "/login";
    }

    // Handle server error
    const message =
      (data as any)?.message ||
      (status >= 500 ? "Server error" : "something went wrong");

    showError(message);

    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
