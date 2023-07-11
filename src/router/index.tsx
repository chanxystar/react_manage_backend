import { RouterProvider, createHashRouter } from "react-router-dom";
import { routes } from "./routes";
export default function Router() {
  const router = createHashRouter(routes);
  return <RouterProvider router={router} />;
}
