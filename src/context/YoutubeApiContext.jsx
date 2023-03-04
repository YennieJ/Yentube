import { useContext } from "react";
import { createContext } from "react";
import Youtube from "../api/youtube";
import FakeYoutube from "../api/fakeYoutubeClient";
import YoutubeClinet from "../api/youtubeClient";

export const YoutubeApiContext = createContext();

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

//apiProvider가 만들어진 이유는 mockData가 있기 때문에!!!!!!!
//없을때도 만드는 것이 좋은걸까? 굳이 그럴 필요는 없지 않을까 왜? 내가 사용할 api는 하나니까 그냥 그 파일에서 불러오면 되잖아.
