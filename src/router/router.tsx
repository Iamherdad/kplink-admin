import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../container/layout/layout";
import App from "../pages/app/appList";
import Core from "../pages/core/coreList";
import { getAppList } from "@/service/api/app.ts";
import { getCoreList } from "@/service/api/core.ts";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: async () => {
      return ["home"];
    },
    children: [
      {
        index: true,
        element: <App />,
        loader: getAppList,
      },
      {
        path: "app",
        element: <App />,
        loader: getAppList,
      },
      {
        path: "core",
        element: <Core />,
        loader: getCoreList,
      },
    ],
  },
]);

export default router;
