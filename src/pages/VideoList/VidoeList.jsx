import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import VideoItem from "../../components/VideoItem/VideoItem";
import { useYoutubeApi } from "../../context/YoutubeApiContext";

import styles from "./VidoeList.module.css";
import ListLoading from "../../components/ListLoading/ListLoading";
import { useRef } from "react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

const VideoList = () => {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();

  const [originData, setOriginData] = useState();

  const [nextPageToken, setNextPageToken] = useState("");
  const {
    data: videos,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["videos", keyword],
    () =>
      youtube.search(nextPageToken, keyword).then((data) => {
        return (
          setNextPageToken(data.nextPageToken),
          setOriginData(data.pageInfo),
          data.items
        );
      }),
    {
      staleTime: 1000 * 60 * 1,

      getNextPageParam: (page, pages) => {
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
      {isLoading && <ListLoading />}
      {error && <p>ERROR</p>}

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
