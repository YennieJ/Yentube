import React from "react";
import { useNavigate } from "react-router-dom";

import Channelinfo from "./components/ChannelInfo/ChannelInfo";

import styles from "./VideoItem.module.css";

const VideoItem = ({ video, type, youtube }) => {
  const navigate = useNavigate();

  const { title, thumbnails } = video.snippet;

  //for css
  //VideoList에서 가져옴.
  const isList = type === "list";
  //Related에서 가져옴 ChannelInfo에 전달해야하는
  const isRelated = type === "related";

  const handleNavigate = () => {
    navigate(`/watch/${video.id}`, { state: { video } });
    window.scrollTo({ top: 0 });
  };

  return (
    <li
      className={`${isList ? styles.listVideo : styles.relatedVideo}`}
      onClick={handleNavigate}
    >
      <img
        className={`${isList ? styles.listThumbnail : styles.relatedThumbnail}`}
        src={thumbnails.medium.url}
        alt={title}
      />

      <Channelinfo
        video={video.snippet}
        isRelated={isRelated}
        youtube={youtube}
      />
    </li>
  );
};

export default VideoItem;
