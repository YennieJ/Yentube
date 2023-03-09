import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useYoutubeApi } from "context/YoutubeApiContext";

import formatAgo from "util/date";
import useSize from "hooks/useSize";

import styles from "./ChannelInfo.module.css";

const ChannelInfo = ({ type, isRelated, video }) => {
  const { channelId, title, channelTitle: channelName, publishedAt } = video;
  const { youtube } = useYoutubeApi();
  const { data: url } = useQuery(["channel", channelId], () =>
    youtube.channelImageURL(channelId)
  );

  //for css
  const isDetail = type === "detail";

  const size = useSize();

  return (
    <div>
      {isDetail && <h2 className={styles.detailTitle}>{title}</h2>}
      <div
        className={`${
          isRelated ? styles.relatedCotainer : styles.listContainer
        }`}
      >
        {!isRelated && (
          <div className={styles.imgContainer}>
            {url && <img className={styles.channelImg} src={url} alt="" />}
          </div>
        )}
        {isRelated && !size && (
          <div className={styles.imgContainer}>
            {url && <img className={styles.channelImg} src={url} alt="" />}
          </div>
        )}
        <div
          style={isDetail ? { color: "white" } : { color: "gray" }}
          className={styles.info}
        >
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
            <p className={styles.channelName}>{channelName}</p>
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
