import { Layout, ErrorFallback } from "@/components";
import { RouteObject } from "react-router-dom";
import { Error404 } from "@/pages/error_404";
import { Top } from "@/pages/top";

export const AppRoutes: RouteObject[] = [
  {
    path: "/",
    errorElement: <ErrorFallback />,
    children: [
      {
        element: <Layout />,
        children: [{ index: true, element: <Top /> }],
      },
      { path: "*", element: <Error404 /> },
    ],
  },
];
