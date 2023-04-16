import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useYoutubeApi } from "Context/YoutubeApiContext";
import { useRecoilValue } from "recoil";
import { searchModalState } from "atoms";
import useIntersectionObserver from "Hooks/useIntersectionObserver";

import Loading from "Components/Loading/Loading";
import ErrorPage from "Components/ErrorPage/ErrorPage";
import VideoItem from "Components/VideoItem/VideoItem";

import styles from "./VidoeList.module.css";

const VideoList = () => {
  const [prevData, setPrevData] = useState();
  const [nextPageToken, setNextPageToken] = useState("");
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("search_query");

  //api 호출
  const { youtube } = useYoutubeApi();

  //스크롤위치를 기억하지않아도 되는게 좋은점
  const {
    data: videos,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
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
          setPrevData(data.pageInfo),
          keyword
            ? data.items.map((item) => ({ ...item, id: item.id.videoId }))
            : data.items
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

  const loadMoreRef = useRef();

  useIntersectionObserver({
    root: null,
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  //한번만 체크
  const searchModal = useRecoilValue(searchModalState);

  return (
    <>
      <Helmet>
        <title>{`${keyword === null ? "" : `${keyword} - `}YenTube`}</title>
      </Helmet>
      {isLoading && <Loading />}
      {error && <ErrorPage />}

      {videos && (
        <ul className={styles.videos}>
          {videos.pages.map((page) =>
            page.map((video) => (
              <VideoItem
                key={video.id}
                video={video}
                type="list"
                searchModal={searchModal}
              />
            ))
          )}
        </ul>
      )}
      {isFetching && (
        <div className={styles.loaderBox}>
          <span className={styles.loader}></span>
        </div>
      )}
      <div ref={loadMoreRef} />
    </>
  );
};

export default VideoList;
