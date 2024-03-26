import { SignIn, Overview } from '@/apps/dashboard/pages';

export const dashboardRoutes = [
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/dashboard',
    element: <Overview />,
  },
];
