const RSS = (url) => {
  const YAHOO_FEED_API_URL = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20feed%20where%20url%3D%27${encodeURIComponent(url)}%27&format=json&diagnostics=true&callback=`;

  return fetch(YAHOO_FEED_API_URL).then(res => res.json());  // eslint-disable-line no-undef
};

export default RSS;
