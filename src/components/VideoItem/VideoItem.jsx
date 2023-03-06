import React from "react";
import { useNavigate } from "react-router-dom";

import Channelinfo from "./components/ChannelInfo/ChannelInfo";

import styles from "./VideoItem.module.css";

const VideoItem = ({ video, type }) => {
  const navigate = useNavigate();

  const { title, thumbnails, channelTitle, publishedAt, channelId } =
    video.snippet;

  //for css
  //VideoList에서 가져옴.
  const isList = type === "list";
  //Related에서 가져옴 ChannelInfo에 전달해야하는
  const isRelated = type === "related";

  return (
    <li
      className={`${isList ? styles.listVideo : styles.relatedVideo}`}
      onClick={() =>
        navigate(`/videos/watch/${video.id}`, { state: { video } })
      }
    >
      <img
        className={`${isList ? styles.listThumbnail : styles.relatedThumbnail}`}
        src={thumbnails.medium.url}
        alt={title}
      />
      <Channelinfo
        id={channelId}
        title={title}
        name={channelTitle}
        time={publishedAt}
        isRelated={isRelated}
      />{" "}
    </li>
  );
};

export default VideoItem;
