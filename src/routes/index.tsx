import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from 'layouts/main';
import Page404 from 'pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: (
          <MainLayout />
      ),
      children: [
        {}
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> },
    { path: '/404', element: <Page404 />}
  ]);
}

