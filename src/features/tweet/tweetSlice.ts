import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createTweetThunk,
  getUserTweetsThunk,
  updateTweetThunk,
  deleteTweetThunk,
  getAllTweets,
} from "./tweetThunks";
import { get } from "react-hook-form";

export interface Tweet {
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface TweetState {
  tweets: Tweet[];
  userTweets: Tweet[];
  loading: boolean;
  error: string | null;
}

const initialState: TweetState = {
  tweets: [],
  userTweets: [],
  loading: false,
  error: null,
};

const tweetSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // GET TWEETS
    builder
      .addCase(getUserTweetsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getUserTweetsThunk.fulfilled,
        (state, action: PayloadAction<Tweet[]>) => {
          state.loading = false;
          state.tweets = action.payload;
        }
      )
      .addCase(getUserTweetsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getAllTweets.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAllTweets.fulfilled,
        (state, action: PayloadAction<Tweet[]>) => {
          state.loading = false;
          state.tweets = action.payload;
        }
      )
      .addCase(getAllTweets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // CREATE TWEET
    builder
      .addCase(createTweetThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createTweetThunk.fulfilled,
        (state, action: PayloadAction<Tweet>) => {
          state.loading = false;
          state.tweets.unshift(action.payload);
        }
      )
      .addCase(createTweetThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // UPDATE TWEET
    builder
      .addCase(updateTweetThunk.fulfilled, (state, action) => {
        const updatedTweet = action.payload;
        state.tweets = state.tweets.map((tweet) =>
          tweet._id === updatedTweet._id ? updatedTweet : tweet
        );
      })
      .addCase(updateTweetThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // DELETE TWEET
    builder
      .addCase(deleteTweetThunk.fulfilled, (state, action) => {
        const { tweetId } = action.payload;
        state.tweets = state.tweets.filter((t) => t._id !== tweetId);
      })
      .addCase(deleteTweetThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default tweetSlice.reducer;
