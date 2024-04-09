import { Overview, Finance, Question } from '@/apps/dashboard/pages';
import { ProtectedLayout } from '../components';

export const dashboardRoutes = {
  path: 'dashboard',
  element: <ProtectedLayout allowedGroups={['Admin']} />,
  children: [
    { index: true, element: <Overview /> },
    { path: 'finance', element: <Finance /> },
    { path: 'frequently-asked', element: <Question /> },
  ],
};
