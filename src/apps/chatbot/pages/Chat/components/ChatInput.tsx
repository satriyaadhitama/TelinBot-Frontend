import { sendMessage } from '@/services/chatbot';
import { ChatMessage } from '@/types/api/ChatSessionHistory';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

interface ChatInputProps {
  handleMessageData: (message: ChatMessage) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ handleMessageData }) => {
  const { sessionId } = useParams();
  const [messageInput, setMessageInput] = useState('');
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessageInput(event.target.value);
  };

  const handleSend = async () => {
    const responseData = await sendMessage(messageInput, sessionId);
    const sentMessage = responseData.detail.send;
    const repliedMessage = responseData.detail.reply;
    handleMessageData(sentMessage);
    handleMessageData(repliedMessage);
    setMessageInput('');
  };

  return (
    <div className="col-lg-8 col-md-9 col-sm-10 col-11 my-3">
      <div className="d-flex align-items-center">
        <input
          type="text"
          placeholder="Type Message to Telinbot..."
          className="form-control chatbot-input"
          value={messageInput}
          onChange={handleInputChange}
        />
        <button
          className="button button-primary chatbot-input-send"
          onClick={handleSend}
        >
          <FontAwesomeIcon icon={faPaperPlane} className="" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
