import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RouteRecord } from "./index.d";
import { BeforeRouter } from "./guard";
import Login from "@/pages/Login";
import { NonExistent } from "@/pages/Error";
import { useAppDispatch, useAppSelector } from "@/store";
import { filterRoutes, routesProps } from "./routes";
import { useEffect, useState } from "react";
import KeepAlive, { AliveScope } from "react-activation";
import SpinBox from "@/Layout/SpinBox";

const generRoutes = (routes: RouteRecord[]) => {
  return routes.map((route) => {
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.meta?.keep ? (
            <KeepAlive id={route.name} name={route.path}>
              <SpinBox>{route.element}</SpinBox>
            </KeepAlive>
          ) : (
            route.element
          )
        }
      >
        {route.children ? generRoutes(route.children) : undefined}
      </Route>
    );
  });
};
export default function Router() {
  const { list } = useAppSelector((state) => state.routes);
  const dispatch = useAppDispatch();
  const [routes, setRoutes] = useState<RouteRecord[]>([]);
  useEffect(() => {
    dispatch({ type: "routes/setLoading", payload: true });
    setRoutes(filterRoutes(routesProps, list));
    dispatch({ type: "routes/setLoading", payload: false });
  }, [list]);
  return (
    <BrowserRouter>
      <AliveScope>
        <Routes>
          <Route element={<Login />} path="/login"></Route>
          <Route element={<BeforeRouter />}>{generRoutes(routes)}</Route>
          <Route element={<NonExistent />} path="*"></Route>
        </Routes>
      </AliveScope>
    </BrowserRouter>
  );
}
