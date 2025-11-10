import React, { useState, useEffect } from "react";
import {
  Menu,
  Search,
  Bell,
  User,
  TrendingUp,
  Clock,
  ThumbsUp,
  Video,
  Upload,
  LogOut,
  Settings,
  Moon,
  Sun,
  Play,
  Eye,
  Sidebar,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { VideoList } from "@/components/video/videoList";

// Types
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

// Dummy data matching your API response structure
const dummyVideos: Video[] = [
  {
    _id: "1",
    title: "Beautiful Mountain Landscape 4K",
    description: "Stunning mountain views with breathtaking scenery",
    thumbnail:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop",
    videoFile: "http://example.com/video1.mp4",
    duration: 8.25,
    views: 1234,
    owner: {
      _id: "owner1",
      username: "NatureExplorer",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    },
    createdAt: "2025-08-21T14:00:48.858Z",
    isPublished: true,
  },
  {
    _id: "2",
    title: "Coding Tutorial: React Hooks",
    description: "Learn React Hooks in 15 minutes",
    thumbnail:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop",
    videoFile: "http://example.com/video2.mp4",
    duration: 15.5,
    views: 5678,
    owner: {
      _id: "owner2",
      username: "CodeMaster",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    createdAt: "2025-08-20T10:30:00.000Z",
    isPublished: true,
  },
  {
    _id: "3",
    title: "Sunset Timelapse Beach",
    description: "Relaxing sunset by the ocean",
    thumbnail:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=225&fit=crop",
    videoFile: "http://example.com/video3.mp4",
    duration: 12.3,
    views: 9012,
    owner: {
      _id: "owner3",
      username: "BeachVibes",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    createdAt: "2025-08-19T16:45:00.000Z",
    isPublished: true,
  },
  {
    _id: "4",
    title: "City Lights Night Drive",
    description: "Night driving through Tokyo streets",
    thumbnail:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=225&fit=crop",
    videoFile: "http://example.com/video4.mp4",
    duration: 20.1,
    views: 3456,
    owner: {
      _id: "owner4",
      username: "UrbanExplorer",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    createdAt: "2025-08-18T22:15:00.000Z",
    isPublished: true,
  },
  {
    _id: "5",
    title: "Cooking Italian Pasta",
    description: "Authentic carbonara recipe",
    thumbnail:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=225&fit=crop",
    videoFile: "http://example.com/video5.mp4",
    duration: 18.7,
    views: 7890,
    owner: {
      _id: "owner5",
      username: "ChefMario",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    createdAt: "2025-08-17T11:20:00.000Z",
    isPublished: true,
  },
  {
    _id: "6",
    title: "Workout Routine for Beginners",
    description: "10-minute home workout",
    thumbnail:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop",
    videoFile: "http://example.com/video6.mp4",
    duration: 10.5,
    views: 4321,
    owner: {
      _id: "owner6",
      username: "FitLife",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    createdAt: "2025-08-16T08:00:00.000Z",
    isPublished: true,
  },
  {
    _id: "7",
    title: "Wildlife Safari Adventure",
    description: "Lions and elephants in the wild",
    thumbnail:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=225&fit=crop",
    videoFile: "http://example.com/video7.mp4",
    duration: 25.4,
    views: 6543,
    owner: {
      _id: "owner7",
      username: "WildlifeDoc",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    },
    createdAt: "2025-08-15T14:30:00.000Z",
    isPublished: true,
  },
  {
    _id: "8",
    title: "Jazz Music for Studying",
    description: "Smooth jazz instrumentals",
    thumbnail:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=225&fit=crop",
    videoFile: "http://example.com/video8.mp4",
    duration: 30.0,
    views: 12345,
    owner: {
      _id: "owner8",
      username: "JazzVibes",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    createdAt: "2025-08-14T19:00:00.000Z",
    isPublished: true,
  },
];

// Main Home Component
export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const categories = [
    "All",
    "Gaming",
    "Music",
    "Tech",
    "Cooking",
    "Travel",
    "Education",
    "Fitness",
  ];

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-950 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Navbar theme={theme} toggleTheme={toggleTheme} isMobile={isMobile} />

      <div className="flex">
        <Sidebar
          theme={theme}
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          isMobile={isMobile}
        />

        <main className="flex-1 p-6">
          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className={`mb-4 p-2 rounded-lg ${
                theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <Menu className="w-6 h-6" />
            </button>
          )}

          {/* Category Pills */}
          <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  category === "All"
                    ? theme === "dark"
                      ? "bg-white text-black"
                      : "bg-black text-white"
                    : theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Video Grid */}
          <VideoList videos={dummyVideos} theme={theme} />
        </main>
      </div>
    </div>
  );
}
