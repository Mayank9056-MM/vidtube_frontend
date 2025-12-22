import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import type { RootState } from "@/app/store";
import { Loader2, Clock, Trash2, Search, X } from "lucide-react";
import { VideoCard } from "@/components/layout/VideoCard";
import { getWatchHistory } from "@/features/user/userThunks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function UserWatchHistory() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state: RootState) => state.user.theme);
  const { watchHistory, loading, error } = useAppSelector(
    (state: RootState) => state.user
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [filteredVideos, setFilteredVideos] = useState<any[]>([]);

  // Fetch watch history on component mount
  useEffect(() => {
    dispatch(getWatchHistory());
  }, [dispatch]);

  // Filter videos based on search query
  useEffect(() => {
    if (!watchHistory || watchHistory.length === 0) {
      setFilteredVideos([]);
      return;
    }

    if (!searchQuery.trim()) {
      setFilteredVideos(watchHistory);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = watchHistory.filter((video: any) => {
      const titleMatch = video.title?.toLowerCase().includes(query);
      const ownerMatch =
        video.owner?.username?.toLowerCase().includes(query) ||
        video.owner?.fullName?.toLowerCase().includes(query);
      const descMatch = video.description?.toLowerCase().includes(query);

      return titleMatch || ownerMatch || descMatch;
    });

    setFilteredVideos(filtered);
  }, [searchQuery, watchHistory]);

  const handleClearHistory = () => {
    // TODO: Implement clear history API call
    // dispatch(clearWatchHistory());
    setShowClearDialog(false);
  };

  const handleRefresh = () => {
    dispatch(getWatchHistory());
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-white dark:bg-black">
      {/* Header Section - Sticky */}
      <div className="sticky top-0 z-40 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <div className="px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <Clock className="w-6 h-6 text-red-600 dark:text-red-500" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  Watch History
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                  {watchHistory?.length || 0} video
                  {watchHistory?.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={loading}
                className="dark:border-gray-700 dark:hover:bg-gray-800"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Refresh"
                )}
              </Button>
              {watchHistory && watchHistory.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setShowClearDialog(true)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>
          </div>

          {/* Search Bar */}
          {watchHistory && watchHistory.length > 0 && (
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search in watch history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 h-11 dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:placeholder-gray-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="px-4 sm:px-6 py-4 sm:py-6">
        {/* Loading State (First Load) */}
        {loading && (!watchHistory || watchHistory.length === 0) && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-10 h-10 animate-spin text-red-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Loading watch history...
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-600 dark:text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Failed to load watch history
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
              <Button
                onClick={handleRefresh}
                className="bg-red-600 hover:bg-red-700"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Empty State - No Watch History */}
        {!loading && !error && watchHistory && watchHistory.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-10 h-10 text-gray-400 dark:text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No watch history yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Videos you watch will appear here
              </p>
            </div>
          </div>
        )}

        {/* Empty State - No Search Results */}
        {!loading &&
          searchQuery &&
          filteredVideos.length === 0 &&
          watchHistory &&
          watchHistory.length > 0 && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400 dark:text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your search terms
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery("")}
                  className="dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  Clear Search
                </Button>
              </div>
            </div>
          )}

        {/* Videos Grid */}
        {!loading && filteredVideos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
            {filteredVideos.map((video: any) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        )}
      </div>

      {/* Clear History Confirmation Dialog */}
      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent className="dark:bg-gray-900 dark:border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="dark:text-white">
              Clear watch history?
            </AlertDialogTitle>
            <AlertDialogDescription className="dark:text-gray-400">
              This will remove all videos from your watch history. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="dark:border-gray-700 dark:hover:bg-gray-800 dark:text-gray-300">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClearHistory}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Clear History
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
