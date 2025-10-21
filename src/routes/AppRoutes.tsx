// src/AppRoutes.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

// Import your pages
import Home from "@/pages/Home";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
// import Watch from "@/pages/Watch";
// import Upload from "@/pages/Upload";
// import Dashboard from "@/pages/Dashboard";

/**
 * Protected route wrapper
 */
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, initialized } = useAuth();

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

      {/* Protected Routes */}
      {/* <Route
          path="/upload"
          element={
            // <PrivateRoute>
            //   <Upload />
            // </PrivateRoute>
          }
        /> */}
      {/* <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        /> */}

      {/* 404 Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
