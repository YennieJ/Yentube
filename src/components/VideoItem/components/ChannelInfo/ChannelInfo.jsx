import React from "react";
import { useQuery } from "@tanstack/react-query";

import { useYoutubeApi } from "Context/YoutubeApiContext";
import formatAgo from "Util/date";

import styles from "./ChannelInfo.module.css";

const ChannelInfo = ({ type, isRelated, video }) => {
  const { channelId, title, channelTitle: channelName, publishedAt } = video;

  //뒤로갈때도 data를 받아오기 위해서
  const { youtube } = useYoutubeApi();
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

        <div className={isDetail ? styles.detailInfo : styles.listInfo}>
          {!isDetail && (
            <h2
              className={`${
                isRelated ? styles.relatedTitle : styles.listTitle
              }`}
            >
              {title}
            </h2>
          )}
          <div className={styles.flex}>
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
