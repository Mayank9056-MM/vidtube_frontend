import { createAsyncThunk } from "@reduxjs/toolkit";
import {
 allTweetsApi,
 createTweetApi,
 deleteTweetApi,
 getUserTweetsApi,
 updateTweetApi
} from "@/api/tweet/tweetApi";

// CREATE TWEET
export const createTweet = createAsyncThunk(
  "tweets/createTweet",
  async (content: string, { rejectWithValue }) => {
    try {
      const data = await createTweetApi(content);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "Failed to create tweet");
    }
  }
);

// All tweets
export const getAllTweets = createAsyncThunk(
    "tweets/getAllTweets",
    async(_,{rejectWithValue}) => {
       try {
         const data = await allTweetsApi();
         return data;
       } catch (error) {
        return rejectWithValue(error?.response?.data || "Failed to fetch all tweets")
       }
    }
)

// GET USER TWEETS
export const getUserTweets = createAsyncThunk(
  "tweets/getUserTweets",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserTweetsApi();
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "Failed to fetch tweets");
    }
  }
);

// UPDATE TWEET
export const updateTweet = createAsyncThunk(
  "tweets/updateTweet",
  async (
    { tweetId, content }: { tweetId: string; content: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await updateTweetApi(tweetId, content);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "Failed to update tweet");
    }
  }
);

// DELETE TWEET
export const deleteTweet = createAsyncThunk(
  "tweets/deleteTweet",
  async (tweetId: string, { rejectWithValue }) => {
    try {
      const data = await deleteTweetApi(tweetId);
      return { tweetId, ...data };
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "Failed to delete tweet");
    }
  }
);
