import { Navigate } from "react-router-dom";
import Loader from "@/components/common/Loader";
import { useAuth } from "@/hooks/useAuth";
import type { JSX } from "react";
import { logger } from "@/utls/logger";

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading, initialized } = useAuth();

  logger.info("public route loading and initialized", loading, initialized,isAuthenticated);

  if (!initialized) return <Loader />;

  if (loading) return <Loader />;

  return isAuthenticated ? <Navigate to="/" replace /> : children;
};
