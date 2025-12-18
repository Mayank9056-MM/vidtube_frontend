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
  Check
} from "lucide-react";
import { getAllVideos } from "@/features/video/videoThunks";
import { formatDate, formatDuration, formatNumber } from "@/utls/helpers";

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
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    fetchUserVideos();
  }, []);

  const fetchUserVideos = async () => {
    try {
      await dispatch(getAllVideos());
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleDeleteVideo = async (videoId: string) => {
    try {
      console.log("Deleting video:", videoId);
      setShowDeleteModal(false);
      setSelectedVideo(null);
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const handleUpdateVideo = async () => {
    try {
      const videoData = {
        title: editTitle,
        description: editDescription,
      };
      console.log("Updating video:", videoData);
      setShowEditModal(false);
      setSelectedVideo(null);
    } catch (error) {
      console.error("Error updating video:", error);
    }
  };

  const openEditModal = (video: any) => {
    setSelectedVideo(video);
    setEditTitle(video.title);
    setEditDescription(video.description || "");
    setShowEditModal(true);
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

  return (
    <div className="w-full h-full overflow-y-auto bg-white dark:bg-black">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                My Videos
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Manage and edit your uploaded content
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <Upload className="w-4 h-4" />
              Upload Video
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search your videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none"
              >
                <option value="all">All Videos</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
              </select>
              <button
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Videos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {videos.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                <Upload className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {formatNumber(videos.reduce((acc: number, v: any) => acc + (v.views || 0), 0))}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Published</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {videos.filter((v: any) => v.isPublished).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
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
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Videos List/Grid */}
        {!loading && filteredVideos.length > 0 && (
          <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "space-y-3"}>
            {filteredVideos.map((video: any) => (
              <div
                key={video._id}
                className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow ${
                  viewMode === "list" ? "flex gap-4 p-4" : ""
                }`}
              >
                {/* Thumbnail */}
                <div className={viewMode === "list" ? "w-40 flex-shrink-0" : ""}>
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className={`w-full object-cover ${
                        viewMode === "list" ? "h-24 rounded-lg" : "aspect-video"
                      }`}
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                      {formatDuration(video.duration || 0)}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 ${viewMode === "grid" ? "p-4" : ""}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {formatNumber(video.views || 0)} views
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(video.createdAt)}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                            video.isPublished
                              ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                              : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400"
                          }`}
                        >
                          {video.isPublished ? "Published" : "Draft"}
                        </span>
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
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </button>

                      {activeDropdown === video._id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setActiveDropdown(null)}
                          />
                          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-20">
                            <button
                              onClick={() => {
                                openEditModal(video);
                                setActiveDropdown(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
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
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Delete Video
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete "{selectedVideo.title}"? This action
              cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedVideo(null);
                }}
                className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteVideo(selectedVideo._id)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full p-6 my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Edit Video
              </h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedVideo(null);
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Thumbnail Preview
                </label>
                <img
                  src={selectedVideo.thumbnail}
                  alt="Thumbnail"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedVideo(null);
                }}
                className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateVideo}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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