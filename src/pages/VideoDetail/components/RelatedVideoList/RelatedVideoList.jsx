import React from "react";
import { useQuery } from "@tanstack/react-query";

import { useYoutubeApi } from "context/YoutubeApiContext";
import { useRecoilValue } from "recoil";
import { searchModalState } from "atoms";

import Loading from "components/Loading/Loading";
import ErrorPage from "components/ErrorPage/ErrorPage";
import VideoItem from "components/VideoItem/VideoItem";

import styles from "./RelatedVideoList.module.css";

const RelatedVideosList = ({ id }) => {
  const { youtube } = useYoutubeApi();
  const {
    data: videos,
    isLoading,
    error,
  } = useQuery(["related", id], () => youtube.relatedVideo(id), {
    staleTime: 1000 * 60 * 5,
  });

  //이곳에서 한번만 체크하게?..
  const searchModal = useRecoilValue(searchModalState);

  return (
    <>
      {isLoading && <Loading type="relatedLoading" />}
      {error && <ErrorPage />}
      {videos && (
        <div className={styles.related}>
          <div className={styles.titleBox}>
            <h3 className={styles.title}>추천 영상</h3>
          </div>
          <ul className={styles.videos}>
            {videos.map((video) => (
              <VideoItem
                key={video.id}
                video={video}
                type="related"
                searchModal={searchModal}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default RelatedVideosList;
