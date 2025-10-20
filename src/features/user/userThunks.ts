// src/features/user/userThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  currentUserApi,
  getUserWatchHistoryApi,
  loginUserApi,
  logoutUserApi,
  refreshAccessTokenApi,
  registerUserApi,
  updateAccountUserApi,
  updateAvatarUserApi,
} from "../../api/userApi";

import type {
  LoginUserData,
  RegisterUserData,
  UpdateAccountData,
  UpdateAvatarData,
} from "../../api/userApi.types";
import { logger } from "@/utls/logger";

// Register
export const registerUser = createAsyncThunk(
  "user/register",
  async (data: RegisterUserData, { rejectWithValue }) => {
    try {
      const res = await registerUserApi(data);
      logger.info("register user from user thunks", res);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "user/login",
  async (data: LoginUserData, { rejectWithValue }) => {
    try {
      const res = await loginUserApi(data);
      logger.info("login user from user thunks", res);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// logout
export const LogoutUser = createAsyncThunk(
  "/user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await logoutUserApi();
      logger.info("logout from user thunks", res);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// refresh access token
export const refreshAccessToken = createAsyncThunk(
  "/user/refreshAccessToken",
  async (_, { rejectWithValue }) => {
    try {
      const res = await refreshAccessTokenApi();
      logger.info("refresh access token from user thunks", res);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get current user
export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await currentUserApi();
      logger.info("current user from user thunks", res);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// update account
export const updateAccount = createAsyncThunk(
  "user/updateAccount",
  async (data: UpdateAccountData, { rejectWithValue }) => {
    try {
      const res = await updateAccountUserApi(data);
      logger.info("update account user from user thunks", res);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// update avatar
export const updateAvatar = createAsyncThunk(
  "user/updateAvatar",
  async (data: UpdateAvatarData, { rejectWithValue }) => {
    try {
      const res = await updateAvatarUserApi(data);
      logger.info("update avatar user from user thunks", res);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get watch history
export const getWatchHistory = createAsyncThunk(
  "user/getWatchHistory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserWatchHistoryApi();
      logger.info("get watch history user from user thunks", res);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
