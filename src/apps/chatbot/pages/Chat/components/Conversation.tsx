import React, { useEffect, useState } from 'react';
import UserMessage from './UserMessage';
import { getSessionChat } from '@/services/chatbot';
import { ChatMessage } from '@/types/api/ChatSessionHistory';

interface SenderType {
  sender: 'user' | 'bot';
}

interface ConversationProps {
  messages: ChatMessage[];
}

const NoMessages = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-75">
      <p className="text-center" style={{ fontSize: 50 }}>
        How Can I Help You Today
      </p>
    </div>
  );
};

const Messages: React.FC<ConversationProps> = ({ messages }) => {
  return (
    <div>
      {messages.map((item) => {
        return (
          <div className="mb-3">
            <UserMessage
              sender={item.sender === 1 ? 'user' : 'bot'}
              message={item.message}
            />
          </div>
        );
      })}
    </div>
  );
};

const Conversation: React.FC<ConversationProps> = ({ messages }) => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getSessionChat(
        '9e30449faa5343b8bd41387b2f4f76ae'
      );
      setData(responseData);
    };
    fetchData();
  }, []);

  return (
    <div className="d-flex justify-content-center chatbot-content-container">
      <div className="col-lg-8 col-md-9 col-sm-10 col-11">
        {messages.length > 0 ? (
          <Messages messages={messages} />
        ) : (
          <NoMessages />
        )}
      </div>
    </div>
  );
};

export default Conversation;
