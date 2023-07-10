import { RouterProvider, createHashRouter } from "react-router-dom";
import { baseRoutes, routes } from "./routes";
import { useMemo } from "react";
import { useAppSelector } from "@/store";
import {cloneDeep} from "lodash";
import { exchangeRoutes } from "@/utils/routes";
export default function Router() {
  const list = useAppSelector(state=>state.routes.list)
  const routesProp = cloneDeep(routes)
  const router = useMemo(()=>{
    routesProp[1].children = exchangeRoutes(cloneDeep(baseRoutes),list)
    return createHashRouter(routesProp)
  },[list])
  return <RouterProvider router={router} />;
}
