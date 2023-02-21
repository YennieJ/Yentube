// fetch를 사용하면 정보를 받아 올때 마다 json으로 변환해야한다는 점과 catch로 error를 핸들링 할 수 있지만 백엔드에서 정보를 받아오는 것 모두 성공했다고 처리를 하므로 (200대든 400대든)then에서 걸러줘야 하는데(throw를 통해) 이것을 해결 가능하게 하는것이 axios

export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  // #은 프라이빗 함수로 이 class 내부에선 호출이 가능하나 외부에선 불가능
  async search(pageToken, keyword) {
    return keyword
      ? this.#searchByKeyword(keyword)
      : this.#mostPopular(pageToken);
  }

  async channelImageURL(id) {
    return this.apiClient
      .channels({ params: { part: "snippet", id } })
      .then((res) => res.data.items[0].snippet.thumbnails.default.url);
  }

  async relatedVideo(id) {
    return this.apiClient
      .search({
        params: {
          part: "snippet",
          maxResults: 24,
          type: "video",
          regionCode: "KR",

          relatedToVideoId: id,
        },
      })
      .then((res) =>
        // 잘 활용하기!
        res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
  }

  async #searchByKeyword(pageToken, keyword) {
    return this.apiClient
      .search({
        params: {
          part: "snippet",
          maxResults: 24,
          type: "video",
          q: keyword,
          regionCode: "KR",

          pageToken: pageToken && pageToken,
        },
      })

      .then((res) => res.data);
  }

  async #mostPopular(pageToken) {
    return this.apiClient
      .videos({
        params: {
          part: "snippet",
          maxResults: 24,
          chart: "mostPopular",
          regionCode: "KR",
          pageToken: pageToken && pageToken,
        },
      })
      .then((res) => res.data);
  }
}
