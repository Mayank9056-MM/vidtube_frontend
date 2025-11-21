import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";
import videoReducer from "@/features/video/videoSlice";
import uiReducer from "@/features/ui/uiSlice";
import subscriptionReducer from "@/features/subscription/susbcriptionSlice";
import likeReducer from "@/features/like/likeSlice";
import commentReducer from "@/features/comment/commentSlice";
import tweetReducer from "@/features/tweet/tweetSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    video: videoReducer,
    ui: uiReducer,
    subscription: subscriptionReducer,
    like: likeReducer,
    comment: commentReducer,
    tweet: tweetReducer,
  },
  devTools: import.meta.env.MODE !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
