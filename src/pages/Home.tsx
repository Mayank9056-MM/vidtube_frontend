import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import type { RootState } from "@/app/store";
import { CheckCircle, MoreVertical, Loader2 } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { VideoCard } from "@/components/layout/VideoCard";
import { getAllVideos } from "@/features/video/videoThunks";
import {formatDate,formatDuration,formatNumber} from "@/utls/helpers"

// Assuming you have this thunk in your video slice
// import { fetchAllVideos } from "@/features/video/videoThunks";

export default function Home() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state: RootState) => state.user.theme);
  const { videos, loading, error, pagination } = useAppSelector(
    (state: RootState) => state.video
  );

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { ref, inView } = useInView({
    threshold: 0,
  });

  // Fetch videos on component mount and when filters change
  useEffect(() => {
    fetchVideos();
  }, [page, selectedCategory, searchQuery]);

  // Infinite scroll - load more when bottom is reached
  useEffect(() => {
    if (inView && !loading && pagination && page < pagination.totalPages) {
      setPage((prev) => prev + 1);
    }
  }, [inView, loading, pagination]);

  const fetchVideos = async () => {
    const params = {
      page,
      limit: 12,
      ...(searchQuery && { query: searchQuery }),
      sortBy: "createdAt",
      sortType: "desc",
    };

    // Dispatch your fetch action here
    await dispatch(getAllVideos());
  };

  const categories = [
    "All",
    "Gaming",
    "Music",
    "Tech",
    "Cooking",
    "Travel",
    "Education",
    "Fitness",
    "Photography",
    "Programming",
    "Design",
    "Business",
  ];

  // Helper function to format views
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-white dark:bg-black">
      {/* Category Chips - Sticky */}
      <div className="sticky top-0 z-40 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 py-3">
        <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setPage(1);
              }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-full whitespace-nowrap text-xs sm:text-sm font-medium transition-all flex-shrink-0 ${
                category === selectedCategory
                  ? "bg-gray-900 dark:bg-white text-white dark:text-black"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div className="px-4 sm:px-6 py-4 sm:py-6">
        {/* Loading State (First Load) */}
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
                onClick={() => fetchVideos()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Videos Grid */}
        {!loading || videos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
              {videos.map((video: any) => (
                <VideoCard
                  key={video._id}
                  video={{
                    id: video._id,
                    thumbnail: video.thumbnail,
                    title: video.title,
                    channel: video.owner?.username || "Unknown",
                    avatar:
                      video.owner?.avatar ||
                      `https://ui-avatars.com/api/?name=${video.owner?.username}&background=ef4444&color=fff`,
                    views: formatViews(video.views || 0),
                    uploadedAt: formatDate(video.createdAt || new Date()),
                    duration: formatDuration(video.duration || 0),
                    verified: video.owner?.isVerified || false,
                  }}
                  theme={theme}
                />
              ))}
            </div>

            {/* Infinite Scroll Trigger */}
            {pagination && page < pagination.totalPages && (
              <div ref={ref} className="flex justify-center py-8">
                {loading && (
                  <Loader2 className="w-6 h-6 animate-spin text-red-600" />
                )}
              </div>
            )}

            {/* End of Results */}
            {pagination &&
              page >= pagination.totalPages &&
              videos.length > 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>You've reached the end</p>
                </div>
              )}
          </>
        ) : null}

        {/* No Videos State */}
        {!loading && videos.length === 0 && !error && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No videos found
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                Try adjusting your search or filters
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
