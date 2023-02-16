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
    <div>
      {error && <div>error</div>}
      {url && <img src={url} alt={name} />}
      <p>{name}</p>
    </div>
  );
};

export default ChannelInfo;
