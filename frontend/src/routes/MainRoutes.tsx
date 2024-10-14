import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import UserProfile from 'pages/profile/user';

const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));
const MaintenanceError500 = Loadable(
  lazy(() => import('pages/maintenance/500'))
);
const MaintenanceUnderConstruction = Loadable(
  lazy(() => import('pages/maintenance/under-construction'))
);
const MaintenanceComingSoon = Loadable(
  lazy(() => import('pages/maintenance/coming-soon'))
);

const UserTabPersonal = Loadable(
  lazy(() => import('sections/apps/profiles/user/TabPersonal'))
);
const UserTabPassword = Loadable(
  lazy(() => import('sections/apps/profiles/user/TabPassword'))
);

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'profile',
          element: <UserProfile />,
          children: [
            {
              path: 'personal',
              element: <UserTabPersonal />,
            },
            {
              path: 'password',
              element: <UserTabPassword />,
            },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <CommonLayout />,
      children: [
        {
          path: '*',
          element: <MaintenanceError />,
        },
        {
          path: '500',
          element: <MaintenanceError500 />,
        },
        {
          path: 'under-construction',
          element: <MaintenanceUnderConstruction />,
        },
        {
          path: 'coming-soon',
          element: <MaintenanceComingSoon />,
        },
      ],
    },
  ],
};

export default MainRoutes;
