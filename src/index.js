import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import NotFound from "./pages/NotFound";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VideoList from "./pages/VideoList/VidoeList";
import VideoDetail from "./components/VideoDetail/VideoDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <VideoList /> },
      { path: "videos", element: <VideoList /> },
      { path: "videos/:keyword", element: <VideoList /> },
      { path: "videos/watch/:videoId", element: <VideoDetail /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
