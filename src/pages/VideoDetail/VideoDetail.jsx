import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import ChannelInfo from "components/VideoItem/components/ChannelInfo/ChannelInfo";
import RelatedVideos from "./components/RelatedVideos/RelatedVideos";
import useSize from "hooks/useSize";

import styles from "./VideoDetail.module.css";
import { Helmet } from "react-helmet-async";

const VideoDetail = () => {
  const {
    state: { video },
  } = useLocation();
  const { title, description } = video.snippet;
  const size = useSize();

  const [openDescription, setOpenDescription] = useState(false);

  const handleDescription = () => {
    if (openDescription) {
      setOpenDescription(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      return setOpenDescription(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${title} - YenTube`}</title>
      </Helmet>
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
              <ChannelInfo video={video.snippet} type="detail" />

              <div
                className={`${
                  openDescription
                    ? styles.openDescriptionContainer
                    : styles.descriptionContainer
                }`}
                onClick={handleDescription}
              >
                <pre
                  className={`${
                    openDescription
                      ? styles.openDescription
                      : styles.description
                  }`}
                >
                  {description}
                </pre>
                <button
                  className={styles.descriptionButton}
                  onClick={() => handleDescription}
                >
                  {openDescription ? "간략히" : "더보기"}
                </button>
              </div>

              {!size && (
                <>
                  <pre
                    className={`${
                      openDescription
                        ? styles.openDescription
                        : styles.description
                    }`}
                  >
                    {description}
                  </pre>
                  <button
                    className={styles.descriptionButton}
                    onClick={handleDescription}
                  >
                    {openDescription ? "간략히" : "더보기"}
                  </button>
                </>
              )}
            </div>
          </article>
          <section className={styles.relatedVidoes}>
            <RelatedVideos id={video.id} />
          </section>
        </section>
      </div>
    </>
  );
};

export default VideoDetail;
