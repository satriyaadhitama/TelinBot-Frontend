import { Overview, Finance, Question } from '@/apps/dashboard/pages';
import { AuthProtectedLayout } from '../components';

export const dashboardRoutes = {
  path: 'dashboard',
  element: <AuthProtectedLayout allowedGroups={['Admin']} />,
  children: [
    { index: true, element: <Overview /> },
    { path: 'finance', element: <Finance /> },
    { path: 'frequently-asked', element: <Question /> },
  ],
};
