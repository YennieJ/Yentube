import axios from "axios";

// fetch를 사용하면 정보를 받아 올 때마다 JSON으로 변환해야 한다는 점과 catch로 error를 핸들링할 수 있지만 백엔드에서 정보를 받아오는 것 모두 성공했다고 처리하므로 (200대든 400대든) then에서 걸러줘야 하는데(throw를 통해) 이것을 해결할 수 있게 하는 것이 axios

export default class YoutubeClient {
  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3/",
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }

  async search(params) {
    return this.httpClient.get("search", params);
  }

  async videos(params) {
    return this.httpClient.get("videos", params);
  }

  async channels(params) {
    return this.httpClient.get("channels", params);
  }
}
