import { Landing, Organisasi } from '@/apps/company-profile/pages';

export const companyProfileRoutes = [
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/organisasi',
    element: <Organisasi />,
  },
];
