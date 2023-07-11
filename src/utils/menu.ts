import { BaseRoute } from "@/router/index.d";
import { MenuProps } from "antd";
import { cloneDeep } from "lodash";
export type MenuItem = Required<MenuProps>["items"][number];

//路由到Menu的映射
function getMenu(route: BaseRoute): MenuItem {
  return {
    key: route.path,
    icon:route.meta.icon,
    children: route.children?.map((e) => {
      return getMenu(e);
    }),
    title:route.meta.title,
    label: route.meta.title,
  } as MenuItem;
}
//过滤需要隐藏的路由
export function filterToMenu(routes: BaseRoute[]): BaseRoute[] {
  const routeList = cloneDeep(routes)
  return routeList.filter((item) => {
    if (item.children) {
      item.children = filterToMenu(item.children);
    }
    return item.meta?.hidden !== true;
  });
}
//根据传入路由表生成菜单
export function getMenus(routes: BaseRoute[]): MenuItem[] {
  return routes.map((item) => {
    return getMenu(item);
  });
}


