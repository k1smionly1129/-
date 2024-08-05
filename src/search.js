const SEARCH_URL = [
  // "https://www.baidu.com/s?ie=UTF-8&wd=",
  "https://cn.bing.com/search?q=",
];

function getSearchURL() {
  //   let random = (Math.random() * 10) % 2;
  return SEARCH_URL[0];
}

export default getSearchURL;
