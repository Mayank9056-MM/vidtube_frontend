import { useState, useRef, useEffect } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Download,
  Flag,
  Maximize,
  Minimize,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Clock,
  Eye,
  ChevronDown,
  ChevronUp,
  Send,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import type { RootState } from "@/app/store";
import { getVideoById } from "@/features/video/videoThunks";
import {
  getChannelSubscribers,
  getSubscribedChannels,
  toggleSubscription,
} from "@/features/subscription/subscriptionThunks";
import { setSubscriptionState } from "@/features/subscription/susbcriptionSlice";
import { logger } from "@/utls/logger";

const recommendedVideos = [
  {
    id: 2,
    thumbnail: "https://picsum.photos/seed/video2/320/180",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Channel2",
    title: "Advanced React Patterns You Should Know",
    channel: "Code Masters",
    views: "89K",
    time: "1 week ago",
    duration: "32:15",
  },
  {
    id: 3,
    thumbnail: "https://picsum.photos/seed/video3/320/180",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Channel3",
    title: "React State Management Complete Guide",
    channel: "Dev Tutorial",
    views: "234K",
    time: "3 days ago",
    duration: "45:22",
  },
  {
    id: 4,
    thumbnail: "https://picsum.photos/seed/video4/320/180",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Channel4",
    title: "Building a Full Stack App with React",
    channel: "Web Development Pro",
    views: "445K",
    time: "1 month ago",
    duration: "1:15:40",
  },
  {
    id: 5,
    thumbnail: "https://picsum.photos/seed/video5/320/180",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Channel5",
    title: "React Performance Optimization Tips",
    channel: "Tech Academy",
    views: "67K",
    time: "5 days ago",
    duration: "28:10",
  },
];

const mockComments = [
  {
    id: 1,
    user: "John Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    comment:
      "This is exactly what I needed! The explanations are crystal clear.",
    likes: 245,
    time: "2 days ago",
  },
  {
    id: 2,
    user: "Sarah Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    comment: "Best React tutorial I've watched. Thanks for making this!",
    likes: 189,
    time: "1 day ago",
  },
  {
    id: 3,
    user: "Mike Rodriguez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    comment: "The timestamps are super helpful. Great content as always! 🔥",
    likes: 156,
    time: "18 hours ago",
  },
];

