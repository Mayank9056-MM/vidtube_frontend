import { useEffect } from "react";
import { LogIn } from "lucide-react";
import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export default function Loader() {
    const theme = useSelector((state: RootState) => state.user.theme);

   useEffect(() => {
     document.documentElement.classList.toggle("dark", theme === "dark");
   }, [theme]);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo with pulse animation */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
            <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <LogIn className="w-10 h-10 text-white animate-pulse" />
            </div>
          </div>

          {/* Loading spinner */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-600 rounded-full animate-spin"></div>
          </div>

          {/* Loading text */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Loading
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Please wait while we prepare your experience...
            </p>
          </div>

          {/* Animated dots */}
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}