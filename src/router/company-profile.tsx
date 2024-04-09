import { Landing, Organisasi } from '@/apps/company-profile/pages';

export const companyProfileRoutes = {
  path: '/',
  children: [
    { index: true, element: <Landing /> },
    { path: 'organization', element: <Organisasi /> },
  ],
};
