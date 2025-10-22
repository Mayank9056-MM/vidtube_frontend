import { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchCurrentUser, refreshAccessToken, LogoutUser } from "@/features/user/userThunks";
import { useNavigate } from "react-router-dom";
import { logger } from "@/utls/logger";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, loading, tokenRefreshing } = useAppSelector((state) => state.user);
  logger.info("user from useAuth",user)
  const [initialized, setInitialized] = useState(false);

  // Fetch the current user from cookie-based session
  useEffect(() => {
    const init = async () => {
      try {
        await dispatch(fetchCurrentUser()).unwrap();
      } catch (err) {
        logger.warn("No active session found:", err);
      } finally {
        setInitialized(true);
      }
    };

    if (!user) init();
    else setInitialized(true);
  }, [dispatch, user]);

  // Periodic token refresh (every 10 min)
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(refreshAccessToken());
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const logout = useCallback(async () => {
    try {
      await dispatch(LogoutUser()).unwrap();
      navigate("/login", { replace: true });
    } catch (err) {
      logger.error("Logout failed:", err);
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
