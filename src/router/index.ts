import { createBrowserRouter } from 'react-router-dom';
import { companyProfileRoutes } from './company-profile';
import { dashboardRoutes } from './dashboard';
import { authRoutes } from './auth';

const routes = [companyProfileRoutes, dashboardRoutes, ...authRoutes];

const router = createBrowserRouter(routes);

export default router;
