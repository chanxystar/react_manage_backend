import { RouteRecord, RoutesList } from "./index.d";
import {
  HddFilled,
  DashboardFilled,
} from "@ant-design/icons";
import { lazy } from "react";
import Layout from "@/Layout";
const Home = lazy(() => import("@/pages/Home"));
const Product = lazy(() => import("@/pages/info/product"));
//本地的路由配置,如果需要从后端获取路由配置,可以跟这个路由表比对过滤后，再传props给APP中的Router
export const routesProps: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    name: "Layout",
    children: [
      {
        path: "/home",
        element: <Home />,
        name: "Home",
        meta: {
          hidden: false,
          title: "工作台",
          icon: <DashboardFilled />,
        },
      },
      {
        path: "/info",
        name: "Info",
        meta: {
          hidden: false,
          title: "信息管理",
          icon: <HddFilled />,
        },
        children: [
          {
            path: "/info/product",
            element: <Product />,
            name: "Product",
            meta: {
              hidden: false,
              title: "货品信息",
            },
          },
        ],
      },
    ],
  },
];
//路由过滤函数
export function filterRoutes(
  routes: RouteRecord[],
  baseRoutes: RoutesList[]
): RouteRecord[] {
  return routes.filter((route) => {
    const matchingBaseRoute = baseRoutes.find(
      (baseRoute) => baseRoute.path === route.path
    );

    if (!matchingBaseRoute) {
      return false;
    }

    if (
      matchingBaseRoute.children &&
      route.children &&
      matchingBaseRoute.children.length === route.children.length
    ) {
      route.children = filterRoutes(route.children, matchingBaseRoute.children);
    }

    return true;
  });
}
