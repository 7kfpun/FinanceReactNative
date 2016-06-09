module.exports = function(url) {
  const GOOGLE_FEED_API_URL = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&q=';
  url = GOOGLE_FEED_API_URL + encodeURIComponent(url);

  return fetch(url).then((res) => res.json());
};
