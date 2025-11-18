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

/**
 * Registers a new user
 * @param {RegisterUserData} data - The register user data
 * @returns {Promise<string>} - The response message or error message
 */
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
    throw error.message;
  }
};

/**
 * Login user
 *
 * This api is used to login user.
 *
 * @param {LoginUserData} data - The login data
 * @returns {Promise<object>} - The login response or error message
 */
export const loginUserApi = async (data: LoginUserData) => {
  try {
    const res = await axiosInstance.post("/api/v1/users/login", data);
    logger.info("res from login user api => ", res);
    return res.data;
  } catch (error: any) {
    logger.warn("error in login user api", error);
    throw error.message;
  }
};

/**
 * Logout user
 *
 * This api is used to logout user.
 *
 * @returns {Promise<object>} - The response object or error message
 */
export const logoutUserApi = async () => {
  try {
    const res = await axiosInstance.post("/api/v1/users/logout");
    logger.info("res from logout user api => ", res);
    return res.data;
  } catch (error: any) {
    logger.warn("error in logout user api", error);
    throw error.response?.data || error;
  }
};

/**
 * Refresh access token
 *
 * This api is used to refresh the access token.
 * If the access token is expired, this api will return a new access token.
 * If the access token is not expired, this api will return the same access token.
 *
 * @returns {Promise<string>} - The new access token or the same access token if it is not expired
 */
export const refreshAccessTokenApi = async () => {
  try {
    const res = await axiosInstance.post("/api/v1/users/refresh-token");
    logger.info("res from refresh access token user api => ", res);
    return res.data;
  } catch (error: any) {
    logger.warn("error in refresh access user api", error);
    throw error.message;
  }
};

/**
 * Change user password
 * @param {ChangePasswordData} data - The change password data
 * @returns {Promise<string>} - The response message or error message
 */

export const changePassUserApi = async (data: ChangePasswordData) => {
  try {
    const res = await axiosInstance.post("/api/v1/users/change-password", data);
    logger.info("res from change password user api => ", res);
    return res.data;
  } catch (error: any) {
    logger.warn("error in change password user api", error);
    throw error.message;
  }
};

/**
 * Update user account
 * @param {UpdateAccountData} data - The update account data
 * @returns {Promise<object>} - The updated user account or error message
 */
export const updateAccountUserApi = async (data: UpdateAccountData) => {
  try {
    const res = await axiosInstance.patch("/api/v1/users/update-account", data);
    logger.info("res from update account user api => ", res);
    return res.data;
  } catch (error: any) {
    logger.warn("error in update account user api", error);
    throw error.message;
  }
};

/**
 * Get current user
 * @returns {Promise<object>} - The current user or error message
 */
export const currentUserApi = async () => {
  try {
    const res = await axiosInstance.get("/api/v1/users/current-user");
    logger.info("res from current user api => ", res);
    return res.data;
  } catch (error: any) {
    logger.warn("error in current user api", error);
    throw error.message;
  }
};

/**
 * Update user avatar
 * @param {UpdateAvatarData} data - The update avatar data
 * @returns {Promise<string>} - The updated avatar or error message
 */
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
    throw error.message;
  }
};

/**
 * Update user thumbnail
 * @param {UpdateThumbnailData} data - The update thumbnail data
 * @returns {Promise<string>} - The updated thumbnail or error message
 */
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
    throw error.message;
  }
};

/**
 * Get user channel profile
 * @returns {Promise<object>} - The user channel profile or error message
 */
export const getUserChannelProfileApi = async () => {
  try {
    const res = await axiosInstance.get("/api/v1/users/c/:username");
    logger.info("res from getUserChannel api => ", res);
    return res.data;
  } catch (error: any) {
    logger.warn("error in getUserChannel api", error);
    throw error.message;
  }
};

/**
 * Get user watch history
 * @returns {Promise<string>} - The user watch history or error message
 */
export const getUserWatchHistoryApi = async () => {
  try {
    const res = await axiosInstance.get("/api/v1/users/history");
    logger.info("res from get user watch history api => ", res);
    return res.data;
  } catch (error: any) {
    logger.warn("error in get user watch history api", error);
    throw error.message;
  }
};
