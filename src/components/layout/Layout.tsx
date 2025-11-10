import { Outlet } from "react-router-dom";
export const Layout = () => {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Page content rendered by React Router */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