export default function VideoPage() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const { videoId } = useParams();
  const videoData = useAppSelector(
    (state: RootState) => state.video.selectedVideo
  );
  logger.info("videodata from videoPage", videoData);
  const channelId = videoData?.owner?._id;

  const subscribedChannels = useAppSelector(
    (state: RootState) => state.subscription.subscribedChannels
  );

  const isSubscribed = useAppSelector(
    (state: RootState) => state.subscription.isSubscribed
  );

  const totalSubscribers = useAppSelector(
    (state: RootState) => state.subscription.totalSubscribers
  );

  const user = useAppSelector((state: RootState) => state.user.user);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(mockComments);
  const [theme] = useState("light");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    const currVideo = async () => {
      try {
        await dispatch(getVideoById(videoId));
      } catch (error) {
        console.log(error);
      }
    };
    currVideo();
  }, [videoId]);

  useEffect(() => {
    if (user?._id) {
      dispatch(getSubscribedChannels(user._id));
    }
  }, [user]);

  useEffect(() => {
    if (channelId && subscribedChannels.length > 0) {
      const alreadySubscribed = subscribedChannels.some(
        (ch) => ch.channel?._id === channelId
      );
      dispatch(setSubscriptionState(alreadySubscribed));
    }
  }, [channelId, subscribedChannels]);

  useEffect(() => {
    if (!videoData?.owner?._id) return; // wait until owner id is loaded
    dispatch(getChannelSubscribers(videoData.owner._id));
  }, [videoData?.owner?._id, dispatch]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!isFullscreen) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };

  const handleLike = () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
      setDisliked(false);
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      setDisliked(true);
      setLiked(false);
    }
  };

  const handleSubscribe = () => {
    if (!videoData?.owner?._id) return;
    dispatch(toggleSubscription(videoData.owner._id));
    dispatch(getSubscribedChannels(user?._id));
  };

  const handleComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        user: "Current User",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser",
        comment: comment,
        likes: 0,
        time: "Just now",
      };
      setComments([newComment, ...comments]);
      setComment("");
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num?.toString();
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "0:00";

    const sec = Math.floor(seconds % 60);
    const min = Math.floor((seconds / 60) % 60);
    const hrs = Math.floor(seconds / 3600);

    const s = sec < 10 ? `0${sec}` : sec;
    const m = min < 10 ? `0${min}` : min;

    if (hrs > 0) {
      const h = hrs < 10 ? `0${hrs}` : hrs;
      return `${h}:${m}:${s}`;
    }

    return `${m}:${s}`;
  };

  const formatDate = (date) => {
    if (!date) return "";

    const d = new Date(date);
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30 dark:from-black dark:via-gray-950 dark:to-red-950/10 transition-colors duration-500">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
            {/* Main Content */}
            <div className="flex-1 space-y-4">
              {/* Video Player */}
              <div
                ref={containerRef}
                className="relative bg-black rounded-xl overflow-hidden shadow-2xl group"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
              >
                <video
                  ref={videoRef}
                  className="w-full aspect-video"
                  src={videoData?.videoFile}
                  onClick={togglePlay}
                />

                {/* Video Controls Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
                    showControls ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {/* Center Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={togglePlay}
                      className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110"
                    >
                      {isPlaying ? (
                        <Pause className="w-10 h-10 text-white" />
                      ) : (
                        <Play className="w-10 h-10 text-white ml-1" />
                      )}
                    </button>
                  </div>

                  {/* Bottom Controls */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlay}
                        className="text-white hover:text-red-400 transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6" />
                        ) : (
                          <Play className="w-6 h-6" />
                        )}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="text-white hover:text-red-400 transition-colors"
                      >
                        {isMuted ? (
                          <VolumeX className="w-6 h-6" />
                        ) : (
                          <Volume2 className="w-6 h-6" />
                        )}
                      </button>
                      <span className="text-white text-sm font-medium">
                        {formatDuration(videoData?.duration)}
                      </span>
                    </div>

                    <button
                      onClick={toggleFullscreen}
                      className="text-white hover:text-red-400 transition-colors"
                    >
                      {isFullscreen ? (
                        <Minimize className="w-6 h-6" />
                      ) : (
                        <Maximize className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 lg:p-6 shadow-lg border border-gray-200 dark:border-gray-800">
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {videoData?.title}
                </h1>

                {/* Channel Info & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={videoData?.owner?.avatar}
                      alt={videoData?.owner?.username}
                      className="w-12 h-12 rounded-full border-2 border-red-500 dark:border-red-400"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {videoData?.owner?.username}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {totalSubscribers || 0} subscribers
                      </p>
                    </div>
                    <button
                      onClick={handleSubscribe}
                      className={`ml-2 px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        isSubscribed
                          ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                          : "bg-gradient-to-r from-red-600 to-red-700 dark:from-red-500 dark:to-red-600 text-white hover:from-red-700 hover:to-red-800 shadow-lg"
                      }`}
                    >
                      {isSubscribed ? "Subscribed" : "Subscribe"}
                    </button>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Like/Dislike */}
                    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <button
                        onClick={handleLike}
                        className={`flex items-center gap-2 px-4 py-2 transition-colors ${
                          liked
                            ? "text-red-600 dark:text-red-400"
                            : "text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                        }`}
                      >
                        <ThumbsUp className="w-5 h-5" />
                        <span className="font-medium">
                          {formatNumber(videoData?.likes)}
                          {/* TODO: Add like */}
                        </span>
                      </button>
                      <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
                      <button
                        onClick={handleDislike}
                        className={`px-4 py-2 transition-colors ${
                          disliked
                            ? "text-red-600 dark:text-red-400"
                            : "text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                        }`}
                      >
                        <ThumbsDown className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Share */}
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-300">
                      <Share2 className="w-5 h-5" />
                      <span className="hidden sm:inline font-medium">
                        Share
                      </span>
                    </button>

                    {/* Download */}
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-300">
                      <Download className="w-5 h-5" />
                    </button>

                    {/* Report */}
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-300">
                      <Flag className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Stats & Description */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center gap-4 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {videoData?.views} views
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatDate(videoData?.createdAt)}
                    </span>
                    <span className="px-3 py-1 bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-full text-xs">
                      {videoData?.category}
                    </span>
                  </div>

                  <div className="relative">
                    <p
                      className={`text-gray-700 dark:text-gray-300 whitespace-pre-wrap ${
                        showFullDescription ? "" : "line-clamp-3"
                      }`}
                    >
                      {videoData?.description}
                    </p>
                    <button
                      onClick={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                      className="flex items-center gap-1 mt-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                    >
                      {showFullDescription ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          Show less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          Show more
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 lg:p-6 shadow-lg border border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {comments.length} Comments
                </h2>

                {/* Add Comment */}
                <div className="flex gap-3 mb-6">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser"
                    alt="You"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-700 focus:border-red-500 dark:focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 rounded-lg p-3 resize-none text-gray-900 dark:text-white"
                      rows={2}
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <button
                        onClick={() => setComment("")}
                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleComment}
                        disabled={!comment.trim()}
                        className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 dark:from-red-500 dark:to-red-600 text-white hover:from-red-700 hover:to-red-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Comment
                      </button>
                    </div>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((c) => (
                    <div key={c.id} className="flex gap-3">
                      <img
                        src={c.avatar}
                        alt={c.user}
                        className="w-10 h-10 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {c.user}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {c.time}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                          {c.comment}
                        </p>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{c.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                            <ThumbsDown className="w-4 h-4" />
                          </button>
                          <button className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended Videos Sidebar */}
            <div className="lg:w-[400px] xl:w-[450px]">
              <div className="sticky top-4 space-y-3">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white px-2">
                  Recommended
                </h2>
                {recommendedVideos.map((video) => (
                  <div
                    key={video.id}
                    className="flex gap-3 p-2 rounded-xl hover:bg-white/80 dark:hover:bg-gray-900/80 backdrop-blur-xl cursor-pointer transition-all duration-300 group"
                  >
                    <div className="relative flex-shrink-0 w-40 h-24 rounded-lg overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm line-clamp-2 text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors mb-1">
                        {video.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        {video.channel}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {video.views}
                        </span>
                        <span>•</span>
                        <span>{video.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
