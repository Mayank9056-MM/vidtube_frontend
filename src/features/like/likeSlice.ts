import { createSlice } from "@reduxjs/toolkit";
import {
  toggleVideoLike,
  toggleCommentLike,
  toggleTweetLike,
  getAllLikedVideos,
} from "./likeThunks";

interface LikeState {
  likedVideos: string[]; 
  videoLiked: boolean | null;
  commentLiked: boolean | null;
  tweetLiked: boolean | null;
  loading: boolean;
  error: string | null;
}

const initialState: LikeState = {
  likedVideos: [],
  videoLiked: null,
  commentLiked: null,
  tweetLiked: null,
  loading: false,
  error: null,
};

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Toggle Video Like
      .addCase(toggleVideoLike.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleVideoLike.fulfilled, (state, action) => {
        state.loading = false;
        state.videoLiked = action.payload;
      })
      .addCase(toggleVideoLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Toggle Comment Like
      .addCase(toggleCommentLike.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleCommentLike.fulfilled, (state, action) => {
        state.loading = false;
        state.commentLiked = action.payload;
      })
      .addCase(toggleCommentLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Toggle Tweet Like
      .addCase(toggleTweetLike.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleTweetLike.fulfilled, (state, action) => {
        state.loading = false;
        state.tweetLiked = action.payload;
      })
      .addCase(toggleTweetLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get All Liked Videos
      .addCase(getAllLikedVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllLikedVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.likedVideos = action.payload; // array of videos
      })
      .addCase(getAllLikedVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default likeSlice.reducer;
