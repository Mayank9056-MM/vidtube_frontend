import { createSlice } from "@reduxjs/toolkit";
import {
  publishVideo,
  getVideoById,
  getAllVideos,
  deleteVideo,
  updateVideo,
  togglePublishStatus,
} from "../video/videoThunks";

export interface Video {
  _id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  videoUrl: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  [key: string]: any; // in case backend returns extra fields
}

interface VideoState {
  videos: Video[];
  selectedVideo: Video | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: VideoState = {
  videos: [],
  selectedVideo: null,
  loading: false,
  error: null,
  successMessage: null,
};

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    clearVideoState: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    // Publish Video
    builder
      .addCase(publishVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(publishVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videos.unshift(action.payload.data || action.payload);
        state.successMessage = "Video published successfully";
      })
      .addCase(publishVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get All Videos
    builder
      .addCase(getAllVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload.data || action.payload;
      })
      .addCase(getAllVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Video by ID
    builder
      .addCase(getVideoById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVideoById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedVideo = action.payload.data || action.payload;
      })
      .addCase(getVideoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete Video
    builder
      .addCase(deleteVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = state.videos.filter(
          (v) => v._id !== action.payload.videoId
        );
        state.successMessage = "Video deleted successfully";
      })
      .addCase(deleteVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Video
    builder
      .addCase(updateVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = state.videos.map((v) =>
          v._id === action.payload._id ? action.payload : v
        );
        state.successMessage = "Video updated successfully";
      })
      .addCase(updateVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Toggle Publish Status
    builder
      .addCase(togglePublishStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(togglePublishStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = state.videos.map((v) =>
          v._id === action.payload.videoId
            ? { ...v, isPublished: !v.isPublished }
            : v
        );
        state.successMessage = "Video publish status toggled";
      })
      .addCase(togglePublishStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearVideoState } = videoSlice.actions;
export default videoSlice.reducer;
