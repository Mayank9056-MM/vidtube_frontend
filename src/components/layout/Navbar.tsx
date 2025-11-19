import type { RootState } from "@/app/store";
import { toggleSidebar } from "@/features/ui/uiSlice";
import { useNavigate } from "react-router-dom";
import { Menu, Search, Mic, Bell, Plus, X, Settings, LogOut, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logout } from "@/features/user/userSlice";
import { useToast } from "@/hooks/useToast";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
    const { showError, showSuccess } = useToast();

  const user = useAppSelector((state: RootState) => state.user.user);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async() => {
    // Add your logout logic here
    // Example: dispatch(logout()); or clear tokens
    await dispatch(logout())
    console.log("Logging out...");
    showSuccess("Logout successful 🎉");
    // navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-2 sm:px-4 py-2 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm">
      {/* Left Side - Hamburger + Logo */}
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors flex-shrink-0"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
        </button>

        <div
          className="flex items-center gap-1 sm:gap-2 cursor-pointer flex-shrink-0"
          onClick={() => navigate("/home")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 512 512"
            className="sm:w-9 sm:h-9"
          >
            <defs>
              <linearGradient id="nav-grad" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#ff3b30" />
                <stop offset="1" stopColor="#c0122a" />
              </linearGradient>
            </defs>
            <rect
              x="24"
              y="24"
              width="464"
              height="464"
              rx="88"
              fill="url(#nav-grad)"
            />
            <g transform="translate(140,124) scale(0.9)">
              <path
                d="M86 36.5C92.1 40 96 46.9 96 54.7V213.3C96 221.1 92.1 228 86 231.5C78.9 235 69.7 232.6 63.9 226.8L13.8 176.7C8.0 170.9 8.0 160.1 13.8 154.3L63.9 104.2C69.7 98.4 78.9 96 86 99.5Z"
                fill="#ffffff"
              />
            </g>
            <g transform="translate(300,120) scale(0.82)">
              <path
                d="M58.9 11.7c-2.1 0.9-4.3 1.5-6.6 1.8 2.4-1.4 4.3-3.6 5.2-6.3-2.3 1.4-4.9 2.4-7.6 3-2.2-2.3-5.3-3.7-8.8-3.7-6.7 0-12.1 5.4-12.1 12.1 0 0.95 0.11 1.88 0.31 2.77-10.05-0.5-18.96-5.32-24.94-12.62-1.04 1.79-1.63 3.86-1.63 6.08 0 4.19 2.13 7.9 5.36 10.07-1.98-0.062-3.84-0.61-5.46-1.51v0.15c0 5.85 4.17 10.74 9.71 11.85-1.02 0.28-2.09 0.43-3.2 0.43-0.78 0-1.54-0.075-2.28-0.21 1.55 4.79 6.05 8.28 11.39 8.38-4.18 3.27-9.46 5.22-15.19 5.22-0.99 0-1.97-0.058-2.93-0.17 5.42 3.47 11.86 5.49 18.77 5.49 22.52 0 34.86-18.66 34.86-34.86 0-0.53-0.012-1.06-0.036-1.58 2.4-1.72 4.48-3.86 6.13-6.31-2.19 0.97-4.55 1.62-7.02 1.91z"
                fill="#fff"
              />
            </g>
          </svg>
          <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white hidden xs:block">
            VidTube
          </span>
        </div>
      </div>

      {/* Center - Search Bar (Desktop & Tablet) */}
      <div className="hidden md:flex items-center flex-1 max-w-2xl mx-4">
        <div className="flex items-center w-full">
          <div className="flex items-center flex-1 border border-gray-300 dark:border-gray-700 rounded-l-full overflow-hidden focus-within:border-red-500 dark:focus-within:border-red-500 transition-colors">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-sm"
            />
          </div>
          <button className="px-4 sm:px-6 py-2 bg-gray-100 dark:bg-gray-800 border border-l-0 border-gray-300 dark:border-gray-700 rounded-r-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        <button className="ml-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <Mic className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Mobile Search Toggle */}
        <button
          className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <Search className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>

        <button
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors hidden sm:block"
          onClick={() => navigate("/upload")}
        >
          <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
        </button>

        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative">
          <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
        </button>

        {/* Avatar with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            {user?.username?.charAt(0) || "A"}
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              {/* User Info Header */}
              <div className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500">
                <p className="text-white font-semibold text-sm">{user?.username || "Username"}</p>
                <p className="text-white/80 text-xs">{user?.email || "Email"}</p>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-3"
                >
                  <User className="w-4 h-4" />
                  <span>Your Profile</span>
                </button>

                <button
                  onClick={() => {
                    navigate("/settings");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-3"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>

                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-3"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 p-4 shadow-lg">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <div className="flex items-center flex-1">
              <input
                type="text"
                placeholder="Search"
                autoFocus
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-l-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-red-500 dark:focus:border-red-500 text-sm"
              />
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-l-0 border-gray-300 dark:border-gray-700 rounded-r-full">
                <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <Mic className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};