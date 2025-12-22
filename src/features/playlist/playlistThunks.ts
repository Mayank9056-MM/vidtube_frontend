import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPlaylistApi,
  getPlaylistByIdApi,
  addVideoToPlaylistApi,
  removeVideoFromPlaylistApi,
  deletePlaylistApi,
  updatePlaylistApi,
  getUserPlaylistVideosApi,
} from "@/api/playlist/playlistApi";
import type {
  createPlaylistData,
  PlaylistData,
} from "@/api/playlist/playlistApi.types";
import { logger } from "@/utls/logger";

/* ================= CREATE PLAYLIST ================= */
export const createPlaylist = createAsyncThunk<
  PlaylistData,
  PlaylistData,
  { rejectValue: string }
>("playlist/createPlaylist", async (playlistData, { rejectWithValue }) => {
  try {
    const response = await createPlaylistApi(playlistData);
    logger.info("Playlist created successfully:", response);
    return response;
  } catch (error: any) {
    logger.error("Error creating playlist:", error);
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to create playlist";
    return rejectWithValue(errorMessage);
  }
});

/* ================= GET PLAYLIST BY ID ================= */
export const getPlaylistById = createAsyncThunk<
  PlaylistData,
  string,
  { rejectValue: string }
>("playlist/getPlaylistById", async (playlistId, { rejectWithValue }) => {
  try {
    const response = await getPlaylistByIdApi(playlistId);
    logger.info("Playlist fetched successfully:", response);
    return response;
  } catch (error: any) {
    logger.error("Error fetching playlist:", error);
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to fetch playlist";
    return rejectWithValue(errorMessage);
  }
});

/* ================= ADD VIDEO ================= */
export const addVideoToPlaylist = createAsyncThunk<
  PlaylistData,
  { playlistId: string; videoId: string },
  { rejectValue: string }
>(
  "playlist/addVideoToPlaylist",
  async ({ playlistId, videoId }, { rejectWithValue }) => {
    try {
      const response = await addVideoToPlaylistApi(playlistId, videoId);
      logger.info("Video added to playlist successfully:", response);
      return response;
    } catch (error: any) {
      logger.error("Error adding video to playlist:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to add video to playlist";
      return rejectWithValue(errorMessage);
    }
  }
);

/* ================= REMOVE VIDEO ================= */
export const removeVideoFromPlaylist = createAsyncThunk<
  PlaylistData,
  { playlistId: string; videoId: string },
  { rejectValue: string }
>(
  "playlist/removeVideoFromPlaylist",
  async ({ playlistId, videoId }, { rejectWithValue }) => {
    try {
      const response = await removeVideoFromPlaylistApi(playlistId, videoId);
      logger.info("Video removed from playlist successfully:", response);
      return response;
    } catch (error: any) {
      logger.error("Error removing video from playlist:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to remove video from playlist";
      return rejectWithValue(errorMessage);
    }
  }
);

/* ================= UPDATE PLAYLIST ================= */
export const updatePlaylist = createAsyncThunk<
  PlaylistData,
  { data: createPlaylistData; playlistId: string },
  { rejectValue: string }
>(
  "playlist/updatePlaylist",
  async ({ data, playlistId }, { rejectWithValue }) => {
    try {
      const response = await updatePlaylistApi(data, playlistId);
      logger.info("Playlist updated successfully:", response);
      return response;
    } catch (error: any) {
      logger.error("Error updating playlist:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update playlist";
      return rejectWithValue(errorMessage);
    }
  }
);

/* ================= DELETE PLAYLIST ================= */
export const deletePlaylist = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("playlist/deletePlaylist", async (playlistId, { rejectWithValue }) => {
  try {
    await deletePlaylistApi(playlistId);
    logger.info("Playlist deleted successfully");
    return playlistId;
  } catch (error: any) {
    logger.error("Error deleting playlist:", error);
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to delete playlist";
    return rejectWithValue(errorMessage);
  }
});

/* ================= USER PLAYLIST VIDEOS ================= */
export const getUserPlaylistVideos = createAsyncThunk<
  object[],
  string,
  { rejectValue: string }
>("playlist/getUserPlaylistVideos", async (userId, { rejectWithValue }) => {
  try {
    const response = await getUserPlaylistVideosApi(userId);
    logger.info("User playlist videos fetched successfully:", response);
    return response;
  } catch (error: any) {
    logger.error("Error fetching user playlist videos:", error);
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to fetch user playlist videos";
    return rejectWithValue(errorMessage);
  }
});
