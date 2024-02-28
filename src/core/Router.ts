import { Component } from ".";

interface RouteObject {
  path: string;
  page: typeof Component;
}

class Router {
  protected targetEl: HTMLElement | undefined;
  protected _params: Record<string, string>;
  protected routes: RouteObject[];

  constructor(routes: RouteObject[]) {
    this.targetEl;
    this._params = {};
    this.routes = routes;
  }

  init(element: HTMLElement) {
    this.targetEl = element;
    this.navigate(location.pathname);
  }

  navigate(currentPath: string) {
    const matchedRoute = this.routes.find(({ path }) =>
      this.isSamePath(path, currentPath)
    );

    if (matchedRoute && this.targetEl) {
      new matchedRoute.page({ targetEl: this.targetEl });
    } else {
      console.error("no matched route");
    }
  }

  get params() {
    return this._params;
  }

  private isSameSegments(segments1: string[], segments2: string[]) {
    if (segments1.length !== segments2.length) {
      return false;
    }

    return segments1.every((seg, idx) => {
      if (seg === segments2[idx]) {
        return true;
      } else if (seg.startsWith(":")) {
        this._params[seg.slice(1)] = segments2[idx];
        return true;
      } else {
        return false;
      }
    });
  }

  private isSamePath(routePath: string, currentPath: string) {
    if (routePath === currentPath) {
      return true;
    }

    const routePathSegments = routePath.split("/");
    const currentPathSegments = currentPath.split("/");

    return this.isSameSegments(routePathSegments, currentPathSegments);
  }
}

export default Router;
