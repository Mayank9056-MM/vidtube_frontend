import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Video,
  History,
  Clock,
  ThumbsUp,
  PlaySquare,
  Flame,
  Music,
  Gamepad2,
  ListVideo,
  User,
  Settings,
  MessageSquare,
} from "lucide-react";

export const Sidebar = () => {
  const isOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);
  const navigate = useNavigate();

  const mainItems = [
    { icon: Home, label: "Home", path: "/home", active: true },
    { icon: Video, label: "Videos", path: "/videos" },
    { icon: MessageSquare, label: "Tweets", path: "/tweets" },
    { icon: PlaySquare, label: "Subscriptions", path: "/subscriptions" },
  ];

  const personalItems = [
    { icon: User, label: "Your Channel", path: "/channel" },
    { icon: History, label: "Watch History", path: "/history" },
    { icon: ListVideo, label: "Playlists", path: "/playlists" },
    { icon: Clock, label: "Watch Later", path: "/watch-later" },
    { icon: ThumbsUp, label: "Liked Videos", path: "/liked" },
  ];

  const exploreItems = [
    { icon: Flame, label: "Trending", path: "/trending" },
    { icon: Music, label: "Music", path: "/music" },
    { icon: Gamepad2, label: "Gaming", path: "/gaming" },
  ];

  const settingsItems = [
    { icon: Settings, label: "Settings", path: "/profile" },
  ];

  return (
    <aside
      className={`
        h-full bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800
        transition-all duration-300 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700
        ${isOpen ? "w-56 sm:w-64" : "w-16 sm:w-20"}
      `}
    >
      <div className="py-2">
        {/* Main Section */}
        <nav className="space-y-0.5 sm:space-y-1 px-2 sm:px-3 pb-2 sm:pb-3 border-b border-gray-200 dark:border-gray-800">
          {mainItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`
                flex items-center w-full p-2 sm:p-3 rounded-lg transition-colors
                ${
                  item.active
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }
                ${!isOpen ? "justify-center" : "gap-4 sm:gap-6"}
              `}
              title={!isOpen ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              {isOpen && (
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap truncate">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Personal Section */}
        {isOpen ? (
          <>
            <div className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200 dark:border-gray-800">
              <h3 className="px-2 sm:px-3 mb-1 sm:mb-2 text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                You
              </h3>
              <nav className="space-y-0.5 sm:space-y-1">
                {personalItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(item.path)}
                    className="flex items-center gap-4 sm:gap-6 w-full p-2 sm:p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium whitespace-nowrap truncate">
                      {item.label}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Explore Section */}
            <div className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200 dark:border-gray-800">
              <h3 className="px-2 sm:px-3 mb-1 sm:mb-2 text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                Explore
              </h3>
              <nav className="space-y-0.5 sm:space-y-1">
                {exploreItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(item.path)}
                    className="flex items-center gap-4 sm:gap-6 w-full p-2 sm:p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium whitespace-nowrap truncate">
                      {item.label}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Settings Section */}
            <div className="px-2 sm:px-3 py-2 sm:py-3">
              <nav className="space-y-0.5 sm:space-y-1">
                {settingsItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(item.path)}
                    className="flex items-center gap-4 sm:gap-6 w-full p-2 sm:p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium whitespace-nowrap truncate">
                      {item.label}
                    </span>
                  </button>
                ))}
              </nav>

              {/* Footer Links */}
              <div className="px-2 sm:px-3 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="space-y-1 sm:space-y-2 text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">About</a>
                    <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">Press</a>
                    <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">Copyright</a>
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">Contact</a>
                    <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">Creators</a>
                    <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">Advertise</a>
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">Terms</a>
                    <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">Privacy</a>
                  </div>
                  <p className="mt-2 sm:mt-4 text-gray-500 dark:text-gray-500">
                    © 2024 VidTube
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Collapsed Icons Only
          <nav className="space-y-0.5 sm:space-y-1 px-2 sm:px-3 pt-2 sm:pt-3">
            {[...personalItems, ...exploreItems, ...settingsItems].slice(0, 8).map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="flex items-center justify-center w-full p-2 sm:p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title={item.label}
              >
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            ))}
          </nav>
        )}
      </div>
    </aside>
  );
};