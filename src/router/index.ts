import { createBrowserRouter } from 'react-router-dom';
import { companyProfileRoutes } from './company-profile';
import { dashboardRoutes } from './dashboard';
import { authRoutes } from './auth';
import { chatbotRoutes } from './chatbot';

const routes = [
  companyProfileRoutes,
  dashboardRoutes,
  authRoutes,
  chatbotRoutes,
];

const router = createBrowserRouter(routes);

export default router;
