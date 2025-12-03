import { logger } from "@/utls/logger";
import axiosInstance from "./axiosInstance";

/**
 * Toggle subscription to a channel
 * @param {string} channelId - The id of the channel to toggle subscription for
 * @returns {Promise<object>} - The response from the API
 * @throws {Error} - If the API call fails
 */
export const toggleSubscriptionApi = async (
  channelId: string
): Promise<object> => {
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

/**
 * Get all channels that the user is subscribed to
 * @param {string} subscriberId - The id of the user
 * @returns {Promise<object[]>} - An array of subscribed channels
 */
export const getSubscribedChannelsApi = async (
  subscriberId: string
): Promise<object[]> => {
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

/**
 * Get all users that are subscribed to a channel
 * @param {string} channelId - The id of the channel
 * @returns {Promise<object[]>} - An array of subscribed users
 */
export const getChannelSubscribersApi = async (
  channelId: string
): Promise<object[]> => {
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

/**
 * Get channel stats for a given username
 * @param {string} username - The username of the channel to get stats for
 * @returns {Promise<object>} - The channel stats
 * @throws {Error} - If the API call fails
 */
export const getChannelStatsApi = async (username: string): Promise<object> => {
  try {
    const res = await axiosInstance.get(
      `/api/v1/dashboards/channel-stats/${username}`
    );
    logger.info("getChannelSubscribersApi res", res);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Get all videos for a given channel
 * @param {string} username - The username of the channel to get videos for
 * @returns {Promise<object[]>} - An array of videos for the given channel
 * @throws {Error} - If the API call fails
 */
export const getChannelVideosApi = async (
  username: string
): Promise<object[]> => {
  try {
    const res = await axiosInstance.get(
      `/api/v1/dashboards/channel-videos/${username}`
    );
    logger.info("get channelvideo api res", res);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSubscriptionStatusApi = async (
  username: string,
  subscriberId: string
) => {
  try {
    const res = await axiosInstance.get(
      `/api/v1/subscriptions/status/${username}`,
      {
        params: {
          subscriber: subscriberId,
        },
      }
    );
    logger.info("get channelvideo api res", res);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
