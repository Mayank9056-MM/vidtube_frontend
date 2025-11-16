import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "./app/store";
import { useAppDispatch } from "./app/hooks";
import { toggleTheme } from "./features/user/userSlice";
import { AppRoutes } from "./routes/AppRoutes";
import { Button } from "./components/ui/button";
import { Moon, Sun } from "lucide-react";

/**
 * The main App component.
 *
 * This component is responsible for rendering the entire app,
 * including the theme toggle button and the routes.
 *
 * It uses the `useAppDispatch` and `useAppSelector` hooks from
 * `react-redux` to get the current theme and dispatch the
 * `toggleTheme` action.
 *
 * It also uses the `useEffect` hook from `react` to toggle the "dark"
 * class on the document element when the theme changes.
 */
const App = () => {
  // const currUser = useState(null);
  const dispatch = useAppDispatch();
  const theme = useSelector((state: RootState) => state.user.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* <Button
        variant="outline"
        size="icon"
        className="absolute top-4 right-4 rounded-full"
        onClick={() => dispatch(toggleTheme())}
      >
        {theme === "light" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button> */}
      {/* rest of your routes/components */}
      <AppRoutes />
    </div>
  );
};

export default App;
