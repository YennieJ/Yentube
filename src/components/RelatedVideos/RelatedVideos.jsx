import React from "react";
import { useYoutubeApi } from "../../context/YoutubeApiContext";
import { useQuery } from "@tanstack/react-query";

import styles from "./RelatedVideos.module.css";
import VideoItem from "../VideoItem/VideoItem";
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
      {isLoading && <p>Loding...</p>}
      {error && <p>ERROR</p>}
      {videos && (
        <div className={styles.related}>
          <h3 className={styles.title}>추천 영상</h3>
          <ul className={styles.videos}>
            {videos.map((video) => (
              <VideoItem key={video.id} video={video} type="related" />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default RelatedVideos;