import React from "react";
import { useQuery } from "@tanstack/react-query";

import formatAgo from "util/date";

import styles from "./ChannelInfo.module.css";

const ChannelInfo = ({ type, isRelated, video, youtube }) => {
  const { channelId, title, channelTitle: channelName, publishedAt } = video;

  const { data: url } = useQuery(["channel", channelId], () =>
    youtube.channelImageURL(channelId)
  );

  //for css
  const isDetail = type === "detail";

  return (
    <div>
      {isDetail && <h2 className={styles.detailTitle}>{title}</h2>}
      <div
        className={`${
          isRelated ? styles.relatedCotainer : styles.listContainer
        }`}
      >
        <div
          className={`${
            isRelated ? styles.relatedImgContainer : styles.imgContainer
          }`}
        >
          {url && <img className={styles.channelImg} src={url} alt="" />}
        </div>

        <div className={isDetail ? styles.detailtInfo : styles.listInfo}>
          {!isDetail && (
            <h2
              className={`${
                isRelated ? styles.relatedTitle : styles.listTitle
              }`}
            >
              {title}
            </h2>
          )}
          <div className={styles.mobile}>
            <p
              className={
                isDetail ? styles.channelName : styles.relatedChannelName
              }
            >
              {channelName}
            </p>
            {!isDetail && (
              <p className={styles.date}>{formatAgo(publishedAt, "ko")}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelInfo;
