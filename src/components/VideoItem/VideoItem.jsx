import React from "react";
import { formatAgo } from "../../util/date";
import styles from "./VideoItem.module.css";

const VideoCard = ({ video }) => {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;

  return (
    <li className={styles.video}>
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

export default VideoCard;
