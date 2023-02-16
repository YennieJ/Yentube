import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import VideoCard from "../../components/VideoItem/VideoItem";
import { useYoutubeApi } from "../../context/YoutubeApiContext";

import styles from "./VidoeList.module.css";

const VideoList = () => {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    isLoding,
    error,
    data: videos,
  } = useQuery(["videos", keyword], () => youtube.search(keyword));

  return (
    <>
      <div>Videos {keyword ? `${keyword}` : "HOT"}</div>
      {isLoding && <p>Loding...</p>}
      {error && <p>ERROR</p>}
      {videos && (
        <ul className={styles.videos}>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
    </>
  );
};

export default VideoList;
