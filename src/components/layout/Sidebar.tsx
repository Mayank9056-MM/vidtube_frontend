import { useAppSelector } from "@/app/hooks";
import type { RootState } from "@/app/store";
import {
  Clock,
  Film,
  Folder,
  HelpCircle,
  History,
  Home,
  MessageSquare,
  PlaySquare,
  Settings,
  ThumbsUp,
  X,
} from "lucide-react";
import { useState } from "react";

// Sidebar Component
export const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState("home");
  const theme = useAppSelector((state: RootState) => state.user.theme);

  const menuItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "trending", icon: Film, label: "Trending" },
    { id: "subscriptions", icon: PlaySquare, label: "Subscriptions" },
  ];

  const libraryItems = [
    { id: "history", icon: History, label: "History" },
    { id: "watch-later", icon: Clock, label: "Watch Later" },
    { id: "liked", icon: ThumbsUp, label: "Liked Videos" },
    { id: "playlists", icon: Folder, label: "Playlists" },
  ];

  const MenuItem = ({ item, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
        activeItem === item.id
          ? theme === "dark"
            ? "bg-gray-800"
            : "bg-gray-200"
          : theme === "dark"
          ? "hover:bg-gray-800"
          : "hover:bg-gray-100"
      }`}
    >
      <item.icon className="w-5 h-5" />
      <span className="text-sm font-medium">{item.label}</span>
    </button>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 ${
          theme === "dark"
            ? "bg-gray-900 border-gray-800"
            : "bg-white border-gray-200"
        } border-r
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        overflow-y-auto
      `}
      >
        <div className="p-4 space-y-6">
          {/* Close button for mobile */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-opacity-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Main Menu */}
          <div>
            {menuItems?.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                onClick={() => {
                  setActiveItem(item.id);
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
              />
            ))}
          </div>

          {/* Divider */}
          <div
            className={`border-t ${
              theme === "dark" ? "border-gray-800" : "border-gray-200"
            }`}
          ></div>

          {/* Library */}
          <div>
            <h3
              className={`px-4 mb-2 text-xs font-semibold uppercase ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Library
            </h3>
            {libraryItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                onClick={() => {
                  setActiveItem(item.id);
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
              />
            ))}
          </div>

          {/* Divider */}
          <div
            className={`border-t ${
              theme === "dark" ? "border-gray-800" : "border-gray-200"
            }`}
          ></div>

          {/* Settings & Help */}
          <div>
            <MenuItem
              item={{ id: "settings", icon: Settings, label: "Settings" }}
              onClick={() => setActiveItem("settings")}
            />
            <MenuItem
              item={{ id: "help", icon: HelpCircle, label: "Help" }}
              onClick={() => setActiveItem("help")}
            />
            <MenuItem
              item={{
                id: "feedback",
                icon: MessageSquare,
                label: "Send Feedback",
              }}
              onClick={() => setActiveItem("feedback")}
            />
          </div>
        </div>
      </aside>
    </>
  );
};
