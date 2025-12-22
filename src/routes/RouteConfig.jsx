import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import UploadPage from "@/pages/Upload";
import VideoPage from "@/pages/video/VideoPage";
import TweetPage from "@/pages/tweet/TweetPage";
import SubscriptionPage from "@/pages/subscription/SubscriptionsPage";
import ChannelPage from "@/pages/subscription/ChannelPage";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import UserVideos from "@/pages/video/UserVideos";
import UserChannel from "@/pages/user/UserChannel";
import UserWatchHistory from "@/pages/user/UserWatchHistory";

export const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
];

export const privateRoutes = [
  {
    path: "/",
    element: <Home />, // Home page or landing page
  },
  {
    path: "/upload",
    element: <UploadPage />,
  },
  {
    path: "/watch/:videoId",
    element: <VideoPage />,
  },
  {
    path: "/tweets",
    element: <TweetPage />,
  },
  {
    path: "/subscriptions",
    element: <SubscriptionPage />,
  },
  {
    path: "/channel/:username",
    element: <ChannelPage />,
  },
  {
    path: "/my-videos",
    element: <UserVideos />,
  },
  {
    path: "/my-channel",
    element: <UserChannel />,
  },
  {
    path: "/watch-history",
    element: <UserWatchHistory />,
  },
];
