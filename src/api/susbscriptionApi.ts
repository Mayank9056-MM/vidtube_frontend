import { logger } from "@/utls/logger";
import axiosInstance from "./axiosInstance";

export const toggleSubscriptionApi = async (channelId: string) => {
  try {
    const res = await axiosInstance.patch(
      `/api/v1/subscriptions/toggle-sub/${channelId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSubscribedChannelsApi = async (subscriberId: string) => {
  try {
    const res = await axiosInstance.get(
      `/api/v1/subscriptions/subscribed-channels/${subscriberId}`
    );
    logger.info("res from getSubscribedChannelApi", res);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getChannelSubscribersApi = async (channelId: string) => {
  try {
    const res = await axiosInstance.get(
      `api/v1/subscriptions/subscribers/${channelId}`
    );
    logger.info("getChannelSubscribersApi res", res);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
