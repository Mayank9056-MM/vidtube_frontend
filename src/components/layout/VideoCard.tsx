import { useAppSelector } from "@/app/hooks";
import type { RootState } from "@/app/store";
import { Clock, Eye, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDate, formatDuration, formatNumber } from "@/utls/helpers";

interface VideoCardProps {
  video: {
    _id: number;
    thumbnail: string;
    avatar?: string;
    owner?: {
      avatar?: string;
      username?: string;
      fullName?: string;
    };
    title: string;
    channel?: string;
    views: string | number;
    uploadedAt?: string;
    createdAt?: string;
    duration: string | number;
    verified?: boolean;
  };
}

export const VideoCard = ({ video }: VideoCardProps) => {
  const theme = useAppSelector((state: RootState) => state.user.theme);
  const navigate = useNavigate();

  // Extract avatar with fallback logic
  const avatarUrl = video.avatar || video.owner?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=default";
  
  // Extract channel name with fallback logic
  const channelName = video.channel || video.owner?.username || video.owner?.fullName || "Unknown Channel";
  
  // Extract upload date with fallback
  const uploadDate = video.uploadedAt || video.createdAt || new Date().toISOString();

  return (
    <div
      className="group cursor-pointer"
      key={video._id}
      onClick={() => navigate(`/watch/${video._id}`)}
    >
      {/* Thumbnail Container */}
      <div className="relative rounded-xl overflow-hidden mb-3 bg-gray-100 dark:bg-gray-900">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://via.placeholder.com/640x360?text=No+Thumbnail";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-2 right-2 bg-black/90 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-md">
          {formatDuration(video.duration)}
        </div>
      </div>

      {/* Video Info */}
      <div className="flex gap-3">
        {/* Channel Avatar */}
        <div className="flex-shrink-0">
          <img
            src={avatarUrl}
            alt={channelName}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-transparent group-hover:ring-gray-200 dark:group-hover:ring-gray-700 transition-all duration-300"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${channelName}`;
            }}
          />
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3
            className={`font-semibold text-sm leading-tight line-clamp-2 mb-1.5 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {video.title}
          </h3>

          {/* Channel Name */}
          <div className="flex items-center gap-1 mb-1">
            <p
              className={`text-sm font-medium truncate ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {channelName}
            </p>
            {video.verified && (
              <CheckCircle className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
            )}
          </div>

          {/* Views and Date */}
          <div
            className={`flex items-center gap-1.5 text-xs ${
              theme === "dark" ? "text-gray-500" : "text-gray-600"
            }`}
          >
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatNumber(video.views)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDate(uploadDate)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};