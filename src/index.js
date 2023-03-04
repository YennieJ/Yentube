import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import NotFound from "./pages/NotFound";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VideoList from "./pages/VideoList/VidoeList";
import VideoDetail from "./pages/VideoDetail/VideoDetail";

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
