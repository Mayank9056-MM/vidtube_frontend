export interface Playlist {
  _id: string;
  name: string;
  description?: string;
  videos: string[];
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlaylistState {
  playlists: Playlist[];
  currentPlaylist: Playlist | null;
  userPlaylistVideos: any[];
  loading: boolean;
  error: string | null;
}
