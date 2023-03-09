import React from "react";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { YoutubeApiProvider } from "./context/YoutubeApiContext";

import Header from "./components/Header/Header";

import styles from "./App.module.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className={styles.app}>
      <GoogleOAuthProvider
        clientId={`${process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}`}
      >
        <Header />
      </GoogleOAuthProvider>

      <YoutubeApiProvider>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </YoutubeApiProvider>
    </div>
  );
}

export default App;
