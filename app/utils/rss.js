function RSS(url) {
  const GOOGLE_FEED_API_URL = `https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&q=${encodeURIComponent(url)}`;

  return fetch(GOOGLE_FEED_API_URL).then(res => res.json());  // eslint-disable-line no-undef
}

export default RSS;
