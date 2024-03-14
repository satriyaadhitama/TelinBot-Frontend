import { createBrowserRouter } from 'react-router-dom';
import { companyProfileRoutes } from './company-profile';

const routes = [...companyProfileRoutes];

const router = createBrowserRouter(routes);

export default router;
