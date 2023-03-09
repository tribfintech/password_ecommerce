import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
// layouts
import MainLayout from "layouts/main";
import Page404 from "pages/Page404";
import Home from "./../screens/home/index";
import Checkout from "./../screens/checkout/index";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Navigate to="/home" />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "checkout",
          element: <Checkout />
        }
      ],
    },
    // { path: "*", element: <Navigate to="/404" replace /> },
    // { path: "/404", element: <Page404 /> },
  ]);
}
