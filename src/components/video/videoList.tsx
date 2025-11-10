import { VideoCard } from "./videoCard";

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

interface VideoListProps {
  videos: Video[];
  theme: "dark" | "light";
}

export const VideoList: React.FC<VideoListProps> = ({ videos, theme }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} theme={theme} />
      ))}
    </div>
  );
};
