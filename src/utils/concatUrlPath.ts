export const concatUrlPath = (url: string, path: string) => {
  if (url[url.length - 1] !== "/") {
    url += "/";
  }

  if (path[0] === "/") {
    path = path.slice(1);
  }

  return `${url}${path}`;
};
