import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useYoutubeApi } from "../../../../context/YoutubeApiContext";

import { formatAgo } from "../../../../util/date";

import styles from "./ChannelInfo.module.css";

const ChannelInfo = ({ id, title, name, time, type, isRelated }) => {
  const { youtube } = useYoutubeApi();
  const { data: url } = useQuery(["channel", id], () =>
    youtube.channelImageURL(id)
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
        {!isRelated && (
          <div className={styles.imgContainer}>
            {url && <img className={styles.channelImg} src={url} alt="" />}
          </div>
        )}
        <div className={`${isDetail ? styles.detailInfo : styles.info}`}>
          {!isDetail && (
            <h2
              className={`${
                isRelated ? styles.relatedTitle : styles.listTitle
              }`}
            >
              {title}
            </h2>
          )}
          <p className={styles.name}>{name}</p>
          <p className={styles.date}>{formatAgo(time, "ko")}</p>
        </div>
      </div>
    </div>
  );
};

export default ChannelInfo;
