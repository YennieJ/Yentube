import React from "react";
import { useNavigate } from "react-router-dom";
import { formatAgo } from "../../util/date";
import styles from "./VideoItem.module.css";

const VideoItem = ({ video, type }) => {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  const navigate = useNavigate();
  const isList = type === "list";

  console.log(video);
  return (
    <li
      className={`${isList ? styles.listVideo : styles.relatedVideo}`}
      onClick={() =>
        navigate(`/videos/watch/${video.id}`, { state: { video } })
      }
    >
      <img
        className={`${isList ? styles.listthumbnail : styles.relatedthumbnail}`}
        src={thumbnails.medium.url}
        alt={title}
      />
      <div>
        <p className={`${isList ? styles.listtitle : styles.relatedtitle}`}>
          {title}
        </p>
        <p className={styles.channel}>{channelTitle}</p>
        <p className={styles.date}>{formatAgo(publishedAt, "ko")}</p>
      </div>
    </li>
  );
};

export default VideoItem;
