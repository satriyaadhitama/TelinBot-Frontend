import { createBrowserRouter } from 'react-router-dom';
import { companyProfileRoutes } from './company-profile';
import { dashboardRoutes } from './dashboard';

const routes = [...companyProfileRoutes, ...dashboardRoutes];

const router = createBrowserRouter(routes);

export default router;
