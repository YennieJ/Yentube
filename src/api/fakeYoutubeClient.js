import axios from "axios";

// fetch를 사용하면 정보를 받아 올때 마다 json으로 변환해야한다는 점과 catch로 error를 핸들링 할 수 있지만 백엔드에서 정보를 받아오는 것 모두 성공했다고 처리를 하므로 (200대든 400대든)then에서 걸러줘야 하는데(throw를 통해) 이것을 해결 가능하게 하는것이 axios

export default class FakeYoutubeClient {
  // #은 프라이빗 함수로 이 class 내부에선 호출이 가능하나 외부에선 불가능
  // async search(keyword) {
  //   return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  // }
  // async #searchByKeyword() {
  //   return axios
  //     .get(`videos/search.json`)
  //     .then((res) => res.data.items)
  //     .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  // }

  // async #mostPopular() {
  //   return axios.get(`videos/popular.json`).then((res) => res.data.items);
  // }

  async search() {
    return axios.get("/videos/search.json");
  }
  async videos() {
    return axios.get("/videos/popular.json");
  }
}
