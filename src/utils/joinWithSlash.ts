const joinSlash = (array: (number | string)[]) => {
  return array
    .map(String)
    .map((str) => str.replace(/^\/|\/$/g, ""))
    .join("/");
};

export const joinWithSlash = (
  isLastOrArg: boolean | number | string,
  ...args: (number | string)[]
) => {
  if (typeof isLastOrArg === "boolean") {
    return joinSlash(args) + (isLastOrArg ? "/" : "");
  }

  return joinSlash([isLastOrArg, ...args]);
};
