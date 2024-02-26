import { Component } from ".";

interface RouteObject {
  path: string;
  page: typeof Component;
}

const isSameSegments = (segments1: string[], segments2: string[]) => {
  if (segments1.length !== segments2.length) {
    return false;
  }

  return segments1.every((seg, idx) => {
    if (seg === segments2[idx]) {
      return true;
    } else if (seg.startsWith(":")) {
      return true;
    } else {
      return false;
    }
  });
};

const isSamePath = (routePath: string, currentPath: string) => {
  if (routePath === currentPath) return true;

  const routePathSegments = routePath.split("/");
  const currentPathSegments = currentPath.split("/");

  return isSameSegments(routePathSegments, currentPathSegments);
};

const createRouter = (routes: RouteObject[]) => {
  let targetEl: HTMLElement;

  return {
    init(element: HTMLElement) {
      targetEl = element;
      this.navigate(location.pathname);
    },
    navigate(currentPath: string) {
      const matchedRoute = routes.find(({ path }) =>
        isSamePath(path, currentPath)
      );

      if (matchedRoute) {
        new matchedRoute.page({ targetEl });
      } else {
        console.error("no matched route");
      }
    },
  };
};

export default createRouter;
