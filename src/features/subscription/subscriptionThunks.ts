import {
  getChannelSubscribersApi,
  getSubscribedChannelsApi,
  toggleSubscriptionApi,
} from "@/api/susbscriptionApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Toggle subscription (subscribe/unsubscribe)
export const toggleSubscription = createAsyncThunk(
  "subscription/toggleSubscription",
  async (channelId: string, { rejectWithValue }) => {
    try {
      const res = await toggleSubscriptionApi(channelId);
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
