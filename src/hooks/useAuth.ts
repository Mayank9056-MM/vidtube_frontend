// src/hooks/useAuth.ts
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { refreshAccessToken, LogoutUser } from "@/features/user/userThunks";
import { useNavigate } from "react-router-dom";
import { logger } from "@/utls/logger";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, loading, tokenRefreshing, initialized } = useAppSelector(
    (state) => state.user
  );

  logger.info(
    "user => ",
    user,
    "\nloading => ",
    loading,
    "\ntokenRefreshing => ",
    tokenRefreshing,
    "initialized => ",
    initialized
  );

  // Auto token refresh (only if user is logged in)
  useEffect(() => {
    if (!user) return; // prevent refreshing if logged out

    const interval = setInterval(() => {
      dispatch(refreshAccessToken());
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [user, dispatch]);

  const logout = useCallback(async () => {
    try {
      await dispatch(LogoutUser()).unwrap();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }, [dispatch, navigate]);

  return {
    user,
    isAuthenticated: !!user,
    initialized, 
    loading,
    tokenRefreshing,
    logout,
  };
};
