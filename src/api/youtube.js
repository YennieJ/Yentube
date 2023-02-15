import axios from "axios";

// fetch를 사용하면 정보를 받아 올때 마다 json으로 변환해야한다는 점과 catch로 error를 핸들링 할 수 있지만 백엔드에서 정보를 받아오는 것 모두 성공했다고 처리를 하므로 (200대든 400대든)then에서 걸러줘야 하는데(throw를 통해) 이것을 해결 가능하게 하는것이 axios

export async function search(keyword) {
  return axios
    .get(`videos/${keyword ? "search" : "popular"}.json`)
    .then((res) => res.data.items);
}