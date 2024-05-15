import { createNewSession } from '@/services/chatbot';
import { RootState } from '@/types/auth/RootState';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ChatbotRedirect() {
  const { id } = useSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();

  useEffect(() => {
    const newChatSession = async () => {
      const responseData = await createNewSession(id);
      const sessionId = await responseData.detail.session_id;

      navigate(`/chatbot/${sessionId}`);
    };
    newChatSession();
  }, [navigate]);

  return null;
}

export default ChatbotRedirect;
