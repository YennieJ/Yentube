import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import VideoItem from "../../components/VideoItem/VideoItem";
import { useYoutubeApi } from "../../context/YoutubeApiContext";

import styles from "./VidoeList.module.css";
import ListLoading from "../../components/ListLoading/ListLoading";

const VideoList = () => {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(["videos", keyword], () => youtube.search(keyword), {
    staleTime: 1000 * 60 * 1,
  });

  return (
    <>
      {isLoading && <ListLoading />}
      {error && <p>ERROR</p>}
      {videos && (
        <ul className={styles.videos}>
          {videos.map((video) => (
            <VideoItem key={video.id} video={video} type="list" />
          ))}
        </ul>
      )}
    </>
  );
};

export default VideoList;
