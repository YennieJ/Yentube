import { createContext, useContext } from "react";

import Youtube from "../api/youtube";
// import FakeYoutube from "../api/fakeYoutubeClient";
import YoutubeClient from "../api/youtubeClient";

//apiProvider가 만들어진 이유는 mockData가 있기 때문에!!!!!!!
const YoutubeApiContext = createContext();

const client = new YoutubeClient();
// const fake = new FakeYoutube();

const youtube = new Youtube(client);

export function YoutubeApiProvider({ children }) {
  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

// 사용하는 component
// Components > VideoItem > Components > ChannelInfo
// Pages > VideoDetail > Components > RelatedVideoList
// Pages > VideoList
export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
