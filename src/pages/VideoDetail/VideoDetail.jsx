import React, { useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

import formatAgo from "util/date";
import useSize from "hooks/useSize";

import ChannelInfo from "components/VideoItem/components/ChannelInfo/ChannelInfo";
import RelatedVideoList from "./components/RelatedVideoList/RelatedVideoList";

import styles from "./VideoDetail.module.css";

const VideoDetail = () => {
  const {
    state: { video },
  } = useLocation();
  const { title, description, publishedAt } = video.snippet;

  const [openDescription, setOpenDescription] = useState(false);

  const size = useSize();

  //solt position을 위한 video height
  const vidoeRef = useRef(null);
  const [slotPosition, setSlotPosition] = useState(
    vidoeRef.current?.clientHeight
  );
  useEffect(() => {
    setSlotPosition(vidoeRef.current.clientHeight);
  }, [size]);

  //scoll height를 위한 infoHeight
  const infoHeightRef = useRef(null);
  const [infoHeight, setInfoHeight] = useState(
    infoHeightRef.current?.clientHeight
  );
  useEffect(() => {
    setInfoHeight(infoHeightRef.current.clientHeight);
  }, [openDescription, size]);

  //scollY 값 구하기
  const [scrollY, setScrollY] = useState(0);
  const handleScroll = () => {
    const scrollPosition = window.pageYOffset;
    setScrollY(scrollPosition);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //스크롤 값이 비디오 정보 높이 이상일떼
  const slot = scrollY >= infoHeight;

  //open,close button for description
  const handleDescription = () => {
    if (openDescription) {
      return (
        setOpenDescription(false),
        window.scrollTo({ top: 0, behavior: "smooth" })
      );
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
                ref={vidoeRef}
                className={styles.video}
                title={title}
                id="player"
                type="text/html"
                src={`https://www.youtube.com/embed/${video.id}`}
                frameBorder="0"
              />
            </div>

            <div className={styles.mobileVideoBg} />

            <div className={styles.infoContainer} ref={infoHeightRef}>
              <ChannelInfo video={video.snippet} type="detail" />

              <div
                style={
                  openDescription
                    ? { cursor: "default" }
                    : { cursor: "pointer" }
                }
                className={styles.descriptionContainer}
                onClick={() => setOpenDescription(true)}
              >
                <span>{formatAgo(publishedAt, "ko")}</span>

                {openDescription && (
                  <pre className={styles.description}>{description}</pre>
                )}
                <button
                  onClick={(e) => {
                    //두번 클릭 막기
                    e.stopPropagation();
                    handleDescription();
                  }}
                >
                  {openDescription ? "간략히" : "더보기"}
                </button>
              </div>
            </div>
          </article>
          {slot && (
            <div
              // 50은 header 높이 값
              style={{ top: `${slotPosition + 50}px` }}
              className={styles.slot}
            >
              <h3 className={styles.slotItem}>추천 영상</h3>
            </div>
          )}
          <div>
            <RelatedVideoList id={video.id} />
          </div>
        </section>
      </div>
    </>
  );
};

export default VideoDetail;
