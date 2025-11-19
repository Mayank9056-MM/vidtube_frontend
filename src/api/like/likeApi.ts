import { logger } from "@/utls/logger";
import axiosInstance from "../axiosInstance";

export const toggleLikeApi = async (videoId: string) => {
  try {
    const res = await axiosInstance.patch(
      `/api/v1/likes/toggle-video/${videoId}`
    );
    logger.info("res from toggle like api => ", res);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const toggleCommentLikeApi = async (commentId: string) => {
  try {
    const res = await axiosInstance.patch(
      `/api/v1/likes/toggle-comment/${commentId}`
    );
    logger.info("res from toggle comment like api => ", res);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const toggleTweetLikeApi = async (tweetId: string) => {
  try {
    const res = await axiosInstance.patch(
      `/api/v1/likes/toggle-tweet/${tweetId}`
    );
    logger.info("res fdrom toggle tweet like api => ", res);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const AllLikedVideosApi = async () => {
  try {
    const res = await axiosInstance.get("/api/v1/likes/like-videos");
    logger.info("res from get all liked videos api => ", res);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
