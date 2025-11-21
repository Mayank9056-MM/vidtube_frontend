import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTweet,
  getUserTweets,
  updateTweet,
  deleteTweet,
} from "@/api/tweet/tweetApi";

// CREATE TWEET
export const createTweetThunk = createAsyncThunk(
  "tweets/createTweet",
  async (content: string, { rejectWithValue }) => {
    try {
      const data = await createTweet(content);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "Failed to create tweet");
    }
  }
);

// GET USER TWEETS
export const getUserTweetsThunk = createAsyncThunk(
  "tweets/getUserTweets",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserTweets();
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "Failed to fetch tweets");
    }
  }
);

// UPDATE TWEET
export const updateTweetThunk = createAsyncThunk(
  "tweets/updateTweet",
  async (
    { tweetId, content }: { tweetId: string; content: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await updateTweet(tweetId, content);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "Failed to update tweet");
    }
  }
);

// DELETE TWEET
export const deleteTweetThunk = createAsyncThunk(
  "tweets/deleteTweet",
  async (tweetId: string, { rejectWithValue }) => {
    try {
      const data = await deleteTweet(tweetId);
      return { tweetId, ...data };
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "Failed to delete tweet");
    }
  }
);
