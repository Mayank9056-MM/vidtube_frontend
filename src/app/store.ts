import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";
import videoReducer from "@/features/video/videoSlice";
import uiReducer from "@/features/ui/uiSlice";
import subscriptionReducer from "@/features/subscription/susbcriptionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    video: videoReducer,
    ui: uiReducer,
    subscription: subscriptionReducer,
  },
  devTools: import.meta.env.MODE !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
