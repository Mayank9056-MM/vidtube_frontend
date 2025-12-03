import { useAppDispatch, useAppSelector } from "@/app/hooks";
import type { RootState } from "@/app/store";
import {
  getChannelStats,
  getChannelVideos,
  getSubscriptionStatus,
  toggleSubscription,
} from "@/features/subscription/subscriptionThunks";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate, formatDuration, formatNumber } from "@/utls/helpers";

const Icon = ({ name, className = "w-5 h-5" }) => {
  const icons = {
    arrowLeft: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
    ),
    bell: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
    ),
    checkCircle: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    users: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    video: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
    eye: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
    heart: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    trendingUp: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
    calendar: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    clock: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    thumbsUp: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
        />
      </svg>
    ),
    play: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    ),
  };
  return icons[name] || null;
};

export default function ChannelPage() {
  const [videos, setVideos] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");
  const theme = "dark";
  const { username } = useParams();
  const {
    allVideos,
    error,
    isSubscribed,
    loading,
    onSelectedChannel,
    totalLikes,
    totalSubscribers,
    totalViews,
    totalVideos,
  } = useAppSelector((state: RootState) => state.subscription);

  const { user } = useAppSelector((state: RootState) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChannelStats = async () => {
      try {
        await dispatch(getChannelStats(username));
      } catch (error) {
        console.log(error);
      }
    };

    fetchChannelStats();
  }, [dispatch, username]);

  useEffect(() => {
    if (username && user?._id) {
      dispatch(getSubscriptionStatus({ username, subscriberId: user._id }));
    }
  }, [username, user]);

  useEffect(() => {
    dispatch(getChannelVideos(username));
  }, [dispatch, username]);

  useEffect(() => {
    if (allVideos?.length > 0) {
      setVideos(allVideos);
    }
  }, [allVideos]);

  useEffect(() => {
    const sorted = [...videos].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
    });
    setVideos(sorted);
  }, [sortOrder]);

  const toggleSubscriptionHandler = () => {
    dispatch(toggleSubscription(onSelectedChannel?._id || "")).then(() => {
      dispatch(
        getSubscriptionStatus({
          username: onSelectedChannel?.username || "",
          subscriberId: user?._id || "",
        })
      );
    });
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-black" : "bg-white"
      } transition-colors duration-300`}
    >
      <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 ${
            theme === "dark"
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-black"
          } transition-colors group`}
        >
          <Icon
            name="arrowLeft"
            className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-xs sm:text-sm font-medium">
            Back to channels
          </span>
        </button>

        {/* Channel Header Card */}
        <div
          className={`overflow-hidden rounded-xl sm:rounded-2xl ${
            theme === "dark" ? "bg-gray-900" : "bg-gray-50"
          } shadow-xl relative`}
        >
          {/* Cover Image - Full Background */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(${onSelectedChannel?.coverImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90" />

          {/* Content */}
          <div className="relative z-10">
            {/* Top Spacer */}
            <div className="h-16 xs:h-20 sm:h-24 md:h-28 lg:h-32" />

            {/* Channel Info */}
            <div className="px-3 sm:px-4 md:px-6 lg:px-8 pb-4 sm:pb-6">
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                {/* Avatar */}
                <div
                  className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-xl sm:rounded-2xl flex-shrink-0 relative border-4 shadow-2xl overflow-hidden"
                  style={{
                    borderColor: theme === "dark" ? "#1f2937" : "#ffffff",
                  }}
                >
                  <img
                    src={onSelectedChannel?.avatar}
                    alt={onSelectedChannel?.username}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Channel Details */}
                <div className="flex-1 w-full sm:pt-2 md:pt-4">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Channel Name */}
                      <div className="flex items-center gap-2 mb-1 sm:mb-2">
                        <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold truncate text-white">
                          {onSelectedChannel?.username}
                        </h1>
                        {onSelectedChannel?.isVerified && (
                          <Icon
                            name="checkCircle"
                            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-400 flex-shrink-0"
                          />
                        )}
                      </div>

                      {/* Subscribers */}
                      <div className="flex items-center gap-2 mb-2 sm:mb-3 text-xs sm:text-sm md:text-base text-gray-300">
                        <Icon name="users" className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="font-medium">
                          {formatNumber(totalSubscribers || 0)} subscribers
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm md:text-base max-w-2xl line-clamp-2 text-gray-200">
                        {onSelectedChannel?.description ||
                          "No description available"}
                      </p>
                    </div>

                    {/* Subscribe Button */}
                    <button
                      onClick={toggleSubscriptionHandler}
                      className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap ${
                        isSubscribed
                          ? "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30"
                          : "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/50"
                      }`}
                    >
                      {isSubscribed ? (
                        <>
                          <Icon name="bell" className="w-4 h-4" />
                          Subscribed
                        </>
                      ) : (
                        "Subscribe"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {/* Total Videos */}
          <div
            className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 ${
              theme === "dark"
                ? "bg-gradient-to-br from-blue-900/30 to-cyan-900/30"
                : "bg-gradient-to-br from-blue-50 to-cyan-50"
            } backdrop-blur-xl border ${
              theme === "dark" ? "border-blue-800/30" : "border-blue-200/50"
            } hover:shadow-xl transition-all duration-300`}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Icon
                  name="video"
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white"
                />
              </div>
            </div>
            <p
              className={`text-xs sm:text-sm mb-0.5 sm:mb-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Total Videos
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {formatNumber(totalVideos || 0)}
            </p>
          </div>

          {/* Total Views */}
          <div
            className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 ${
              theme === "dark"
                ? "bg-gradient-to-br from-purple-900/30 to-pink-900/30"
                : "bg-gradient-to-br from-purple-50 to-pink-50"
            } backdrop-blur-xl border ${
              theme === "dark" ? "border-purple-800/30" : "border-purple-200/50"
            } hover:shadow-xl transition-all duration-300`}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Icon
                  name="eye"
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white"
                />
              </div>
            </div>
            <p
              className={`text-xs sm:text-sm mb-0.5 sm:mb-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Total Views
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {formatNumber(totalViews || 0)}
            </p>
          </div>

          {/* Total Likes */}
          <div
            className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 ${
              theme === "dark"
                ? "bg-gradient-to-br from-rose-900/30 to-orange-900/30"
                : "bg-gradient-to-br from-rose-50 to-orange-50"
            } backdrop-blur-xl border ${
              theme === "dark" ? "border-rose-800/30" : "border-rose-200/50"
            } hover:shadow-xl transition-all duration-300`}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-lg shadow-rose-500/30">
                <Icon
                  name="heart"
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white"
                />
              </div>
            </div>
            <p
              className={`text-xs sm:text-sm mb-0.5 sm:mb-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Total Likes
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
              {formatNumber(totalLikes || 0)}
            </p>
          </div>

          {/* Join Date */}
          <div
            className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 col-span-2 lg:col-span-1 ${
              theme === "dark"
                ? "bg-gradient-to-br from-indigo-900/30 to-violet-900/30"
                : "bg-gradient-to-br from-indigo-50 to-violet-50"
            } backdrop-blur-xl border ${
              theme === "dark" ? "border-indigo-800/30" : "border-indigo-200/50"
            } hover:shadow-xl transition-all duration-300`}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Icon
                  name="calendar"
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white"
                />
              </div>
            </div>
            <p
              className={`text-xs sm:text-sm mb-0.5 sm:mb-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Joined
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              {formatDate(onSelectedChannel?.createdAt) || "N/A"}
            </p>
          </div>
        </div>

        {/* Videos Section */}
        <div
          className={`rounded-xl sm:rounded-2xl ${
            theme === "dark" ? "bg-gray-900" : "bg-gray-50"
          } border ${
            theme === "dark" ? "border-gray-800" : "border-gray-200"
          } overflow-hidden`}
        >
          {/* Section Header */}
          <div
            className={`p-3 sm:p-4 md:p-6 border-b ${
              theme === "dark" ? "border-gray-800" : "border-gray-200"
            }`}
          >
            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3">
              <h2
                className={`text-base sm:text-lg md:text-xl font-bold ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                All Videos ({videos?.length || 0})
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSortOrder("latest")}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    sortOrder === "latest"
                      ? "bg-red-600 text-white shadow-lg shadow-red-500/30"
                      : theme === "dark"
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Latest
                </button>
                <button
                  onClick={() => setSortOrder("oldest")}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    sortOrder === "oldest"
                      ? "bg-red-600 text-white shadow-lg shadow-red-500/30"
                      : theme === "dark"
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Oldest
                </button>
              </div>
            </div>
          </div>

          {/* Videos Grid */}
          <div className="p-3 sm:p-4 md:p-6">
            {videos?.length > 0 ? (
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                {videos.map((video) => (
                  <div
                    key={video._id}
                    className={`group rounded-lg sm:rounded-xl overflow-hidden ${
                      theme === "dark" ? "bg-gray-800/50" : "bg-white"
                    } border ${
                      theme === "dark"
                        ? "border-gray-700/50"
                        : "border-gray-200"
                    } hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video">
                      <div
                        className="w-full h-full bg-gray-700"
                        style={{
                          backgroundImage: `url(${video?.thumbnail})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-red-600 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                          <Icon
                            name="play"
                            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white ml-1"
                          />
                        </div>
                      </div>
                      <div className="absolute bottom-1.5 sm:bottom-2 right-1.5 sm:right-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-black/90 text-white text-[10px] sm:text-xs font-semibold rounded">
                        {formatDuration(video?.duration)}
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-2.5 sm:p-3 md:p-4">
                      <h3
                        className={`font-semibold text-xs sm:text-sm mb-1.5 sm:mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[2.8rem] ${
                          theme === "dark"
                            ? "text-white group-hover:text-red-400"
                            : "text-black group-hover:text-red-600"
                        } transition-colors`}
                      >
                        {video?.title}
                      </h3>
                      <div
                        className={`flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <Icon name="eye" className="w-3 h-3" />
                          <span>{formatNumber(video?.views || 0)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="thumbsUp" className="w-3 h-3" />
                          <span>{formatNumber(video?.likes || 0)}</span>
                        </div>
                      </div>
                      <p
                        className={`text-[10px] sm:text-xs mt-1.5 sm:mt-2 ${
                          theme === "dark" ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        {formatDate(video?.updatedAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={`text-center py-12 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <p className="text-sm sm:text-base">No videos available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
