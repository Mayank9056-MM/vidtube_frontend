import { logger } from "@/utls/logger";
import axiosInstance from "../axiosInstance";

export const createCommentApi = async ({
  content,
  videoId,
}: {
  content: string;
  videoId: string;
}) => {
  try {
    const res = await axiosInstance.post(
      `/api/v1/comments/add-comment/${videoId}`,
      {content}
    );
    logger.info("res from create comment api => ", res);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateCommentApi = async ({
  commentId,
  content,
}: {
  commentId: string;
  content: string;
}) => {
  try {
    const res = await axiosInstance.patch(
      `/api/v1/comments/update-comment/${commentId}`,
      {content}
    );
    logger.info("res from update comment api => ", res);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteCommentApi = async (commentId: string) => {
  try {
    const res = await axiosInstance.delete(
      `/api/v1/comments/delete-comment/${commentId}`
    );
    logger.info("res from deleteCommentApi =>", res);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCommentsApi = async (videoId: string) => {
  try {
    const res = await axiosInstance.get(
      `/api/v1/comments/get-comments/${videoId}`
    );
    logger.info("res from get comments api => ", res);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};