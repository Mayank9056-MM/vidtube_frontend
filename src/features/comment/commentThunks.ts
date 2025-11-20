import {
  createCommentApi,
  deleteCommentApi,
  getCommentsApi,
  updateCommentApi,
} from "@/api/comment/commentApi";
import { toggleCommentLikeApi } from "@/api/like/likeApi";
import { logger } from "@/utls/logger";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const toggleCommentLike = createAsyncThunk(
  "comments/toggleCommentLike",
  async (commentId: string, { rejectWithValue }) => {
    try {
      const res = await toggleCommentLikeApi(commentId);
      logger.info("toggle comment like res => ", res);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to like comment");
    }
  }
);

// CREATE COMMENT
export const createComment = createAsyncThunk(
  "comments/createComment",
  async (
    { content, videoId }: { content: string; videoId: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await createCommentApi({ content, videoId });
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to create comment"
      );
    }
  }
);

// UPDATE COMMENT
export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async (
    { commentId, content }: { commentId: string; content: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await updateCommentApi({ commentId, content });
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to update comment"
      );
    }
  }
);

// DELETE COMMENT
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId: string, { rejectWithValue }) => {
    try {
      const data = await deleteCommentApi(commentId);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to delete comment"
      );
    }
  }
);

// GET COMMENTS LIST
export const getComments = createAsyncThunk(
  "comments/getComments",
  async (videoId: string, { rejectWithValue }) => {
    try {
      const data = await getCommentsApi(videoId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to load comments");
    }
  }
);
