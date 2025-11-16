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

/**
 * PrivateRoute is a higher-order component that wraps a route
 * and checks if the user is authenticated before rendering the route.
 * If the user is not authenticated, it redirects to the login page.
 * If the user is authenticated, it renders the route.
 * @param {{ children: JSX.Element }} props
 * @returns {JSX.Element} The rendered component
 */
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, initialized, loading } = useAuth();

  // logger.info(isAuthenticated, "isAuthenticated");
  // logger.info(initialized, "initialized");

  if (!initialized || loading) {
    return <Loader />;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

/**
 * PublicRoute is a higher-order component that wraps a route
 * and checks if the user is authenticated before rendering the route.
 * If the user is authenticated, it redirects to the home page.
 * If the user is not authenticated, it renders the route.
 * @param {{ children: JSX.Element }} props
 * @returns {JSX.Element} The rendered component
 */
const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, initialized, loading } = useAuth();

  if (!initialized || loading) {
    return <Loader />;
  }

  // If logged in → don't allow login/register → redirect to home
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

/**
 * AppRoutes component renders the routes for the application.
 * It contains public routes that are restricted for logged-in users
 * and protected routes that are only accessible for logged-in users.
 * The routes are wrapped with either PublicRoute or PrivateRoute components
 * to handle the authentication logic.
 */
export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes but restricted for logged-in users */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

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
