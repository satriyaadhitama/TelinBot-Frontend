import { sendMessage } from '@/services/chatbot';
import { Message } from '@/types/api/ChatSessionHistory';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

interface ChatInputProps {
  handleMessage: (message: Message) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ handleMessage }) => {
  const { sessionId } = useParams();
  const [messageInput, setMessageInput] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessageInput(event.target.value);
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleSend = async () => {
    setMessageInput('');
    handleMessage({ sender: 1, message: messageInput });

    // Wait for 0.5 seconds
    // await delay(500);

    const responseData = await sendMessage(messageInput, sessionId);
    const botReply = responseData.detail.reply;
    handleMessage({ sender: botReply.sender, message: botReply.message });
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
