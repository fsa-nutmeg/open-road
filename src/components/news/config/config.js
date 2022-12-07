// export const navbarBrand = "News App";
export const header = (category) => `News - Top ${category} Headlines`;

export const router = [
  {
    path: "/",
    key: "",
    category: "",
    country: "",
  },
];

export const summary = "Author, Channel and Date";
export const author = (author) => `Author: ${!author ? "Unknown" : author}`;
export const channel = (channel) => `Channel: ${channel}`;
export const lastUpdate = (date) =>
  `Last updated: ${new Date(date).toGMTString()}`;
