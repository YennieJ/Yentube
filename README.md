# Yentube

> 개선 점 : google-login-scope을 사용해서 유저 정보 가져오기

https://user-images.githubusercontent.com/108519185/232328497-3961aa85-a1d2-431c-8449-9e1f580ef114.mp4

https://user-images.githubusercontent.com/108519185/232318444-bf6e9c19-26fb-4de2-b60f-0d02d6bc0700.mp4

---

![react](https://img.shields.io/badge/-React-000000?logo=react&logoColor=61DAFB&style=for-the-badge)
![cssmodules](https://img.shields.io/badge/-cssmodules-000000?logo=cssmodules&logoColor=white&style=for-the-badge)
![jsvascript](https://img.shields.io/badge/-javascript-000000?logo=javascript&logoColor=F7DF1E&style=for-the-badge)

![axios](https://img.shields.io/badge/-axios-000000?logo=axios&logoColor=white&style=for-the-badge)
![reactquery](https://img.shields.io/badge/-reactquery-000000?logo=reactquery&logoColor=FF4154&style=for-the-badge)
![reacthookform](https://img.shields.io/badge/-reacthookform-000000?logo=reacthookform&logoColor=EC5990&style=for-the-badge)
![recoil](https://img.shields.io/badge/recoil-000000?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FscXVlXzEiIGRhdGEtbmFtZT0iQ2FscXVlIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI1NS4yMSA2MjMuOTEiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojMDA3YWY0fTwvc3R5bGU+PC9kZWZzPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0ibTc0LjYyIDI3Ny40NiAxLjI0LS4xMyAzNC43OC0zLjI4LTUzLjQ3LTU4LjY2QTk2LjQ3IDk2LjQ3IDAgMCAxIDMyIDE1MC4zSDNhMTI1LjMgMTI1LjMgMCAwIDAgMzIuOCA4NC41N1pNMTc3LjEzIDM0N2wtMzYgMy40IDUzLjMyIDU4LjUxQTk2LjQxIDk2LjQxIDAgMCAxIDIxOS42MyA0NzRoMjguOTJhMTI1LjI4IDEyNS4yOCAwIDAgMC0zMi43Ni04NC41N1oiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0yNTMuNjkgMjMxLjY4Yy02LjMzLTMxLjMtMzAuODktNTQuMDktNjIuNTctNTguMDdsLTYuMzUtLjc5YTQ5LjYxIDQ5LjYxIDAgMCAxLTQzLjM1LTQ5LjEzdi0yMGE1Mi43NSA1Mi43NSAwIDEgMC0yOC45MS0uMzZ2MjAuMzhhNzguNTYgNzguNTYgMCAwIDAgNjguNjUgNzcuODJsNi4zNi44YzIzLjI0IDIuOTIgMzQuNzggMjAgMzcuODMgMzUuMXMtLjkzIDM1LjMyLTIxLjIyIDQ3YTczLjgxIDczLjgxIDAgMCAxLTMwLjA2IDkuNjJsLTk1LjY2IDlhMTAyLjQ1IDEwMi40NSAwIDAgMC00MS44IDEzLjM4QzkgMzMyLjQ1LTQuODEgMzYzIDEuNTIgMzk0LjI5czMwLjg5IDU0LjA4IDYyLjU3IDU4LjA2bDYuMzUuOGE0OS42IDQ5LjYgMCAwIDEgNDMuMzUgNDkuMTJ2MThhNTIuNzUgNTIuNzUgMCAxIDAgMjguOTEuMjZ2LTE4LjI2YTc4LjU1IDc4LjU1IDAgMCAwLTY4LjY1LTc3LjgxbC02LjM2LS44Yy0yMy4yNC0yLjkyLTM0Ljc4LTIwLjA1LTM3LjgzLTM1LjExcy45My0zNS4zMiAyMS4yMi00N2E3My42OCA3My42OCAwIDAgMSAzMC4wNi05LjYzbDk1LjY2LTlhMTAyLjQ1IDEwMi40NSAwIDAgMCA0MS44LTEzLjM4YzI3LjY1LTE2LjAyIDQxLjQtNDYuNTQgMzUuMDktNzcuODZaIi8+PC9zdmc+)
![netlify](https://img.shields.io/badge/-netlify-000000?logo=netlify&logoColor=00C7B7&style=for-the-badge)

![googleads](https://img.shields.io/badge/-googleads-ffffff?logo=googleads&logoColor=4285F4&style=for-the-badge)
![responsiveUI](https://img.shields.io/badge/-반응형-ffffff?&style=for-the-badge)
![infinitescroll](https://img.shields.io/badge/-무한스크롤-ffffff?logo=reactquery&logoColor=FF4154&style=for-the-badge)

---

## Google APIs + Axios + useContext

> Recoil vs Context : Context는 데이터가 변경 되면 감싸고있는 컴포넌트가 다시 렌더링 되지만 Recoil은 데이터만 렌더링한다.

 <br/>

1. src > api > YoutubeClient

```js
import axios from "axios";

// fetch를 사용하면 정보를 받아 올 때마다 JSON으로 변환해야 한다는 점과 catch로 error를 핸들링할 수 있지만
// 백엔드에서 정보를 받아오는 것 모두 성공했다고 처리하므로 (200대든 400대든) then에서 걸러줘야 하는데(throw를 통해)
// 이것을 해결할 수 있게 하는 것이 axios

export default class YoutubeClinet {
  // axios 생성
  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3/",
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }

  // google apis에서 search,videos,channels를 불러온다.
  // params는 src > api > Youtube에서 전달 받는다.
  async search(params) {
    return this.httpClient.get("search", params);
  }

  async videos(params) {
    return this.httpClient.get("videos", params);
  }

  async channels(params) {
    return this.httpClient.get("channels", params);
  }
}
```

2. src > api > Youtube

```js
// google apis params 형식에 따름.

export default class Youtube {
  // apiClinet === YoutubeClient
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  // #은 프라이빗 함수로 이 class 내부에선 호출이 가능하나 외부에선 불가능
  async search(pageToken, keyword) {
    return keyword
      ? this.#searchByKeyword(pageToken, keyword)
      : this.#mostPopular(pageToken);
  }

  //채널 사진
  async channelImageURL(id) {
    return this.apiClient
      .channels({ params: { part: "snippet", id } })
      .then((res) => res.data.items[0].snippet.thumbnails.default.url);
  }

  //검색 내용과 관련된 비디오
  async relatedVideo(id) {
    return this.apiClient
      .search({
        params: {
          part: "snippet",
          maxResults: 24,
          type: "video",
          regionCode: "KR",

          relatedToVideoId: id,
        },
      })
      .then((res) =>
        res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
  }

  //search data
  async #searchByKeyword(pageToken, keyword) {
    return this.apiClient
      .search({
        params: {
          part: "snippet",
          maxResults: 24,
          type: "video",
          q: keyword,
          regionCode: "KR",

          pageToken: pageToken && pageToken,
        },
      })

      .then((res) => res.data);
  }

  //videoList data
  async #mostPopular(pageToken) {
    return this.apiClient
      .videos({
        params: {
          part: "snippet",
          maxResults: 24,
          chart: "mostPopular",
          regionCode: "KR",

          pageToken: pageToken && pageToken,
        },
      })
      .then((res) => res.data);
  }
}
```

3. src > context > youtubeApiContext

```js
import { createContext, useContext } from "react";

import Youtube from "../api/youtube";
import YoutubeClient from "../api/youtubeClient";

// context란? props 전달로 state를 변화시키지 않고 provider 안에 있는 모든 component에서 사용할 수 있게 해준다.
const YoutubeApiContext = createContext();

const client = new YoutubeClient();
const youtube = new Youtube(client);

// App
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
```

## 반응형

https://user-images.githubusercontent.com/108519185/232318292-07c55478-29cb-47d7-915b-99b70296cc3a.mov

## 무한 스크롤(useInfiniteQuery) + Custom Hooks

```js
import React, { useState, useRef } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import VideoItem from "Components/VideoItem/VideoItem";

const VideoList = () => {
  const [prevData, setPrevData] = useState();
  const [nextPageToken, setNextPageToken] = useState("");

  //api 호출
  const { youtube } = useYoutubeApi();

  //무한스크롤을 구동하기위한 useInfiniteQuery
  const {
    data: videos,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["videos"],
    () =>
      youtube.search(nextPageToken).then((data) => {
        return (
          //매번바뀌는 setNextPageToken을 저장하기위해
          setNextPageToken(data.nextPageToken),
          //infinityQuery를 위한 page정보
          setPrevData(data.pageInfo),
          data.items
          //data
        );
      }),
    {
      staleTime: 1000 * 60 * 1,
      //reactQuery 함수
      getNextPageParam: (page, pages) => {
        //전체 페이지 갯수
        const totalPages =
          prevData && prevData.totalResults / prevData.resultsPerPage;

        const nextPage = page.page + 1;
        return totalPages > pages.length ? nextPage : undefined;
      },
    }
  );

  // 스크롤 위치 확인
  const loadMoreRef = useRef();

  useIntersectionObserver({
    root: null,
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  // Hooks 파일 안에 Custom Hooks
  // 무한 스크롤
  function useIntersectionObserver({
    root,
    target,
    onIntersect,
    threshold = 1.0,
    rootMargin = "0px",
    enabled = true,
  }) {
    React.useEffect(() => {
      if (!enabled) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => entry.isIntersecting && onIntersect()),
        {
          root: root && root.current,
          rootMargin,
          threshold,
        }
      );

      const el = target && target.current;

      if (!el) {
        return;
      }

      observer.observe(el);

      return () => {
        observer.unobserve(el);
      };
    }, [target, enabled, root, threshold, rootMargin, onIntersect]);
  }

  return (
    <>
      {videos && (
        <ul className={styles.videos}>
          {videos.pages.map((page) =>
            page.map((video) => <VideoItem key={video.id} video={video} />)
          )}
        </ul>
      )}

      <div ref={loadMoreRef} />
    </>
  );
};

export default VideoList;
```
