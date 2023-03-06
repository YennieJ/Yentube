import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import ChannelInfo from "../../components/VideoItem/components/ChannelInfo/ChannelInfo";
import RelatedVideos from "./components/RelatedVideos/RelatedVideos";

import styles from "./VideoDetail.module.css";

export default function VideoDetail() {
  const {
    state: { video },
  } = useLocation();
  const { title, channelId, channelTitle, description, publishedAt } =
    video.snippet;

  const [infoOpen, setInfoOpen] = useState(false);

  const handleInfoOpen = () => {
    if (infoOpen) {
      return;
    } else {
      return setInfoOpen(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.background} />
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
                infoOpen
                  ? styles.oepnDescriptionContainer
                  : styles.descriptionContainer
              }`}
              onClick={handleInfoOpen}
            >
              <pre className={`${infoOpen ? styles.OpenPre : styles.pre}`}>
                {description}
              </pre>
              <button
                className={styles.button}
                onClick={() => setInfoOpen(false)}
              >
                {infoOpen ? "간략히" : "더보기"}
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