import { createSlice } from "@reduxjs/toolkit";
import {
  createComment,
  updateComment,
  deleteComment,
  getComments,
  toggleCommentLike,
} from "./commentThunks";

export interface Comment {
  owner: {
    avatar: string;
    username: string;
  };
  _id: string;
  isCommentLiked: boolean;
  totalLikes: number;
  content: string;
  userId: string;
  videoId: string;
  createdAt: string;
  updatedAt: string;
}

interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(toggleCommentLike.fulfilled, (state, action) => {
        const { commentId, isCommentLiked, totalLikes } = action.payload;

        const comment = state.comments.find((c) => c._id === commentId);
        if (comment) {
          comment.isCommentLiked = isCommentLiked;
          comment.totalLikes = totalLikes;
        }
      })

      // GET COMMENTS
      .addCase(getComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.comments;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // CREATE COMMENT
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
      })

      // UPDATE COMMENT
      .addCase(updateComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
      })

      // DELETE COMMENT
      .addCase(deleteComment.fulfilled, (state, action) => {});
  },
});

export default commentSlice.reducer;

// export const {} = commentSlice.actions;
