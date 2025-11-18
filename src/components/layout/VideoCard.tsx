import { useAppSelector } from "@/app/hooks";
import type { RootState } from "@/app/store";
import { Clock, Eye } from "lucide-react";

interface VideoCardProps {
  video: {
    id: number;
    thumbnail: string;
    avatar: string;
    title: string;
    channel: string;
    views: string;
    time: string;
    duration: string;
  };
}

export const VideoCard = ({ video }: VideoCardProps) => {
  const theme = useAppSelector((state: RootState) => state.user.theme);

  return (
    <div className="group cursor-pointer">
      <div className="relative rounded-xl overflow-hidden mb-3">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>
      <div className="flex gap-3">
        <img
          src={video.avatar}
          alt={video.channel}
          className="w-9 h-9 rounded-full object-cover flex-shrink-0"
        />

        <div className="flex-1">
          <h3
            className={`font-medium line-clamp-2 mb-1 group-hover:text-blue-500 transition-colors ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {video.title}
          </h3>
          <p
            className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {video.channel}
          </p>
          <div
            className={`flex items-center gap-2 text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {video.views} views
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {video.time}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
