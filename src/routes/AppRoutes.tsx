// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { Layout } from "@/components/layout/Layout";
import { privateRoutes } from "@/routes/RouteConfig";
import { publicRoutes } from "@/routes/RouteConfig";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      {publicRoutes.map((r) => (
        <Route
          key={r.path}
          path={r.path}
          element={<PublicRoute>{r.element}</PublicRoute>}
        />
      ))}

      {/* PRIVATE */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        {privateRoutes.map((r) => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
