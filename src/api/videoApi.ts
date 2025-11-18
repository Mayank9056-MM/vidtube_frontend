import { logger } from "@/utls/logger";
import axiosInstance from "./axiosInstance";
import type { publishVideoData, updateVideoData } from "./videoApi.types";

// publish video
export const publishVideoApi = async (data: publishVideoData) => {
  try {
    const res = await axiosInstance.post("/api/v1/videos/upload-video", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    logger.info("res from publish video api => ", res);
    return res.data;
  } catch (error: any) {
    logger.warn("error in publish video api", error);
    return error.message;
  }
};

// get video by id
export const getVideoByIdApi = async (videoId: string) => {
  try {
    const res = await axiosInstance.get(`/api/v1/videos/get-video/${videoId}`);

    logger.info("res from get video by id api => ", res);
    return res.data;
  } catch (error: any) {
    logger.warn("error in get video by id api", error);
    return error.message;
  }
};

// delete video by id
export const deletevideoApi = async (videoId: string) => {
  try {
    const res = await axiosInstance.delete(
      `/api/v1/videos/delete-video/${videoId}`
    );

    logger.info("res from delete video by id api => ", res);
    return res.data;
  } catch (error: any) {
    logger.warn("error in delete video by id api", error);
    return error.message;
  }
};

// update video
export const updateVideoApi = async (
  videoId: string,
  data: updateVideoData
) => {
  try {
    const res = await axiosInstance.patch(
      `/api/v1/videos/update-video/${videoId}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    logger.info("res from update video api => ", res);
    return res.data;
  } catch (error: any) {
    logger.warn("error in update video api", error);
    return error.message;
  }
};

// delete video by id
export const togglePublishStatusApi = async (videoId: string) => {
  try {
    const res = await axiosInstance.patch(
      `/api/v1/videos/toggle-video/${videoId}`
    );

    logger.info("res from toggle publish status api => ", res);
    return res.data;
  } catch (error: any) {
    logger.warn("error in toggle publish status api", error);
    return error.message;
  }
};

// delete video by id
export const getAllVideosApi = async () => {
  try {
    const res = await axiosInstance.get(`/api/v1/videos/all-videos`);

    logger.info("res from get all videos api => ", res);
    return res.data.data;
  } catch (error: any) {
    logger.warn("error in get all videos api", error);
    return error.message;
  }
};
