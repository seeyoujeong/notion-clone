export const joinWithSlash = (...args: (number | string)[]) => {
  return (
    args
      .map(String)
      .map((str) => str.replace(/^\/|\/$/g, ""))
      .join("/") + "/"
  );
};
