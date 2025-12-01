import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import UploadPage from "@/pages/Upload";
import VideoPage from "@/pages/video/VideoPage";
import TweetPage from "@/pages/tweet/TweetPage";
import SubscriptionPage from "@/pages/subscription/SubscriptionsPage";

export const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
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
    element: <SubscriptionPage />
  }
];
