import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import NotFound from "./pages/NotFound";
import Videos from "./pages/Videos";

import Youtube from "./service/youtube";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VideoDetail from "./components/video_detail/video_detail";

const youtube = new Youtube(process.env.REACT_APP_YOUTUBE_API_KEY);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Videos /> },
      { path: "videos", element: <Videos /> },
      { path: "videos/:keyword", element: <Videos /> },
      { path: "videos/watch/:videoId", element: <VideoDetail /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App youtube={youtube} /> */}
  </React.StrictMode>
);
