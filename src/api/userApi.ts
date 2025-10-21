import { logger } from "@/utls/logger";
import axiosInstance from "./axiosInstance";
import type {
  ChangePasswordData,
  LoginUserData,
  RegisterUserData,
  UpdateAccountData,
  UpdateAvatarData,
  UpdateThumbnailData,
} from "./userApi.types";

export const registerUserApi = async (data: RegisterUserData) => {
  try {
    const res = await axiosInstance.post("/api/v1/users/register", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    logger.info("res from register user api => ", res);
    return res.data;
  } catch (error: any) {
    logger.warn("error in register user api", error);
    return error.message;
  }
};

export const loginUserApi = async (data: LoginUserData) => {
  try {
    logger.debug("data from loginUser",data)
    const res = await axiosInstance.post("/api/v1/users/login", data);
    logger.info("res from login user api => ", res);
    return res.data;
  } catch (error: any) {
    logger.warn("error in login user api", error);
    return error.message;
  }
};

export const logoutUserApi = async () => {
  try {
    const res = await axiosInstance.post("/api/v1/users/logout");
    logger.info("res from logout user api => ", res);
    return res.data;
  } catch (error: any) {
    logger.warn("error in logout user api", error);
    return error.message;
  }
};

export const refreshAccessTokenApi = async () => {
  try {
    const res = await axiosInstance.post("/api/v1/users/refresh-token");
    logger.info("res from refresh access token user api => ", res);
    return res.data;
  } catch (error: any) {
    logger.warn("error in refresh access user api", error);
    return error.message;
  }
};

export const changePassUserApi = async (data: ChangePasswordData) => {
  try {
    const res = await axiosInstance.post("/api/v1/users/change-password", data);
    logger.info("res from change password user api => ", res);
    return res.data;
  } catch (error: any) {
    logger.warn("error in change password user api", error);
    return error.message;
  }
};

export const updateAccountUserApi = async (data: UpdateAccountData) => {
  try {
    const res = await axiosInstance.patch("/api/v1/users/update-account", data);
    logger.info("res from update account user api => ", res);
    return res.data;
  } catch (error: any) {
    logger.warn("error in update account user api", error);
    return error.message;
  }
};

export const currentUserApi = async () => {
  try {
    const res = await axiosInstance.get("/api/v1/users/current-user");
    logger.info("res from current user api => ", res);
    return res.data;
  } catch (error: any) {
    logger.warn("error in current user api", error);
    return error.message;
  }
};

export const updateAvatarUserApi = async (data: UpdateAvatarData) => {
  try {
    const res = await axiosInstance.patch("/api/v1/users/avatar", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    logger.info("res from update avatar api => ", res);
    return res.data;
  } catch (error: any) {
    logger.warn("error in update avatar api", error);
    return error.message;
  }
};

export const updateThumbnailUserApi = async (data: UpdateThumbnailData) => {
  try {
    const res = await axiosInstance.patch("/api/v1/users//cover-image", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    logger.info("res from update thumbnail api => ", res);
    return res.data;
  } catch (error: any) {
    logger.warn("error in update thumbnail api", error);
    return error.message;
  }
};

export const getUserChannelProfileApi = async () => {
  try {
    const res = await axiosInstance.get("/api/v1/users/c/:username");
    logger.info("res from getUserChannel api => ", res);
    return res.data;
  } catch (error: any) {
    logger.warn("error in getUserChannel api", error);
    return error.message;
  }
};

export const getUserWatchHistoryApi = async () => {
  try {
    const res = await axiosInstance.get("/api/v1/users/history");
    logger.info("res from get user watch history api => ", res);
    return res.data;
  } catch (error: any) {
    logger.warn("error in get user watch history api", error);
    return error.message;
  }
};
