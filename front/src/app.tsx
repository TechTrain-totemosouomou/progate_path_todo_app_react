import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoadingSpinner } from "@/components/loading_spinner";
import { AppRoutes } from "@/routes";

const router = createBrowserRouter(AppRoutes);

export function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
