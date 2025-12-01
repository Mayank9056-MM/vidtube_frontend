import { useAppDispatch, useAppSelector } from "@/app/hooks";
import type { RootState } from "@/app/store";
import {
  getChannelStats,
  getChannelVideos,
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
  // const [channel, setChannel] = useState(mockChannel);
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

  console.log("allVideos -> ", allVideos);
  console.log("onSelectedChannel -> ", onSelectedChannel);
  console.log(totalLikes);
  console.log(videos, "videos");

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
    const fetchAllVideos = async () => {
      try {
        await dispatch(getChannelVideos(username));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllVideos();
  }, [dispatch, username]);

  useEffect(() => {
    // const sortedVideos = allVideos?.sort((a, b) => {
    //   if (sortOrder === "latest") {
    //     return b.uploadDate.getTime() - a.uploadDate.getTime();
    //   } else {
    //     return a.uploadDate.getTime() - b.uploadDate.getTime();
    //   }
    // });
    setVideos(allVideos);
  }, [sortOrder]);

  const toggleSubscription = () => {
    setChannel((prev) => ({ ...prev, isSubscribed: !prev.isSubscribed }));
  };

  // const toggleTheme = () => {
  //   setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  // };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-black" : "bg-white"
      } transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 ${
            theme === "dark"
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-black"
          } transition-colors`}
        >
          <Icon name="arrowLeft" />
          <span className="text-sm font-medium">Back to channels</span>
        </button>

        <div
          className={`overflow-hidden rounded-2xl ${
            theme === "dark" ? "bg-gray-900" : "bg-gray-50"
          } shadow-xl`}
        >
          <div
            className="h-32 sm:h-40 md:h-48 lg:h-56 relative"
            style={{
              backgroundImage: `url(${onSelectedChannel?.coverImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>

          <div className="px-4 sm:px-6 lg:px-8 pb-6">
            <div className="flex flex-col sm:flex-row items-start gap-4 -mt-12 sm:-mt-16">
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-2xl flex items-center justify-center text-white font-bold text-2xl sm:text-3xl lg:text-4xl shadow-2xl border-4 flex-shrink-0 relative"
                style={{
                  backgroundImage: `url(${onSelectedChannel?.coverImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <img
                  src={onSelectedChannel?.avatar}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl z-10"
                />
              </div>

              <div className="flex-1 w-full sm:pt-8 lg:pt-12">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h1
                        className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${
                          theme === "dark" ? "text-white" : "text-black"
                        }`}
                      >
                        {onSelectedChannel?.username}
                      </h1>
                      {onSelectedChannel?.isVerified && (
                        <Icon
                          name="checkCircle"
                          className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 flex-shrink-0"
                        />
                      )}
                    </div>
                    <div
                      className={`flex items-center gap-2 mb-3 text-sm sm:text-base ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <Icon name="users" className="w-4 h-4" />
                      <span className="font-medium">
                        {totalSubscribers || 0} subscribers
                      </span>
                    </div>
                    <p
                      className={`text-sm sm:text-base max-w-2xl ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {onSelectedChannel?.description || ""}
                    </p>
                  </div>

                  <button
                    onClick={toggleSubscription}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                      onSelectedChannel?.isSubscribed
                        ? theme === "dark"
                          ? "bg-gray-800 text-white hover:bg-gray-700"
                          : "bg-gray-200 text-black hover:bg-gray-300"
                        : "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/30"
                    }`}
                  >
                    {onSelectedChannel?.isSubscribed ? (
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            className={`rounded-2xl p-6 ${
              theme === "dark"
                ? "bg-gradient-to-br from-blue-900/30 to-cyan-900/30"
                : "bg-gradient-to-br from-blue-50 to-cyan-50"
            } backdrop-blur-xl border ${
              theme === "dark" ? "border-blue-800/30" : "border-blue-200/50"
            } hover:shadow-xl transition-all duration-300`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Icon name="video" className="w-6 h-6 text-white" />
              </div>
            </div>
            <p
              className={`text-sm mb-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Total Videos
            </p>
            <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {totalVideos || 0}
            </p>
          </div>

          <div
            className={`rounded-2xl p-6 ${
              theme === "dark"
                ? "bg-gradient-to-br from-purple-900/30 to-pink-900/30"
                : "bg-gradient-to-br from-purple-50 to-pink-50"
            } backdrop-blur-xl border ${
              theme === "dark" ? "border-purple-800/30" : "border-purple-200/50"
            } hover:shadow-xl transition-all duration-300`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Icon name="eye" className="w-6 h-6 text-white" />
              </div>
            </div>
            <p
              className={`text-sm mb-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Total Views
            </p>
            <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {totalViews || 0}
            </p>
          </div>

          <div
            className={`rounded-2xl p-6 ${
              theme === "dark"
                ? "bg-gradient-to-br from-rose-900/30 to-orange-900/30"
                : "bg-gradient-to-br from-rose-50 to-orange-50"
            } backdrop-blur-xl border ${
              theme === "dark" ? "border-rose-800/30" : "border-rose-200/50"
            } hover:shadow-xl transition-all duration-300`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-lg shadow-rose-500/30">
                <Icon name="heart" className="w-6 h-6 text-white" />
              </div>
            </div>
            <p
              className={`text-sm mb-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Total Likes
            </p>
            <p className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
              {totalLikes || 0}
            </p>
          </div>

          <div
            className={`rounded-2xl p-6 ${
              theme === "dark"
                ? "bg-gradient-to-br from-emerald-900/30 to-teal-900/30"
                : "bg-gradient-to-br from-emerald-50 to-teal-50"
            } backdrop-blur-xl border ${
              theme === "dark"
                ? "border-emerald-800/30"
                : "border-emerald-200/50"
            } hover:shadow-xl transition-all duration-300`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Icon name="trendingUp" className="w-6 h-6 text-white" />
              </div>
            </div>
            <p
              className={`text-sm mb-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Engagement
            </p>
            <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {onSelectedChannel?.engagement || ""}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            className={`rounded-2xl p-6 ${
              theme === "dark" ? "bg-gray-900" : "bg-gray-50"
            } border ${
              theme === "dark" ? "border-gray-800" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <Icon name="calendar" className="w-5 h-5 text-white" />
              </div>
              <div>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Joined YouTube
                </p>
                <p
                  className={`font-semibold ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {formatDate(onSelectedChannel?.createdAt) || " "}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`rounded-2xl p-6 ${
              theme === "dark" ? "bg-gray-900" : "bg-gray-50"
            } border ${
              theme === "dark" ? "border-gray-800" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
                <Icon name="clock" className="w-5 h-5 text-white" />
              </div>
              <div>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Upload Frequency
                </p>
                <p
                  className={`font-semibold ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {onSelectedChannel?.uploadFrequency || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`rounded-2xl ${
            theme === "dark" ? "bg-gray-900" : "bg-gray-50"
          } border ${
            theme === "dark" ? "border-gray-800" : "border-gray-200"
          } overflow-hidden`}
        >
          <div
            className={`p-6 border-b ${
              theme === "dark" ? "border-gray-800" : "border-gray-200"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2
                className={`text-xl font-bold ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                All Videos
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSortOrder("latest")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
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
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
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

          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos?.map((video) => (
                <div
                  key={video._id}
                  className={`group rounded-xl overflow-hidden ${
                    theme === "dark" ? "bg-gray-800/50" : "bg-white"
                  } border ${
                    theme === "dark" ? "border-gray-700/50" : "border-gray-200"
                  } hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
                >
                  <div className="relative aspect-video">
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: `url(${video?.thumbnail})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderColor: theme === "dark" ? "#111827" : "#ffffff",
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-2xl">
                        <Icon name="play" className="w-7 h-7 text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/90 text-white text-xs font-semibold rounded">
                      {formatDuration(video?.duration)}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3
                      className={`font-semibold mb-2 line-clamp-2 ${
                        theme === "dark"
                          ? "text-white group-hover:text-red-400"
                          : "text-black group-hover:text-red-600"
                      } transition-colors`}
                    >
                      {video?.title}
                    </h3>
                    <div
                      className={`flex items-center gap-3 text-xs ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        <Icon name="eye" className="w-3 h-3" />
                        {video?.views || 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="thumbsUp" className="w-3 h-3" />
                        {video?.likes || 0}
                      </div>
                    </div>
                    <p
                      className={`text-xs mt-2 ${
                        theme === "dark" ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      {formatDate(video?.updatedAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
