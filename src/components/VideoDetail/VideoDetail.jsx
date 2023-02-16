import React from "react";
import { useLocation } from "react-router-dom";
import ChannelInfo from "../ChannelInfo/ChannelInfo";
import RelatedVideos from "../RelatedVideos/RelatedVideos";

import styles from "./VideoDetail.module.css";

export default function VideoDetail() {
  const {
    state: { video },
  } = useLocation();
  const { title, channelId, channelTitle, description } = video.snippet;
  return (
    <section className={styles.detail}>
      <article className={styles.article}>
        <iframe
          className={styles.playvideo}
          title={title}
          id="player"
          type="text/html"
          width="100%"
          height="630"
          src={`http://www.youtube.com/embed/${video.id}`}
          frameBorder="0"
        />
        <div className={styles.info}>
          <h2 className={styles.title}>{title}</h2>
          <ChannelInfo id={channelId} name={channelTitle} />
          <pre className={styles.pre}>{description}</pre>
        </div>
      </article>
      <section className={styles.related}>
        <RelatedVideos id={video.id} />
      </section>
    </section>
  );
}
