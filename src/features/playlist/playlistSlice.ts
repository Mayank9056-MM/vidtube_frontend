import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { PlaylistData } from "@/api/playlist/playlistApi.types";
import {
  addVideoToPlaylist,
  createPlaylist,
  deletePlaylist,
  getPlaylistById,
  getUserPlaylistVideos,
  removeVideoFromPlaylist,
  updatePlaylist,
} from "./playlistThunks";

interface PlaylistState {
  playlists: Record<string, PlaylistData>;
  userPlaylists: object[];
  currentPlaylist: PlaylistData | null;
  loading: {
    create: boolean;
    fetch: boolean;
    update: boolean;
    delete: boolean;
    addVideo: boolean;
    removeVideo: boolean;
    userPlaylists: boolean;
  };
  error: {
    create: string | null;
    fetch: string | null;
    update: string | null;
    delete: string | null;
    addVideo: string | null;
    removeVideo: string | null;
    userPlaylists: string | null;
  };
}

const initialState: PlaylistState = {
  playlists: {},
  userPlaylists: [],
  currentPlaylist: null,
  loading: {
    create: false,
    fetch: false,
    update: false,
    delete: false,
    addVideo: false,
    removeVideo: false,
    userPlaylists: false,
  },
  error: {
    create: null,
    fetch: null,
    update: null,
    delete: null,
    addVideo: null,
    removeVideo: null,
    userPlaylists: null,
  },
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    clearPlaylistError: (
      state,
      action: PayloadAction<keyof PlaylistState["error"]>
    ) => {
      state.error[action.payload] = null;
    },
    clearAllPlaylistErrors: (state) => {
      Object.keys(state.error).forEach((key) => {
        state.error[key as keyof PlaylistState["error"]] = null;
      });
    },
    setCurrentPlaylist: (state, action: PayloadAction<PlaylistData | null>) => {
      state.currentPlaylist = action.payload;
    },
    clearCurrentPlaylist: (state) => {
      state.currentPlaylist = null;
    },
    resetPlaylistState: () => initialState,
  },
  extraReducers: (builder) => {
    // Create Playlist
    builder
      .addCase(createPlaylist.pending, (state) => {
        state.loading.create = true;
        state.error.create = null;
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.loading.create = false;
        state.playlists[action.payload._id] = action.payload;
        state.currentPlaylist = action.payload;
      })
      .addCase(createPlaylist.rejected, (state, action) => {
        state.loading.create = false;
        state.error.create = action.payload as string;
      });

    // Get Playlist By ID
    builder
      .addCase(getPlaylistById.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(getPlaylistById.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.playlists[action.payload._id] = action.payload;
        state.currentPlaylist = action.payload;
      })
      .addCase(getPlaylistById.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error.fetch = action.payload as string;
      });

    // Add Video to Playlist
    builder
      .addCase(addVideoToPlaylist.pending, (state) => {
        state.loading.addVideo = true;
        state.error.addVideo = null;
      })
      .addCase(addVideoToPlaylist.fulfilled, (state, action) => {
        state.loading.addVideo = false;
        state.playlists[action.payload._id] = action.payload;
        if (state.currentPlaylist?._id === action.payload._id) {
          state.currentPlaylist = action.payload;
        }
      })
      .addCase(addVideoToPlaylist.rejected, (state, action) => {
        state.loading.addVideo = false;
        state.error.addVideo = action.payload as string;
      });

    // Remove Video from Playlist
    builder
      .addCase(removeVideoFromPlaylist.pending, (state) => {
        state.loading.removeVideo = true;
        state.error.removeVideo = null;
      })
      .addCase(removeVideoFromPlaylist.fulfilled, (state, action) => {
        state.loading.removeVideo = false;
        state.playlists[action.payload._id] = action.payload;
        if (state.currentPlaylist?._id === action.payload._id) {
          state.currentPlaylist = action.payload;
        }
      })
      .addCase(removeVideoFromPlaylist.rejected, (state, action) => {
        state.loading.removeVideo = false;
        state.error.removeVideo = action.payload as string;
      });

    // Delete Playlist
    builder
      .addCase(deletePlaylist.pending, (state) => {
        state.loading.delete = true;
        state.error.delete = null;
      })
      .addCase(deletePlaylist.fulfilled, (state, action) => {
        state.loading.delete = false;
        delete state.playlists[action.payload];
        if (state.currentPlaylist?._id === action.payload) {
          state.currentPlaylist = null;
        }
      })
      .addCase(deletePlaylist.rejected, (state, action) => {
        state.loading.delete = false;
        state.error.delete = action.payload as string;
      });

    // Update Playlist
    builder
      .addCase(updatePlaylist.pending, (state) => {
        state.loading.update = true;
        state.error.update = null;
      })
      .addCase(updatePlaylist.fulfilled, (state, action) => {
        state.loading.update = false;
        state.playlists[action.payload._id] = action.payload;
        if (state.currentPlaylist?._id === action.payload._id) {
          state.currentPlaylist = action.payload;
        }
      })
      .addCase(updatePlaylist.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = action.payload as string;
      });

    // Get User Playlist Videos
    builder
      .addCase(getUserPlaylistVideos.pending, (state) => {
        state.loading.userPlaylists = true;
        state.error.userPlaylists = null;
      })
      .addCase(getUserPlaylistVideos.fulfilled, (state, action) => {
        state.loading.userPlaylists = false;
        state.userPlaylists = action.payload;
      })
      .addCase(getUserPlaylistVideos.rejected, (state, action) => {
        state.loading.userPlaylists = false;
        state.error.userPlaylists = action.payload as string;
      });
  },
});

export const {
  clearPlaylistError,
  clearAllPlaylistErrors,
  setCurrentPlaylist,
  clearCurrentPlaylist,
  resetPlaylistState,
} = playlistSlice.actions;

export default playlistSlice.reducer;
