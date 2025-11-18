// src/features/user/userSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  fetchCurrentUser,
  updateAccount,
  updateAvatar,
  getWatchHistory,
  LogoutUser,
  refreshAccessToken,
} from "./userThunks";
import type { User } from "@/types/global";
import { logger } from "@/utls/logger";

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  theme: "light" | "dark";
  tokenRefreshing: boolean;
  successMessage?: string | null;
  initialized?: boolean;
}

const getInitialTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem("theme") as "light" | "dark" | null;
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  theme: getInitialTheme(),
  tokenRefreshing: false,
  successMessage: null,
  initialized: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.successMessage = null;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", state.theme);
      document.documentElement.classList.toggle("dark", state.theme === "dark");
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
      document.documentElement.classList.toggle(
        "dark",
        action.payload === "dark"
      );
    },
    clearError: (state) => {
      state.error = null;
    },
    markInitialized: (state) => {
      state.initialized = true;
    },
  },
  extraReducers: (builder) => {
    // --- REGISTER ---
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        logger.info("register user payload =>", action.payload.user);
        state.loading = false;
        state.user = action.payload.user;
        state.successMessage = "User registered successfully";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // --- LOGIN ---
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        logger.info("login user payload =>", action.payload.user);
        state.loading = false;
        state.user = action.payload.data.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // --- FETCH CURRENT USER ---
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        logger.info("fetchCurrent user payload =>", action.payload.user);

        state.user = action.payload.user;
        state.initialized = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.initialized = true;
        state.error =
          (action.payload as string) ||
          action.error?.message ||
          "Failed to fetch user";
      });

    // --- UPDATE ACCOUNT ---
    builder
      .addCase(updateAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload.user };
        state.successMessage = "Account updated successfully";
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // --- UPDATE AVATAR ---
    builder
      .addCase(updateAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, avatar: action.payload.avatar };
        state.successMessage = "Avatar updated successfully";
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // --- WATCH HISTORY ---
    builder.addCase(getWatchHistory.fulfilled, (state, action) => {
      state.user = {
        ...state.user,
        history: action.payload.history,
      };
    });

    // --- LOGOUT ---
    builder
      .addCase(LogoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(LogoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.successMessage = "Logged out successfully";
      })
      .addCase(LogoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // --- REFRESH ACCESS TOKEN ---
    builder
      .addCase(refreshAccessToken.pending, (state) => {
        state.tokenRefreshing = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.tokenRefreshing = false;
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.tokenRefreshing = false;
      });
  },
});

export const { logout, toggleTheme, setTheme, clearError, markInitialized } =
  userSlice.actions;
export default userSlice.reducer;
