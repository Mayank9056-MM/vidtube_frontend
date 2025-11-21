import { logger } from "@/utls/logger";
import axiosInstance from "../axiosInstance";

export const createTweetApi = async (content: string) => {
  try {
    const res = await axiosInstance.post("/api/v1/tweets/create-tweet", {
      content,
    });
    logger.info("res from create tweet => ", res);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const allTweetsApi = async () => {
  try {
    const res = await axiosInstance.get("/api/v1/tweets/");
    logger.info("res from get all tweets => ", res);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserTweetsApi = async () => {
  try {
    const res = await axiosInstance.get("/api/v1/tweets/get-tweet");
    logger.info("res from get user tweets => ", res);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateTweetApi = async (tweetId: string, content: string) => {
  try {
    const res = await axiosInstance.patch(
      `/api/v1/tweets/update-tweet/${tweetId}`,
      { content }
    );
    logger.info("res from update tweet => ", res);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteTweetApi = async (tweetId: string) => {
  try {
    const res = await axiosInstance.delete(
      `/api/v1/tweets/delete-tweet/${tweetId}`
    );
    logger.info("res from delete tweet => ", res);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
