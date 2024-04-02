import { SignIn, Overview, Finance, Question } from '@/apps/dashboard/pages';

export const dashboardRoutes = [
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/dashboard',
    element: <Overview />,
  },
  {
    path: '/dashboard/keuangan',
    element: <Finance />,
  },
  {
    path: '/dashboard/faq',
    element: <Question />,
  },
];
