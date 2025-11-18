import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "./app/store";
import { AppRoutes } from "./routes/AppRoutes";
import { logger } from "./utls/logger";
import { useAppDispatch } from "./app/hooks";
import { fetchCurrentUser } from "./features/user/userThunks";
import Loader from "./components/common/Loader";

const App = () => {
  const theme = useSelector((state: RootState) => state.user.theme);
  const initialized = useSelector((state: RootState) => state.user.initialized);
  const dispatch = useAppDispatch();

  // Fetch current user once on app start
  useEffect(() => {
    const init = async () => {
      if (initialized) return;
      try {
        logger.info("call fetch current user", initialized);

        // SET initialized FIRST
        dispatch({ type: "user/markInitialized" });

        await dispatch(fetchCurrentUser());
        logger.info("call fetch 2 current user", initialized);
      } catch (error) {
        logger.info("No active session found", error);
        // no active session
      }
    };
    init();
  }, [initialized, dispatch]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  if (!initialized) return <Loader />;

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* rest of your routes/components */}
      <AppRoutes />
    </div>
  );
};

export default App;
