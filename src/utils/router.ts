/**
 * @description 路由工具函数
 */

import { BaseRoute } from "@/router/index.d";

export const getRoute = (
  path: string,
  routes: BaseRoute[]
): BaseRoute | undefined => {
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    if (route.path === path) {
      return route;
    }
    if (route.children) {
      const foundObject = getRoute(path, route.children);
      if (foundObject) {
        return foundObject;
      }
    }
  }

  return undefined;
};
