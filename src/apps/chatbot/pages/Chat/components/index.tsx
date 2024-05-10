import UserMessage from './UserMessage';
import Header from './Header';
import ChatInput from './ChatInput';
import Sidebar from './Sidebar';
import Conversation from './Conversation';
import { ChangeEvent, useEffect, useState } from 'react';
import { getSessionChat } from '@/services/chatbot';
import { ChatMessage } from '@/types/api/ChatSessionHistory';
import { useParams } from 'react-router-dom';

function Main() {
  const { sessionId } = useParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getSessionChat(sessionId);
      setMessages(responseData);
    };
    fetchData();
  }, []);

  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <Conversation messages={messages} />
      <div className="d-flex justify-content-center chatbot-input-container">
        <ChatInput handleMessageData={addMessage} />
      </div>
    </div>
  );
}

export default Main;
