import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const Videos = () => {
  const { keyword } = useParams();
  const {
    isLoding,
    error,
    data: videos,
  } = useQuery(["videos", keyword], async () => {
    return axios
      .get(`videos/${keyword ? "search" : "popular"}.json`)
      .then((res) => res.data.items);
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

// fetch를 사용하면 정보를 받아 올때 마다 json으로 변환해야한다는 점과 catch로 error를 핸들링 할 수 있지만 백엔드에서 정보를 받아오는 것 모두 성공했다고 처리를 하므로 (200대든 400대든)then에서 걸러줘야 하는데(throw를 통해) 이것을 해결 가능하게 하는것이 axios
