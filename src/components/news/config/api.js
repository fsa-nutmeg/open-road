export const API_DOMAIN =
  "https://newsapi.org/v2/everything?q= road trip +motorcycle -politics -government -religion -twitter -accident -death -dead -shooting -killed -dies";
export const API_KEY = `${process.env.REACT_APP_NEWS_KEY}`;
export const endpointPath = (country, category, page, pageSize) =>
  `${API_DOMAIN}${country}&category=${category}&apiKey=${API_KEY}&page=${page}&pageSize=${pageSize}`;
