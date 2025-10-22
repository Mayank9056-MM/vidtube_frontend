import { useState } from "react";
import { useAppSelector } from "@/app/hooks";
import type { RootState } from "@/app/store";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Menu, Play, Clock, Eye } from "lucide-react";
import { VideoCard } from "@/components/layout/VideoCard";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const theme = useAppSelector((state: RootState) => state.user.theme);
  const videos = useAppSelector((state: RootState) => state.video.videos)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`flex h-screen ${
        theme === "dark"
          ? "bg-gray-950 text-white"
          : "bg-white text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Mobile Menu Button */}
        <div className="lg:hidden sticky top-[60px] z-40">
          <button
            onClick={toggleSidebar}
            className={`m-4 p-2 rounded-lg ${
              theme === "dark"
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-100 hover:bg-gray-200"
            } transition-colors`}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Category Chips */}
            <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
              {["All", "Gaming", "Music", "Tech", "Cooking", "Travel", "Education", "Fitness"].map(
                (category) => (
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
                )
              )}
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}