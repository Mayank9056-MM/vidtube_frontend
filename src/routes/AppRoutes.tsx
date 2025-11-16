// src/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

import Home from "@/pages/Home";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Upload from "@/pages/Upload";
import { Layout } from "@/components/layout/Layout";
import type { JSX } from "react";
import Loader from "@/components/common/Loader";
import { logger } from "@/utls/logger";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, initialized, loading } = useAuth();

  // logger.info(isAuthenticated, "isAuthenticated");
  // logger.info(initialized, "initialized");

  if (!initialized || loading) {
    return <Loader />;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout>
              <Home />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/upload"
        element={
          <PrivateRoute>
            <Layout>
              <Upload />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* 404 fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
