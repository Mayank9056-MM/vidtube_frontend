import { logger } from "@/utls/logger";
import axiosInstance from "./axiosInstance";
import axios from "axios";

export const toggleSubscriptionApi = async (channelId: string) => {
  try {
    const res = await axiosInstance.patch(
      `/api/v1/subscriptions/toggle-sub/${channelId}`
    );
    logger.info("res from toggle subscription api => ", res.data.data);
    return res.data.data;
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
    return res;
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
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
