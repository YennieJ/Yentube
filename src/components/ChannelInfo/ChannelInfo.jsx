import React from "react";
import styles from "./ChannelInfo.module.css";

import { useYoutubeApi } from "../../context/YoutubeApiContext";
import { useQuery } from "@tanstack/react-query";

const ChannelInfo = ({ id, name }) => {
  const { youtube } = useYoutubeApi();
  const {
    data: url,
    isLoading,
    error,
  } = useQuery(["channel", id], () => youtube.channelImageURL(id));
  return (
    <div className={styles.info}>
      {error && <div>error</div>}
      {url && <img className={styles.channelImg} src={url} alt="" />}
      <p className={styles.channelName}>{name}</p>
    </div>
  );
};

export default ChannelInfo;
