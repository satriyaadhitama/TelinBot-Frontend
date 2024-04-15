import { User, Finance, Question } from '@/apps/dashboard/pages';
import { AuthProtectedLayout } from '../components';
import Overview from '@/apps/dashboard/pages/Overview';

export const dashboardRoutes = {
  path: 'dashboard',
  element: <AuthProtectedLayout allowedGroups={['Admin']} />,
  children: [
    { index: true, element: <Overview /> },
    { path: 'users', element: <User /> },
    { path: 'finance', element: <Finance /> },
    { path: 'frequently-asked', element: <Question /> },
  ],
};
