import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../container/layout/layout";
import Extension from "../components/extension/extension";
import Core from "../components/core/core";

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
        element: <Extension />,
        loader: async () => {
          return ["extension"];
        },
      },
      {
        path: "extension",
        element: <Extension />,
        loader: async () => {
          return ["extension"];
        },
      },
      {
        path: "core",
        element: <Core />,
        loader: async () => {
          return ["core"];
        },
      },
    ],
  },
]);

export default router;
