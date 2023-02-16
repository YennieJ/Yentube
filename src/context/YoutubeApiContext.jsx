import { useContext } from "react";
import { createContext } from "react";
import Youtube from "../api/youtube";
import FakeYoutube from "../api/fakeYoutubeClient";
import YoutubeClinet from "../api/youtubeClient";

export const YoutubeApiContext = createContext();

// const youtube = new FakeYoutube();
const client = new YoutubeClinet();
const fake = new FakeYoutube();

const youtube = new Youtube(fake);

export function YoutubeApiProvider({ children }) {
  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
