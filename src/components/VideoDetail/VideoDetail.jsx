import React from "react";
import styles from "./VideoDetail.module.css";

import ChannelInfo from "../ChannelInfo/ChannelInfo";
import RelatedVideos from "../RelatedVideos/RelatedVideos";
import { useLocation } from "react-router-dom";
const VideoDetail = () => {
  const {
    state: { video },
  } = useLocation();

  const { title, channelId, channelTitle, description } = video.snippet;

  console.log(video);
  return (
    <section>
      <article>
        <iframe
          title={title}
          id={video.id}
          type="text/html"
          width="100%"
          height="640"
          src={`http://www.youtube.com/embed/${video.id}`}
          frameBorder="0"
        />
        <div>
          <h2>{title}</h2>
          <ChannelInfo id={channelId} name={channelTitle} />
          <pre>{description}</pre>
        </div>
      </article>
      <section>
        <RelatedVideos id={video.id} />
      </section>
    </section>
  );
};

export default VideoDetail;
