import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  toggleLikeApi,
  toggleCommentLikeApi,
  toggleTweetLikeApi,
  AllLikedVideosApi,
} from "@/api/like/likeApi";
import { logger } from "@/utls/logger";

export const toggleVideoLike = createAsyncThunk(
  "likes/toggleVideoLike",
  async (videoId: string, { rejectWithValue }) => {
    try {
      const res = await toggleLikeApi(videoId);
      logger.info("toggle video like thunk => ", res);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const toggleCommentLike = createAsyncThunk(
  "likes/toggleCommentLike",
  async (commentId: string, { rejectWithValue }) => {
    try {
      const res = await toggleCommentLikeApi(commentId);
      logger.info("toggle comment like thunk => ", res);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const toggleTweetLike = createAsyncThunk(
  "likes/toggleTweetLike",
  async (tweetId: string, { rejectWithValue }) => {
    try {
      const res = await toggleTweetLikeApi(tweetId);
      logger.info("toggle tweet like thunk => ", res);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllLikedVideos = createAsyncThunk(
  "likes/getAllLikedVideos",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AllLikedVideosApi();
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
