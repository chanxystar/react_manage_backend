import { RouterProvider, createHashRouter } from "react-router-dom";
import { routes } from "./routes";
import { useMemo } from "react";
export default function Router() {
  const router = useMemo(()=>{
    return createHashRouter(routes)
  },[])
  return <RouterProvider router={router} />;
}
