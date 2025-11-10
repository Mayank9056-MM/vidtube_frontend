import { Eye, Play } from "lucide-react";

interface Owner {
  _id: string;
  username: string;
  avatar: string;
}

interface Video {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoFile: string;
  duration: number;
  views: number;
  owner: Owner;
  createdAt: string;
  isPublished: boolean;
}


interface VideoCardProps {
  video: Video;
  theme: 'dark' | 'light';
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, theme }) => {
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatViews = (views: number): string => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const timeAgo = (date: string): string => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
      }
    }
    return 'Just now';
  };

  return (
    <div className={`group cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'} rounded-lg transition-colors`}>
      {/* Thumbnail */}
      <div className="relative rounded-lg overflow-hidden aspect-video mb-3">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          {formatDuration(video.duration)}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
          <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Video Info */}
      <div className="flex gap-3">
        <img
          src={video.owner.avatar}
          alt={video.owner.username}
          className="w-10 h-10 rounded-full flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold line-clamp-2 mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {video.title}
          </h3>
          <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {video.owner.username}
          </p>
          <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {formatViews(video.views)} views
            </span>
            <span>•</span>
            <span>{timeAgo(video.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};