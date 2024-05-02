import { Chat } from '@/apps/chatbot/pages';

export const chatbotRoutes = {
  path: '/chatbot',
  children: [{ index: true, element: <Chat /> }],
};
