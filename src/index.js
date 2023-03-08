import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";

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
      { path: "videos", element: <VideoList /> },
      { path: "videos/:keyword", element: <VideoList /> },
      { path: "videos/watch/:videoId", element: <VideoDetail /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider
      clientId={`${process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}`}
    >
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
