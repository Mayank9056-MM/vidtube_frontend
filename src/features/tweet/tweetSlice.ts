import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createTweet,
  deleteTweet,
  getAllTweets,
  getUserTweets,
  updateTweet,
} from "./tweetThunks";

export interface Tweet {
  _id: string;
  content: string;
  owner: {
    username: string;
    avatar: string;
    _id: string;
    fullName: string;
  };
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
    // GET USER TWEETS
    builder
      .addCase(getUserTweets.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getUserTweets.fulfilled,
        (state, action: PayloadAction<Tweet[]>) => {
          state.loading = false;
          state.userTweets = action.payload.tweets;
        }
      )
      .addCase(getUserTweets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ALL TWEETS

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
      .addCase(createTweet.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTweet.fulfilled, (state, action: PayloadAction<Tweet>) => {
        state.loading = false;
        state.tweets.unshift(action.payload);
      })
      .addCase(createTweet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // UPDATE TWEET
    builder
      .addCase(updateTweet.fulfilled, (state, action) => {
        const updatedTweet = action.payload;
        state.tweets = state.tweets.map((tweet) =>
          tweet._id === updatedTweet._id ? updatedTweet : tweet
        );
      })
      .addCase(updateTweet.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // DELETE TWEET
    builder
      .addCase(deleteTweet.fulfilled, (state, action) => {
        const { tweetId } = action.payload;
        state.tweets = state.tweets.filter((t) => t._id !== tweetId);
      })
      .addCase(deleteTweet.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default tweetSlice.reducer;
