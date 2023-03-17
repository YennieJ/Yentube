export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  // #은 프라이빗 함수로 이 class 내부에선 호출이 가능하나 외부에선 불가능
  async search(pageToken, keyword) {
    return keyword
      ? this.#searchByKeyword(pageToken, keyword)
      : this.#mostPopular(pageToken);
  }

  //채널사진
  async channelImageURL(id) {
    return this.apiClient
      .channels({ params: { part: "snippet", id } })
      .then((res) => res.data.items[0].snippet.thumbnails.default.url);
  }

  //관련된 비디오
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

  //videoList data
  //다른 점은 keyword가 있냐 없냐
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
