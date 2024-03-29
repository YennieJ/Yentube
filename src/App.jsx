import React from "react";
import { Outlet, useMatch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { RecoilRoot } from "recoil";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { YoutubeApiProvider } from "./Context/YoutubeApiContext";
import useLocalStorage from "react-use-localstorage";

import Header from "./Components/Header/Header";
import MFooter from "Components/MFooter/MFooter";

import styles from "App.module.css";

function App() {
  const queryClient = new QueryClient();
  const home = useMatch("/");

  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const swichTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <div data-theme={theme} className={styles.app}>
      <RecoilRoot>
        <GoogleOAuthProvider
          clientId={`${process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}`}
        >
          <Header swichTheme={swichTheme} theme={theme} />
          <YoutubeApiProvider>
            <QueryClientProvider client={queryClient}>
              <div className={`${home ? styles.homeContent : styles.content}`}>
                <Outlet />
              </div>
            </QueryClientProvider>
          </YoutubeApiProvider>

          <MFooter />
        </GoogleOAuthProvider>
      </RecoilRoot>
    </div>
  );
}

export default App;
