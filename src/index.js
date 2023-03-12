import React from "react";
import { HelmetProvider } from "react-helmet-async";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import NotFound from "./pages/NotFound";
import VideoList from "./pages/VideoList/VidoeList";
import VideoDetail from "./pages/VideoDetail/VideoDetail";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <VideoList /> },
      { path: "search/:keyword", element: <VideoList /> },
      { path: "watch/:videoId", element: <VideoDetail /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);
