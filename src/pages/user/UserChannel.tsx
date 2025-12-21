import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import type { RootState } from "@/app/store";
import {
  Users,
  Video,
  Eye,
  ThumbsUp,
  TrendingUp,
  Calendar,
  Mail,
  MapPin,
  Link as LinkIcon,
  Edit,
  Share2,
  MoreVertical,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getChannelStats } from "@/features/subscription/subscriptionThunks";
import { formatNumber, formatDate } from "@/utls/helpers";
import { VideoCard } from "@/components/layout/VideoCard";
import { getUserVideos } from "@/features/video/videoThunks";

export default function UserChannel() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const theme = useAppSelector((state: RootState) => state.user.theme);
  const { user: currentUser } = useAppSelector(
    (state: RootState) => state.user
  );
  const {
    totalVideos,
    totalViews,
    totalLikes,
    totalSubscribers,
    loading: statsLoading,
    error,
    onSelectedChannel,
  } = useAppSelector((state: RootState) => state.subscription);
  const { videos, loading: videosLoading } = useAppSelector(
    (state: RootState) => state.video
  );

  const [activeTab, setActiveTab] = useState<"videos" | "about">("videos");
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    if (currentUser?.username) {
      dispatch(getChannelStats(currentUser.username));
      // Fetch user videos if you have channelStats.user._id
    }
  }, [currentUser?.username, dispatch]);

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getUserVideos({ userId: currentUser._id }));
    }
  }, [currentUser?._id, dispatch]);

  const isOwnChannel = currentUser?.username === onSelectedChannel?.username;

  const stats = [
    {
      label: "Subscribers",
      value: totalSubscribers || 0,
      icon: Users,
      color: "from-red-500 to-pink-500",
      bgColor:
        "from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20",
      iconColor: "text-red-600 dark:text-red-400",
    },
    {
      label: "Total Videos",
      value: totalVideos || 0,
      icon: Video,
      color: "from-blue-500 to-cyan-500",
      bgColor:
        "from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Total Views",
      value: totalViews || 0,
      icon: Eye,
      color: "from-green-500 to-emerald-500",
      bgColor:
        "from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      label: "Total Likes",
      value: totalLikes || 0,
      icon: ThumbsUp,
      color: "from-purple-500 to-violet-500",
      bgColor:
        "from-purple-100 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${currentUser?.fullName || currentUser?.username}'s Channel`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You can add a toast notification here
    }
    setShowShareMenu(false);
  };

  if (statsLoading && !currentUser?.username) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white dark:bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white dark:bg-black">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">
            Failed to load channel
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-black">
      {/* Channel Header */}
      <div className="relative">
        {/* Cover Image */}
        <img src={currentUser?.coverImage} className="w-full h-32 sm:h-48" />

        {/* Channel Info */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative -mt-16 sm:-mt-20 pb-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-end">
              {/* Avatar */}
              <div className="relative group">
                <img
                  src={
                    currentUser?.avatar ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.username}`
                  }
                  alt={currentUser?.fullName || currentUser?.username}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white dark:border-black object-cover shadow-2xl ring-4 ring-gray-200 dark:ring-gray-800"
                />
                {/* {currentUser?.isVerified && (
                  <div className="absolute bottom-2 right-2 bg-white dark:bg-black rounded-full p-1">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 fill-blue-500" />
                  </div>
                )} TODO: futhure task */}
              </div>

              {/* Channel Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1 truncate">
                      {currentUser?.fullName || currentUser?.username}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                      <p className="text-sm font-medium">
                        @{currentUser?.username}
                      </p>
                      <span>•</span>
                      <p className="text-sm">
                        {formatNumber(totalSubscribers || 0)} subscribers
                      </p>
                      <span>•</span>
                      <p className="text-sm">{totalVideos || 0} videos</p>
                    </div>
                    {currentUser?.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Mail className="w-4 h-4" />
                        {currentUser?.email}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {isOwnChannel ? (
                      <button
                        onClick={() => navigate("/settings")}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-700 transition-all font-medium"
                      >
                        <Edit className="w-4 h-4" />
                        <span className="hidden sm:inline">Edit Profile</span>
                      </button>
                    ) : (
                      <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl hover:from-red-700 hover:to-red-600 transition-all shadow-lg shadow-red-500/25 font-medium">
                        <Users className="w-4 h-4" />
                        Subscribe
                      </button>
                    )}

                    <div className="relative">
                      <button
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className="p-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>

                      {showShareMenu && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setShowShareMenu(false)}
                          />
                          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-1 z-20">
                            <button
                              onClick={handleShare}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <Share2 className="w-4 h-4" />
                              Share Channel
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 py-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-5 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${stat.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                  {formatNumber(stat.value)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-800">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab("videos")}
                className={`px-4 py-3 font-semibold border-b-2 transition-all ${
                  activeTab === "videos"
                    ? "border-red-600 text-red-600 dark:text-red-400"
                    : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                Videos
              </button>
              <button
                onClick={() => setActiveTab("about")}
                className={`px-4 py-3 font-semibold border-b-2 transition-all ${
                  activeTab === "about"
                    ? "border-red-600 text-red-600 dark:text-red-400"
                    : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                About
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {activeTab === "videos" && (
          <div>
            {videosLoading && videos.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-red-600" />
              </div>
            ) : videos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {videos.map((video: any) => (
                  <VideoCard key={video._id} video={video} />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 text-lg font-semibold mb-2">
                    No videos yet
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 text-sm">
                    This channel hasn't uploaded any videos
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "about" && (
          <div className="max-w-3xl">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                About
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Subscribers
                    </p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {formatNumber(totalSubscribers || 0)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Video className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total Videos
                    </p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {totalVideos || 0}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total Views
                    </p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {formatNumber(totalViews || 0)}
                    </p>
                  </div>
                </div>

                {currentUser?.createdAt && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Joined
                      </p>
                      <p className="text-base font-semibold text-gray-900 dark:text-white">
                        {formatDate(currentUser?.createdAt)}
                      </p>
                    </div>
                  </div>
                )}

                {currentUser?.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Email
                      </p>
                      <p className="text-base font-semibold text-gray-900 dark:text-white break-all">
                        {currentUser?.email}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
