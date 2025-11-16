import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

export const Layout = () => {
  const theme = useSelector((state: RootState) => state.user.theme);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="flex h-screen w-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Navbar */}
          <Navbar />

          {/* Page content */}
          <main className="flex-1 overflow-y-auto bg-white dark:bg-black">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};