import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import VideoItem from "../../components/VideoItem/VideoItem";
import { useYoutubeApi } from "../../context/YoutubeApiContext";

import styles from "./VidoeList.module.css";
import ListLoading from "../../components/ListLoading/ListLoading";

const VideoList = () => {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();

  // const {
  //   isLoading,
  //   error,
  //   data: videos,
  // } = useQuery(["videos", keyword], () => youtube.search(keyword), {
  //   staleTime: 1000 * 60 * 1,
  // });

  const [token, setToken] = useState("");
  const {
    data: videos,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["videos", keyword],
    () =>
      youtube.search(token).then((res) => {
        // eslint-disable-next-line no-sequences
        return setToken(res.nextPageToken), res.items;
      }),
    {
      staleTime: 1000 * 60 * 1,

      getNextPageParam: (page) => {
        // lastPage와 pages는 콜백함수에서 리턴한 값을 의미한다!!
        // lastPage: 직전에 반환된 리턴값, pages: 여태 받아온 전체 페이지
        if (!page.last_page) return page.current_page + 1;
        // // 마지막 페이지면 undefined가 리턴되어서 hasNextPage는 false가 됨!
        return undefined;
      },
    }
  );

  return (
    <>
      {isLoading && <ListLoading />}
      {error && <p>ERROR</p>}
      <button onClick={() => fetchNextPage()}>!!!!!!!</button>
      {videos && (
        <>
          <ul className={styles.videos}>
            {videos.pages.map((page, i) => (
              <div style={{ border: "1px solid red" }} key={i}>
                {page.map((video) => (
                  <VideoItem key={video.id} video={video} type="list" />
                ))}
              </div>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default VideoList;
