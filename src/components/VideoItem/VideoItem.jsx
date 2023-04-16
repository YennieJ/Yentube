import React from "react";
import { useNavigate } from "react-router-dom";

import { useSetRecoilState } from "recoil";
import { pageState } from "atoms";

import Channelinfo from "./Components/ChannelInfo/ChannelInfo";

import styles from "./VideoItem.module.css";

const VideoItem = ({ video, type, searchModal }) => {
  const { title, thumbnails } = video.snippet;

  const navigate = useNavigate();

  const setPage = useSetRecoilState(pageState);

  //for css
  //VideoList에서 가져옴.
  const isList = type === "list";
  //Related에서 가져옴 ChannelInfo에 전달해야하는
  const isRelated = type === "related";

  //검색창이 있을때 page ++ (뒤로가기를 위해서)
  const onClickVideo = () => {
    navigate(
      {
        pathname: "/watch",
        search: `?v=${video.id}`,
      },
      { state: { video } }
    );
    window.scrollTo({ top: 0 });
    searchModal && setPage((prev) => ++prev);
  };

  return (
    <li
      className={`${isList ? styles.listVideo : styles.relatedVideo}`}
      onClick={onClickVideo}
    >
      <img
        className={`${isList ? styles.listThumbnail : styles.relatedThumbnail}`}
        src={thumbnails.medium.url}
        alt={title}
      />

      <Channelinfo video={video.snippet} isRelated={isRelated} />
    </li>
  );
};

export default VideoItem;
