import { logger } from "@/utls/logger";
import axiosInstance from "../axiosInstance";
import type { createPlaylistData, PlaylistData } from "./playlistApi.types";

/**
 * Creates a new playlist
 *
 * @param {PlaylistData} data - The playlist data
 * @returns {Promise<PlaylistData>} - The created playlist or error message
 * @throws {Error} - If there is an error creating the playlist
 */
export const createPlaylistApi = async (
  data: PlaylistData
): Promise<PlaylistData> => {
  try {
    const res = await axiosInstance.post(
      "/api/v1/playlists/create-playlist",
      data
    );
    logger.info("res from create playlist api => ", res);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Gets a playlist by its id
 *
 * @param {string} playlistId - The id of the playlist to get
 * @returns {Promise<PlaylistData>} - The playlist data or error message
 * @throws {Error} - If there is an error getting the playlist
 */
export const getPlaylistByIdApi = async (
  playlistId: string
): Promise<PlaylistData> => {
  try {
    const res = await axiosInstance.get(
      `/api/v1/playlists/get-playlist/${playlistId}`
    );
    logger.info("res from get playlists api => ", res);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Adds a video to a playlist
 *
 * @param {string} playlistId - The id of the playlist to add the video to
 * @param {string} videoId - The id of the video to add to the playlist
 * @returns {Promise<PlaylistData>} - The updated playlist data or error message
 * @throws {Error} - If there is an error adding the video to the playlist
 */
export const addVideoToPlaylistApi = async (
  playlistId: string,
  videoId: string
): Promise<PlaylistData> => {
  try {
    const res = await axiosInstance.post(
      `/api/v1/playlists/add-video/playlist/${playlistId}/video/${videoId}`
    );
    logger.info("res from add video to playlist api => ", res);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Removes a video from a playlist
 *
 * @param {string} playlistId - The id of the playlist to remove the video from
 * @param {string} videoId - The id of the video to remove from the playlist
 * @returns {Promise<PlaylistData>} - The updated playlist data or error message
 * @throws {Error} - If there is an error removing the video from the playlist
 */
export const removeVideoFromPlaylistApi = async (
  playlistId: string,
  videoId: string
): Promise<PlaylistData> => {
  try {
    const res = await axiosInstance.delete(
      `/api/v1/playlists/delete-video/playlist/${playlistId}/video/${videoId}`
    );
    logger.info("res from remove video from playlist api => ", res);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Deletes a playlist given its id.
 *
 * @param {string} playlistId - The id of the playlist to delete
 * @returns {Promise<PlaylistData>} - The deleted playlist data or error message
 * @throws {Error} - If there is an error deleting the playlist
 */
export const deletePlaylistApi = async (playlistId: string): Promise<PlaylistData> => {
  try {
    const res = await axiosInstance.delete(
      `/api/v1/playlists/delete-playlist/playlist/${playlistId}`
    );
    logger.info("res from delete playlist api => ", res);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Updates a playlist given its id and the new data
 *
 * @param {createPlaylistData} data - The new data for the playlist
 * @param {string} playlistId - The id of the playlist to update
 * @returns {Promise<PlaylistData>} - The updated playlist data or error message
 * @throws {Error} - If there is an error updating the playlist
 */
export const updatePlaylistApi = async (data: createPlaylistData,playlistId: string): Promise<PlaylistData> => {
    try {
        const res = await axiosInstance.patch(`/api/v1/playlists/update-playlist/${playlistId}`,data);
        logger.info("res from update playlist api => ", res);
        return res.data.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

/**
 * Gets all the videos for a given user's playlists.
 *
 * @param {string} userId - The id of the user to get the playlist videos for
 * @returns {Promise<object[]>} - An array of videos for the given user's playlists or error message
 * @throws {Error} - If there is an error getting the playlist videos for the user
 */
export const getUserPlaylistVideosApi = async (userId: string): Promise<object[]> => {
  try {
    const res = await axiosInstance.get(`/api/v1/playlists/user-playlist/${userId}`);
    logger.info("res from get user playlist videos api => ", res);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}