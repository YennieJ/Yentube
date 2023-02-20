import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ChannelInfo from "../ChannelInfo/ChannelInfo";
import RelatedVideos from "../RelatedVideos/RelatedVideos";

import styles from "./VideoDetail.module.css";

export default function VideoDetail() {
  const {
    state: { video },
  } = useLocation();
  const { title, channelId, channelTitle, description, publishedAt } =
    video.snippet;

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) {
      return;
    } else {
      return setIsOpen(true);
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.content}>
        <article className={styles.article}>
          <div className={styles.videoContainer}>
            <iframe
              className={styles.video}
              title={title}
              id="player"
              type="text/html"
              width="100%"
              height="100%"
              src={`http://www.youtube.com/embed/${video.id}`}
              frameBorder="0"
            />
          </div>
          <div className={styles.infoWrapper}>
            <ChannelInfo
              id={channelId}
              title={title}
              name={channelTitle}
              time={publishedAt}
              type="detail"
            />

            <div
              className={`${
                isOpen
                  ? styles.OepndescriptionContainer
                  : styles.descriptionContainer
              }`}
              onClick={handleOpen}
            >
              <pre className={`${isOpen ? styles.OpenPre : styles.pre}`}>
                {description}
              </pre>
              <button
                className={styles.button}
                onClick={() => setIsOpen(false)}
              >
                {isOpen ? "간략히" : "더보기"}
              </button>
            </div>
          </div>
        </article>
        <section className={styles.relatedVidoes}>
          <RelatedVideos id={video.id} />
        </section>
      </section>
    </div>
  );
}
