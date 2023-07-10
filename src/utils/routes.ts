import { RoutesList, BaseRoute } from "@/router/index.d";
import { MenuProps } from "antd";
import { RouteObject } from "react-router-dom";
export type MenuItem = Required<MenuProps>["items"][number];
function getMenu(route: BaseRoute): MenuItem {
  const { icon, title } = route.loader?.() || {};
  return {
    key: route.path,
    icon,
    children: route.children?.map((e) => {
      return getMenu(e);
    }),
    title,
    label: title,
  } as MenuItem;
}
export function filterRoutes(routes: BaseRoute[]): BaseRoute[] {
  return routes.filter((item) => {
    if (item.children) {
      item.children = filterRoutes(item.children);
    }
    return item.loader?.().hidden !== true;
  });
}

export function getMenus(routes: BaseRoute[]): MenuItem[] {
  if (!routes[0].children) return [];
  return routes[0].children.map((item) => {
    return getMenu(item);
  });
}

//纯静态路由整理store中的路由表
export const genRouteList = (items: RouteObject[]): RoutesList[] => {
  return items.map((item) => {
    return {
      path: item.path || "",
      children: item.children ? genRouteList(item.children) : undefined,
    };
  });
};

//根据store中的list，过滤转换静态路由表
export function exchangeRoutes(
  routes: BaseRoute[],
  list: RoutesList[]
): BaseRoute[] {
  return routes.filter((route) => {
    const matchingBaseRoute = list.find((item) => item.path === route.path);

    if (!matchingBaseRoute) {
      return false;
    }

    if (matchingBaseRoute.children && route.children) {
      route.children = exchangeRoutes(
        route.children,
        matchingBaseRoute.children
      );
    }
    return true;
  });
}
