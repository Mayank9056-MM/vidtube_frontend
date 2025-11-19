import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import UploadPage from "@/pages/Upload";
import VideoPage from "@/pages/video/VideoPage"

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
  }
];
