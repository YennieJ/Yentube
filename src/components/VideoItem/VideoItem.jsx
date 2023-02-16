import React from "react";
import { useNavigate } from "react-router-dom";
import { formatAgo } from "../../util/date";
import styles from "./VideoItem.module.css";

const VideoItem = ({ video }) => {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  const navigate = useNavigate();

  return (
    <li
      className={styles.video}
      onClick={() =>
        navigate(`/videos/watch/${video.id}`, { state: { video } })
      }
    >
      <img
        className={styles.thumbnail}
        src={thumbnails.medium.url}
        alt={title}
      />
      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
        <p className={styles.channel}>{channelTitle}</p>
        <p className={styles.date}>{formatAgo(publishedAt, "ko")}</p>
      </div>
    </li>
  );
};

export default VideoItem;
