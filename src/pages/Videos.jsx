import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { search } from "../api/youtube";
import FakeYoutube from "../api/fakeYoub";
const Videos = () => {
  const { keyword } = useParams();
  const {
    isLoding,
    error,
    data: videos,
  } = useQuery(["videos", keyword], () => {
    const youtube = new FakeYoutube();
    return youtube.search(keyword);
  });

  return (
    <>
      <div>Videos {keyword ? `${keyword}` : "HOT"}</div>
      {isLoding && <p>Loding...</p>}
      {error && <p>ERROR</p>}
      {videos && (
        <ul>
          {videos.map((videos) => (
            <div key={videos.id}>
              <div>{videos.snippet.title}</div>
            </div>
          ))}
        </ul>
      )}
    </>
  );
};

export default Videos;
