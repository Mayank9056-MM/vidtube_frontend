import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  publishVideoApi,
  getVideoByIdApi,
  deletevideoApi,
  updateVideoApi,
  togglePublishStatusApi,
  getAllVideosApi,
} from "@/api/videoApi";
import type { publishVideoData, updateVideoData } from "@/api/videoApi.types";
import { logger } from "@/utls/logger";

// Publish Video
export const publishVideo = createAsyncThunk(
  "videos/publishVideo",
  async (data: publishVideoData, { rejectWithValue }) => {
    try {
      const res = await publishVideoApi(data);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to publish video");
    }
  }
);

// Get Video by ID
export const getVideoById = createAsyncThunk(
  "videos/getVideoById",
  async (videoId: string, { rejectWithValue }) => {
    try {
      const res = await getVideoByIdApi(videoId);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch video");
    }
  }
);

// Get All Videos
export const getAllVideos = createAsyncThunk(
  "videos/getAllVideos",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllVideosApi();
      logger.info("res from get all videos thunks => ", res);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch videos");
    }
  }
);

// Delete Video
export const deleteVideo = createAsyncThunk(
  "videos/deleteVideo",
  async (videoId: string, { rejectWithValue }) => {
    try {
      const res = await deletevideoApi(videoId);
      return { videoId, res };
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to delete video");
    }
  }
);

// Update Video
export const updateVideo = createAsyncThunk(
  "videos/updateVideo",
  async (
    { videoId, data }: { videoId: string; data: updateVideoData },
    { rejectWithValue }
  ) => {
    try {
      const res = await updateVideoApi(videoId, data);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update video");
    }
  }
);

// Toggle Publish Status
export const togglePublishStatus = createAsyncThunk(
  "videos/togglePublishStatus",
  async (videoId: string, { rejectWithValue }) => {
    try {
      const res = await togglePublishStatusApi(videoId);
      return { videoId, res };
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to toggle status");
    }
  }
);
