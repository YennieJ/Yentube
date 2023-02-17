import React from "react";
import styles from "./ChannelInfo.module.css";

import { useYoutubeApi } from "../../context/YoutubeApiContext";
import { useQuery } from "@tanstack/react-query";

const ChannelInfo = ({ id, name }) => {
  const { youtube } = useYoutubeApi();
  const { data: url } = useQuery(
    ["channel", id],
    () => youtube.channelImageURL(id),
    { staleTime: 1000 * 60 * 5 }
  );
  return (
    <div className={styles.info}>
      {url && <img className={styles.channelImg} src={url} alt="" />}
      <p className={styles.channelName}>{name}</p>
    </div>
  );
};

export default ChannelInfo;
