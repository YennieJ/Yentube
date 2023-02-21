import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./app.module.css";
import SearchHeader from "../src/components/search_header/search_header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { YoutubeApiProvider } from "./context/YoutubeApiContext";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className={styles.app}>
      <SearchHeader />
      <YoutubeApiProvider>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </YoutubeApiProvider>
    </div>
  );
}

export default App;
