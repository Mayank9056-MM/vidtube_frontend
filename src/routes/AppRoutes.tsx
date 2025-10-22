// src/AppRoutes.tsx
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

// Import your pages
import Home from "@/pages/Home";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import { Layout } from "@/components/layout/Layout";
// import Watch from "@/pages/Watch";
import Upload from "@/pages/Upload";
import type { JSX } from "react";
import { logger } from "@/utls/logger";
// import Dashboard from "@/pages/Dashboard";

/**
 * Protected route wrapper
 */
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, initialized } = useAuth();

  logger.info("isAuthenticated",isAuthenticated)
  logger.info("initialized",initialized)

  if (!initialized) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium">
        Loading session...
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/watch/:id" element={<Watch />} /> */}

          <Route element={<Layout />}>
          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
            } />

           <Route
            path="/upload"
            element={
              <PrivateRoute>
                <Upload />
              </PrivateRoute>
            }
          />
{/* 
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />  */}
        </Route>


      {/* 404 Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
