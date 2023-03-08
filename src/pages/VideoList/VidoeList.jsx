import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useYoutubeApi } from "context/YoutubeApiContext";

import Loading from "components/Loading/Loading";
import ErrorPage from "components/ErrorPage/ErrorPage";
import VideoItem from "components/VideoItem/VideoItem";
import useIntersectionObserver from "hooks/useIntersectionObserver";

import styles from "./VidoeList.module.css";

const VideoList = () => {
  const { keyword } = useParams();

  const [originData, setOriginData] = useState();
  const [nextPageToken, setNextPageToken] = useState("");

  //api 호출
  const { youtube } = useYoutubeApi();

  //스크롤위치를 기억하지않아도 되는게 좋은점
  const {
    data: videos,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    //무한스크롤을 구동하기위한 useInfiniteQuery
  } = useInfiniteQuery(
    ["videos", keyword],
    () =>
      //youtube api 내에 있는 nextPageToken을 가져와서 저장함.
      youtube.search(nextPageToken, keyword).then((data) => {
        return (
          //매번바뀌는 setNextPageToken을 저장하기위해
          setNextPageToken(data.nextPageToken),
          //infinityQuery를 위한 page정보
          setOriginData(data.pageInfo),
          //data
          data.items
        );
      }),
    {
      staleTime: 1000 * 60 * 1,
      //reactQuery 함수
      getNextPageParam: (page, pages) => {
        //전체 페이지 갯수
        const totalPages =
          originData && originData.totalResults / originData.resultsPerPage;

        const nextPage = page.page + 1;
        return totalPages > pages.length ? nextPage : undefined;
      },
    }
  );

  const loadMoreRef = useRef();

  useIntersectionObserver({
    root: null,
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return (
    <>
      {isLoading && <Loading />}
      {error && <ErrorPage />}

      {videos && (
        <ul className={styles.videos}>
          {videos.pages.map((page) =>
            page.map((video) => (
              <VideoItem
                key={keyword ? video.id.videoId : video.id}
                video={video}
                type="list"
              />
            ))
          )}
        </ul>
      )}

      <div ref={loadMoreRef} />
    </>
  );
};

export default VideoList;
