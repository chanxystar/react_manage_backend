import { HddFilled, DashboardFilled } from "@ant-design/icons";
import { lazy } from "react";
import Layout from "@/Layout";
import { BeforeRouter } from "./guard";
import Login from "@/pages/Login";
import { NonExistent } from "@/pages/Error";
import { BaseRoute } from "./index.d";
const Home = lazy(() => import("@/pages/Home"));
const Product = lazy(() => import("@/pages/info/product"));
//本地的路由配置,如果需要从后端获取路由配置,可以跟这个路由表比对过滤后，再传props给APP中的Router
export const baseRoutes: BaseRoute[] = [
  {
    path: "/home",
    element: <Home />,
    name: "home",
    meta: {
      hidden: false,
      title: "工作台",
      icon: <DashboardFilled />,
    },
  },
  {
    path: "/info",
    name: "info",
    meta: {
      hidden: false,
      title: "信息管理",
      icon: <HddFilled />
    },
    children: [
      {
        path: "/info/product",
        element: <Product />,
        name: "product",
        meta: {
          hidden: false,
          title: "货品信息",
        },
      },
      {
        path: "/info/test",
        element: <div>test</div>,
        name: "test",
        meta: {
          hidden: true,
          title: "测试",
        },
      },
    ],
  },
];

export const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <BeforeRouter />,
    children: [
      {
        path:'/',
        name:'layout', 
        element:<Layout />,
        children:baseRoutes
      }
    ],
  },
  {
    path: "*",
    element: <NonExistent />,
  },
];
