import {
  getChannelStatsApi,
  getChannelSubscribersApi,
  getChannelVideosApi,
  getSubscribedChannelsApi,
  getSubscriptionStatusApi,
  toggleSubscriptionApi,
} from "@/api/susbscriptionApi";
import { logger } from "@/utls/logger";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Toggle subscription (subscribe/unsubscribe)
export const toggleSubscription = createAsyncThunk(
  "subscription/toggleSubscription",
  async (channelId: string, { rejectWithValue }) => {
    try {
      const res = await toggleSubscriptionApi(channelId);
      logger.info("toggle subs from thunks", res);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get channels the user is subscribed to
export const getSubscribedChannels = createAsyncThunk(
  "subscription/getSubscribedChannels",
  async (subscriberId: string, { rejectWithValue }) => {
    try {
      const res = await getSubscribedChannelsApi(subscriberId);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get subscribers of a channel
export const getChannelSubscribers = createAsyncThunk(
  "subscription/getChannelSubscribers",
  async (channelId: string, { rejectWithValue }) => {
    try {
      const res = await getChannelSubscribersApi(channelId);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getChannelStats = createAsyncThunk(
  "subscription/getChannelStats",
  async (username: string, { rejectWithValue }) => {
    try {
      const res = await getChannelStatsApi(username);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getChannelVideos = createAsyncThunk(
  "subscription/getChannelVideos",
  async (username: string, { rejectWithValue }) => {
    try {
      const res = await getChannelVideosApi(username);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getSubscriptionStatus = createAsyncThunk(
  "subscription/getSubscriptionStatus",
  async (
    { username, subscriberId }: { username: string; subscriberId: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await getSubscriptionStatusApi(username, subscriberId);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
