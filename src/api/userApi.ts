import { logger } from "@/utls/logger";
import axiosInstance from "./axiosInstance";

export const registerUserApi = async (data) => {
  try {
    const res = await axiosInstance.post("/users/register", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    logger.info("res from register user api => ", res);
    return res.data;
  } catch (error) {
    logger.warn("error in register user api", error);
    return error;
  }
};
