import React from "react";
import { useQuery } from "@tanstack/react-query";

import { useYoutubeApi } from "context/YoutubeApiContext";

import Loading from "components/Loading/Loading";
import ErrorPage from "components/ErrorPage/ErrorPage";
import VideoItem from "components/VideoItem/VideoItem";

import styles from "./RelatedVideos.module.css";

const RelatedVideos = ({ id }) => {
  const { youtube } = useYoutubeApi();
  const {
    data: videos,
    isLoading,
    error,
  } = useQuery(["related", id], () => youtube.relatedVideo(id), {
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      {isLoading && <Loading type="relatedLoading" />}
      {error && <ErrorPage />}
      {videos && (
        <div className={styles.related}>
          <div className={styles.titleBox}>
            <h3 className={styles.title}>추천 영상</h3>
          </div>
          <ul className={styles.videos}>
            {videos.map((video) => (
              <VideoItem
                key={video.id}
                video={video}
                type="related"
                youtube={youtube}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default RelatedVideos;
