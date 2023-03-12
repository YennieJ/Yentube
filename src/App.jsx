import React from "react";
import { Outlet, useMatch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { YoutubeApiProvider } from "./context/YoutubeApiContext";

import Header from "./components/Header/Header";
import MFooter from "components/MFooter/MFooter";

import styles from "App.module.css";

function App() {
  const queryClient = new QueryClient();
  const home = useMatch("/");

  return (
    <>
      <GoogleOAuthProvider
        clientId={`${process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}`}
      >
        <Header />
      </GoogleOAuthProvider>

      <YoutubeApiProvider>
        <QueryClientProvider client={queryClient}>
          <div className={`${home ? styles.homeContent : styles.content}`}>
            <Outlet />
          </div>
        </QueryClientProvider>
      </YoutubeApiProvider>

      <MFooter />
    </>
  );
}

export default App;
