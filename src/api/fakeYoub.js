import axios from "axios";

export default class FakeYoutube {
  constructor() {}

  // #은 프라이빗 함수로 이 class 내부에선 호출이 가능하나 외부에선 불가능
  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }
  async #searchByKeyword(keyword) {
    return axios
      .get(`videos/search.json`)
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  }

  async #mostPopular() {
    return axios.get(`videos/popular.json`).then((res) => res.data.items);
  }
}
