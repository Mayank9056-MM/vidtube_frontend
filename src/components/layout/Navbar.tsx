import React, { useState } from "react";
import { Search, Upload, Bell, PlaySquare, Settings, User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import type { RootState } from "@/app/store";
import { useNavigate } from "react-router-dom";
import { LogoutUser } from "@/features/user/userThunks";

// Navbar Component
export const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { theme, user, loading, error } = useAppSelector(
    (state: RootState) => state.user
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const notifications = [
    { id: 1, text: "New comment on your video", time: "2m ago" },
    { id: 2, text: "Someone liked your post", time: "1h ago" },
    { id: 3, text: "New subscriber!", time: "3h ago" },
  ];

  const logOutHandler = async () => {
    await dispatch(LogoutUser());
  };

  return (
    <nav
      className={`sticky top-0 z-50 ${
        theme === "dark"
          ? "bg-gray-900 border-gray-800"
          : "bg-white border-gray-200"
      } border-b`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: Logo & Search */}
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center gap-2">
            <PlaySquare
              className={`w-8 h-8 ${
                theme === "dark" ? "text-red-500" : "text-red-600"
              }`}
            />
            <span className="text-xl font-bold hidden sm:block">VideoHub</span>
          </div>

          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className={`w-full px-4 py-2 pl-10 rounded-full ${
                  theme === "dark"
                    ? "bg-gray-800 text-white placeholder-gray-400 focus:bg-gray-700"
                    : "bg-gray-100 text-gray-900 placeholder-gray-500 focus:bg-gray-200"
                } focus:outline-none transition-colors`}
              />
              <Search
                className={`absolute left-3 top-2.5 w-5 h-5 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Upload Button */}
          <button
            onClick={() => navigate("/upload")}
            className={`p-2 rounded-full hover:bg-opacity-10 ${
              theme === "dark" ? "hover:bg-gray-500" : "hover:bg-black"
            } transition-colors`}
          >
            <Upload className="w-6 h-6" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2 rounded-full hover:bg-opacity-10 ${
                theme === "dark" ? "hover:bg-gray-500" : "hover:bg-black"
              } transition-colors relative`}
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <div
                className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg ${
                  theme === "dark"
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200"
                } overflow-hidden`}
              >
                <div
                  className={`px-4 py-3 border-b ${
                    theme === "dark" ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-4 py-3 hover:bg-opacity-5 ${
                        theme === "dark" ? "hover:bg-gray-500" : "hover:bg-black"
                      } cursor-pointer`}
                    >
                      <p className="text-sm">{notif.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {notif.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold"
            >
              {user?.username.charAt(0).toUpperCase()}
            </button>

            {showProfile && (
              <div
                className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg ${
                  theme === "dark"
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200"
                } overflow-hidden`}
              >
                <div
                  className={`px-4 py-3 border-b ${
                    theme === "dark" ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <p className="font-semibold">{user?.fullName}</p>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {user?.email}
                  </p>
                </div>
                <button
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-opacity-5 ${
                    theme === "dark" ? "hover:bg-gray-500" : "hover:bg-black"
                  }`}
                >
                  <User className="w-4 h-4 inline mr-2" />
                  {user?.username}
                </button>
                <button
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-opacity-5 ${
                    theme === "dark" ? "hover:bg-gray-500" : "hover:bg-black"
                  }`}
                >
                  <Settings className="w-4 h-4 inline mr-2" />
                  Settings
                </button>
                <div
                  className={`border-t ${
                    theme === "dark" ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <button
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-opacity-5 ${
                      theme === "dark" ? "hover:bg-gray-500" : "hover:bg-black"
                    }`}
                    onClick={() => logOutHandler()}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
