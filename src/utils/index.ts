import { RouteRecord, RoutesList } from "@/router/index.d";
import { MenuProps } from "antd";
export type MenuItem = Required<MenuProps>["items"][number];
export function getMenuItem(route: RouteRecord): MenuItem | false {
  if(route.meta?.hidden) return false;
  return {
    key: route.path,
    icon: route.meta?.icon,
    children: route.children?.map((e) => {
      return getMenuItem(e);
    }),
    label: route.meta?.title,
    title: route.meta?.title
  } as MenuItem;
}

//匹配函数，根据传过来的path,返回菜单的对象
export const getItemInfo = (
  key: string,
  items: MenuItem[]
): MenuItem | undefined => {
  for (const item of items) {
    if (item?.key === key) {
      return item;
    } else if ((item as any)?.children) {
      const result = getItemInfo(key, (item as any)?.children);
      if (result) {
        return result;
      }
    }
  }
  return undefined;
};

//纯静态路由整理redux中的路由表
export const genRouteList = (items: RouteRecord[]): RoutesList[] => {
  return items.map((item) => {
    return {
      path: item.path,
      children: item.children ? genRouteList(item.children) : undefined,
    };
  });
};