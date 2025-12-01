import { createSlice } from "@reduxjs/toolkit";
import {
  toggleSubscription,
  getSubscribedChannels,
  getChannelSubscribers,
  getChannelStats,
} from "./subscriptionThunks";
import type { User } from "@/types/global";
import { get } from "react-hook-form";
import { getAllVideos } from "../video/videoThunks";

export interface SubscriptionState {
  subscribedChannels:
    | [
        {
          channel: {
            avatar: string;
            email: string;
            username: string;
            _id: string;
            coverImage: string;
          };
          createdAt: string;
          updatedAt: string;
          susbcriber: string;
          _id: string;
        }
      ]
    | [];
  channelSubscribers: any[];
  totalVideos: number;
  totalViews: number;
  totalLikes: number;
  totalSubscribers: number;
  isSubscribed: boolean;
  allVideos: any[];
  onSelectedChannel: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  subscribedChannels: [],
  channelSubscribers: [],
  isSubscribed: false,
  totalSubscribers: 0,
  onSelectedChannel: null,
  allVideos: [],
  totalVideos: 0,
  totalViews: 0,
  totalLikes: 0,
  loading: false,
  error: null,
};

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setSubscriptionState: (state, action) => {
      state.isSubscribed = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Toggle Subscription
    builder.addCase(toggleSubscription.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(toggleSubscription.fulfilled, (state, action) => {
      state.loading = false;
      state.isSubscribed = action.payload.data.isSubscribed;
      state.totalSubscribers = action.payload.data.totalSubscribers;
    });
    builder.addCase(toggleSubscription.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message as string;
    });

    // Get Subscribed Channels
    builder.addCase(getSubscribedChannels.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getSubscribedChannels.fulfilled, (state, action) => {
      state.loading = false;
      console.log("actin.payload -> ", action.payload);
      state.subscribedChannels = action.payload || [];
      console.log(state.subscribedChannels, "channel subscribed");
    });
    builder.addCase(getSubscribedChannels.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get Channel Subscribers
    builder.addCase(getChannelSubscribers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getChannelSubscribers.fulfilled, (state, action) => {
      state.loading = false;
      state.channelSubscribers = action.payload || [];
      state.totalSubscribers = action.payload.length;
    });
    builder.addCase(getChannelSubscribers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get channel stats
    builder.addCase(getChannelStats.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getChannelStats.fulfilled, (state, action) => {
      state.loading = false;
      state.totalVideos = action.payload.totalVideos;
      state.totalViews = action.payload.totalViews;
      state.totalLikes = action.payload.totalLikes;
      state.onSelectedChannel = action.payload.user;
    });
    builder.addCase(getChannelStats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get all videos of a channel
    builder.addCase(getAllVideos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllVideos.fulfilled, (state, action) => {
      state.loading = false;
      state.allVideos = action.payload.allVideo;
    });
    builder.addCase(getAllVideos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});
export const { setSubscriptionState } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
