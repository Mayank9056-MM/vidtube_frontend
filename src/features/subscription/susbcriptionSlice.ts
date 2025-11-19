import { createSlice } from "@reduxjs/toolkit";
import {
  toggleSubscription,
  getSubscribedChannels,
  getChannelSubscribers,
} from "./subscriptionThunks";

export interface SubscriptionState {
  subscribedChannels: any[];
  channelSubscribers: any[];
  totalSubscribers: number;
  isSubscribed: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  subscribedChannels: [],
  channelSubscribers: [],
  isSubscribed: false,
  totalSubscribers: 0,
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
      state.subscribedChannels = action.payload || [];
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
  },
});
export const { setSubscriptionState } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
