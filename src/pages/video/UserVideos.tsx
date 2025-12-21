import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import type { RootState } from "@/app/store";
import {
  MoreVertical,
  Trash2,
  Edit,
  Eye,
  Clock,
  Upload,
  Search,
  Filter,
  Loader2,
  X,
  Check,
  EyeOff,
  Globe,
  Lock,
} from "lucide-react";
import {
  deleteVideo,
  getAllVideos,
  getUserVideos,
  updateVideo,
  togglePublishStatus,
} from "@/features/video/videoThunks";
import { formatDate, formatDuration, formatNumber } from "@/utls/helpers";
import { useNavigate } from "react-router-dom";

export default function UserVideos() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state: RootState) => state.user.theme);
  const { user } = useAppSelector((state: RootState) => state.user);
  const { videos, loading, error } = useAppSelector(
    (state: RootState) => state.video
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [publishLoading, setPublishLoading] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      dispatch(getUserVideos({ userId: user._id }));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (selectedVideo) {
      setIsPublic(selectedVideo.isPublished);
    }
  }, [selectedVideo]);

  const handleDeleteVideo = async (videoId: string) => {
    try {
      console.log("Deleting video:", videoId);
      dispatch(deleteVideo(videoId));
      setShowDeleteModal(false);
      setSelectedVideo(null);
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const handleUpdateVideo = async () => {
    try {
      const data = {
        title: editTitle,
        description: editDescription,
      };

      dispatch(updateVideo({ videoId: selectedVideo._id, data })).unwrap();

      setShowEditModal(false);
      setSelectedVideo(null);
    } catch (error) {
      console.error("Error updating video:", error);
    }
  };

  const handleTogglePublish = async (videoId: string) => {
    try {
      setPublishLoading(videoId);
      await dispatch(togglePublishStatus(videoId)).unwrap();
      setShowPublishModal(false);
      setSelectedVideo(null);
    } catch (error) {
      console.error("Error toggling publish status:", error);
    } finally {
      setPublishLoading(null);
    }
  };

  const openEditModal = (video: any) => {
    setSelectedVideo(video);
    setEditTitle(video.title);
    setEditDescription(video.description || "");
    setShowEditModal(true);
  };

  const openPublishModal = (video: any) => {
    setSelectedVideo(video);
    setShowPublishModal(true);
  };

  const filteredVideos = videos.filter((video: any) => {
    const matchesSearch = video.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "published" && video.isPublished) ||
      (filterStatus === "draft" && !video.isPublished);
    return matchesSearch && matchesFilter;
  });

  const fetchUserVideos = () => {
    if (user?._id) {
      dispatch(getUserVideos({ userId: user._id }));
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-black">
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                My Videos
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Manage and edit your uploaded content
              </p>
            </div>
            <button
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl hover:from-red-700 hover:to-red-600 transition-all duration-200 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 hover:scale-[1.02]"
              onClick={() => navigate("/upload")}
            >
              <Upload className="w-4 h-4" />
              Upload Video
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-red-500 transition-colors" />
              <input
                type="text"
                placeholder="Search your videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all cursor-pointer"
              >
                <option value="all">All Videos</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
              </select>
              <button
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "list" : "grid")
                }
                className="px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                {viewMode === "grid" ? "List" : "Grid"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="group bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:shadow-red-500/5 dark:hover:shadow-red-500/10 transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Total Videos
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mt-1">
                  {videos.length}
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/20 dark:to-red-800/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>
          <div className="group bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-blue-500/10 transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Total Views
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mt-1">
                  {formatNumber(
                    videos.reduce(
                      (acc: number, v: any) => acc + (v.views || 0),
                      0
                    )
                  )}
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          <div className="group bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:shadow-green-500/5 dark:hover:shadow-green-500/10 transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Published
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mt-1">
                  {videos.filter((v: any) => v.isPublished).length}
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-800/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && videos.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-red-600" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-red-600 dark:text-red-400 mb-2">
                Failed to load videos
              </p>
              <button
                onClick={fetchUserVideos}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-500/25"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Videos List/Grid */}
        {!loading && filteredVideos.length > 0 && (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                : "space-y-3"
            }
          >
            {filteredVideos.map((video: any) => (
              <div
                key={video._id}
                className={`group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-2xl hover:shadow-red-500/10 dark:hover:shadow-red-500/20 transition-all duration-300 hover:scale-[1.02] ${
                  viewMode === "list" ? "flex gap-4 p-4" : ""
                }`}
              >
                {/* Thumbnail */}
                <div
                  className={viewMode === "list" ? "w-48 flex-shrink-0" : ""}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                        viewMode === "list" ? "h-28 rounded-xl" : "aspect-video"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-2 right-2 bg-black/90 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-lg font-medium">
                      {formatDuration(video.duration || 0)}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 ${viewMode === "grid" ? "p-4" : ""}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <span className="flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" />
                          {formatNumber(video.views || 0)}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {formatDate(video.createdAt)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            video.isPublished
                              ? "bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                              : "bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/20 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800"
                          }`}
                        >
                          {video.isPublished ? (
                            <>
                              <Globe className="w-3 h-3" />
                              Published
                            </>
                          ) : (
                            <>
                              <Lock className="w-3 h-3" />
                              Draft
                            </>
                          )}
                        </span>
                        <button
                          onClick={() => openPublishModal(video)}
                          disabled={publishLoading === video._id}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                            video.isPublished
                              ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
                              : "bg-gradient-to-r from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-800/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800 hover:from-red-200 hover:to-red-100 dark:hover:from-red-900/40 dark:hover:to-red-800/30"
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {publishLoading === video._id ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : video.isPublished ? (
                            <EyeOff className="w-3 h-3" />
                          ) : (
                            <Eye className="w-3 h-3" />
                          )}
                          {video.isPublished ? "Unpublish" : "Publish"}
                        </button>
                      </div>
                    </div>

                    {/* Actions Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === video._id ? null : video._id
                          )
                        }
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </button>

                      {activeDropdown === video._id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setActiveDropdown(null)}
                          />
                          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-1 z-20 overflow-hidden">
                            <button
                              onClick={() => {
                                openEditModal(video);
                                setActiveDropdown(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                              Edit Video
                            </button>
                            <button
                              onClick={() => {
                                setSelectedVideo(video);
                                setShowDeleteModal(true);
                                setActiveDropdown(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete Video
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Videos State */}
        {!loading && filteredVideos.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Upload className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-900 dark:text-gray-100 text-lg font-semibold mb-2">
                {searchQuery || filterStatus !== "all"
                  ? "No videos found"
                  : "No videos yet"}
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm">
                {searchQuery || filterStatus !== "all"
                  ? "Try adjusting your search or filters"
                  : "Upload your first video to get started"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && selectedVideo && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-800 animate-in zoom-in duration-200">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Delete Video
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete "
              <span className="font-semibold text-gray-900 dark:text-white">
                {selectedVideo.title}
              </span>
              "? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedVideo(null);
                }}
                className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteVideo(selectedVideo._id)}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl hover:from-red-700 hover:to-red-600 transition-all shadow-lg shadow-red-500/25 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Publish Toggle Modal */}
      {showPublishModal && selectedVideo && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-800 animate-in zoom-in duration-200">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                selectedVideo.isPublished
                  ? "bg-yellow-100 dark:bg-yellow-900/20"
                  : "bg-green-100 dark:bg-green-900/20"
              }`}
            >
              {selectedVideo.isPublished ? (
                <EyeOff className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              ) : (
                <Globe className="w-6 h-6 text-green-600 dark:text-green-400" />
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedVideo.isPublished ? "Unpublish Video" : "Publish Video"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {selectedVideo.isPublished ? (
                <>
                  Are you sure you want to unpublish "
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {selectedVideo.title}
                  </span>
                  "? It will no longer be visible to the public.
                </>
              ) : (
                <>
                  Are you sure you want to publish "
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {selectedVideo.title}
                  </span>
                  "? It will be visible to everyone.
                </>
              )}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowPublishModal(false);
                  setSelectedVideo(null);
                }}
                className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleTogglePublish(selectedVideo._id)}
                disabled={publishLoading === selectedVideo._id}
                className={`flex-1 px-4 py-2.5 rounded-xl transition-all font-medium shadow-lg flex items-center justify-center gap-2 ${
                  selectedVideo.isPublished
                    ? "bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 shadow-yellow-500/25"
                    : "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-green-500/25"
                } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {publishLoading === selectedVideo._id ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : selectedVideo.isPublished ? (
                  "Unpublish"
                ) : (
                  "Publish"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedVideo && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full p-6 my-8 shadow-2xl border border-gray-200 dark:border-gray-800 animate-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
                  <Edit className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Edit Video
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedVideo(null);
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter video title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none resize-none transition-all"
                  placeholder="Enter video description"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Thumbnail Preview
                </label>
                <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                  <img
                    src={selectedVideo.thumbnail}
                    alt="Thumbnail"
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedVideo(null);
                }}
                className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateVideo}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl hover:from-red-700 hover:to-red-600 transition-all shadow-lg shadow-red-500/25 font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
