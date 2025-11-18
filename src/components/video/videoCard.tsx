import { CheckCircle, MoreVertical } from "lucide-react";
import { useState } from "react";

interface VideoCardProps {
  video: {
    id: string;
    thumbnail: string;
    title: string;
    channel: string;
    channelAvatar: string;
    views: string;
    uploadedAt: string;
    duration: string;
    verified?: boolean;
  };
  theme: string;
}

const VideoCard = ({ video, theme }: VideoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleVideoClick = () => {
    // Navigate to video page
    // window.location.href = `/watch/${video.id}`;
  };

  return (
    <div
      className="flex flex-col cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleVideoClick}
    >
      {/* Thumbnail Container */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800 mb-3">
        {!imageError ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-700">
            <span className="text-gray-500 dark:text-gray-400">No Image</span>
          </div>
        )}

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-2 py-0.5 rounded">
          {video.duration}
        </div>

        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                <div className="w-0 h-0 border-l-[12px] border-l-gray-900 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="flex gap-3">
        {/* Channel Avatar */}
        <div className="flex-shrink-0">
          <img
            src={video.channelAvatar}
            alt={video.channel}
            className="w-9 h-9 rounded-full"
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${video.channel}&background=ef4444&color=fff`;
            }}
          />
        </div>

        {/* Text Info */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
            {video.title}
          </h3>

          {/* Channel Name */}
          <div className="flex items-center gap-1 mb-1">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              {video.channel}
            </p>
            {video.verified && (
              <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
            )}
          </div>

          {/* Views & Date */}
          <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <span>{video.views} views</span>
            <span>•</span>
            <span>{video.uploadedAt}</span>
          </div>
        </div>

        {/* More Options */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Handle more options
          }}
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
        >
          <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
};