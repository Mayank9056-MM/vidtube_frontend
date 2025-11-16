import { useEffect } from "react";
import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import "../../index.css"

export default function Loader() {
  const theme = useSelector((state: RootState) => state.user.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-red-50 dark:from-black dark:via-gray-950 dark:to-red-950/20 transition-colors duration-500">
        <div className="flex flex-col items-center space-y-8">
          {/* Animated Logo */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 rounded-3xl blur-2xl opacity-40 animate-pulse"></div>
            
            {/* Logo Container */}
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="120"
                height="120"
                viewBox="0 0 512 512"
                role="img"
                className="drop-shadow-2xl animate-logo-spin"
              >
                <defs>
                  <linearGradient id="loader-grad" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#ff3b30" />
                    <stop offset="1" stopColor="#c0122a" />
                  </linearGradient>
                  <filter
                    id="loader-shadow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feDropShadow
                      dx="0"
                      dy="6"
                      stdDeviation="12"
                      floodColor="#000"
                      floodOpacity="0.15"
                    />
                  </filter>
                </defs>
                <rect
                  x="24"
                  y="24"
                  width="464"
                  height="464"
                  rx="88"
                  fill="url(#loader-grad)"
                  filter="url(#loader-shadow)"
                />
                <g transform="translate(140,124) scale(0.9)">
                  <path
                    d="M86 36.5C92.1 40 96 46.9 96 54.7V213.3C96 221.1 92.1 228 86 231.5C78.9 235 69.7 232.6 63.9 226.8L13.8 176.7C8.0 170.9 8.0 160.1 13.8 154.3L63.9 104.2C69.7 98.4 78.9 96 86 99.5Z"
                    fill="#ffffff"
                    className="animate-play-pulse"
                  />
                </g>
                <g transform="translate(300,120) scale(0.82)">
                  <path
                    d="M58.9 11.7c-2.1 0.9-4.3 1.5-6.6 1.8 2.4-1.4 4.3-3.6 5.2-6.3-2.3 1.4-4.9 2.4-7.6 3-2.2-2.3-5.3-3.7-8.8-3.7-6.7 0-12.1 5.4-12.1 12.1 0 0.95 0.11 1.88 0.31 2.77-10.05-0.5-18.96-5.32-24.94-12.62-1.04 1.79-1.63 3.86-1.63 6.08 0 4.19 2.13 7.9 5.36 10.07-1.98-0.062-3.84-0.61-5.46-1.51v0.15c0 5.85 4.17 10.74 9.71 11.85-1.02 0.28-2.09 0.43-3.2 0.43-0.78 0-1.54-0.075-2.28-0.21 1.55 4.79 6.05 8.28 11.39 8.38-4.18 3.27-9.46 5.22-15.19 5.22-0.99 0-1.97-0.058-2.93-0.17 5.42 3.47 11.86 5.49 18.77 5.49 22.52 0 34.86-18.66 34.86-34.86 0-0.53-0.012-1.06-0.036-1.58 2.4-1.72 4.48-3.86 6.13-6.31-2.19 0.97-4.55 1.62-7.02 1.91z"
                    fill="#fff"
                    className="animate-bird-pulse"
                  />
                </g>
                <ellipse
                  cx="148"
                  cy="90"
                  rx="56"
                  ry="20"
                  fill="#ffffff"
                  opacity="0.06"
                />
              </svg>
            </div>
          </div>

          {/* Loading Spinner Ring */}
          <div className="relative w-20 h-20">
            {/* Background ring */}
            <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-800 rounded-full"></div>
            {/* Animated ring */}
            <div className="absolute inset-0 border-4 border-transparent border-t-red-600 border-r-red-500 dark:border-t-red-500 dark:border-r-red-400 rounded-full animate-spin-fast"></div>
            {/* Inner glow */}
            <div className="absolute inset-2 bg-gradient-to-br from-red-500/10 to-red-700/10 dark:from-red-500/20 dark:to-red-700/20 rounded-full animate-pulse"></div>
          </div>

          {/* Loading Text */}
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-red-700 dark:from-red-500 dark:via-red-400 dark:to-red-600 bg-clip-text text-transparent animate-gradient">
              VidTube
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
              Preparing your experience...
            </p>
          </div>

          {/* Animated Dots */}
          <div className="flex space-x-3">
            <div 
              className="w-3 h-3 bg-gradient-to-r from-red-600 to-red-700 dark:from-red-500 dark:to-red-600 rounded-full animate-bounce shadow-lg shadow-red-500/50" 
              style={{ animationDelay: "0ms" }}
            ></div>
            <div 
              className="w-3 h-3 bg-gradient-to-r from-red-600 to-red-700 dark:from-red-500 dark:to-red-600 rounded-full animate-bounce shadow-lg shadow-red-500/50" 
              style={{ animationDelay: "150ms" }}
            ></div>
            <div 
              className="w-3 h-3 bg-gradient-to-r from-red-600 to-red-700 dark:from-red-500 dark:to-red-600 rounded-full animate-bounce shadow-lg shadow-red-500/50" 
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>

          {/* Progress Bar */}
          <div className="w-64 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-600 to-red-700 dark:from-red-500 dark:to-red-600 rounded-full animate-progress shadow-lg shadow-red-500/50"></div>
          </div>
        </div>
      </div>
    </div>
  );
}