import React from 'react';

interface BubbleChatProps {
  message: string;
  time: string;
  type: 'sender' | 'receiver';
}

const BubbleChat: React.FC<BubbleChatProps> = ({ message, time, type }) => {
  return (
    <div className={`bubble-${type} d-flex flex-column mb-3`}>
      <span className="bubble-text-message">{message}</span>
      <span className="bubble-time align-self-end ">{time}</span>
    </div>
  );
};

function ChatConversation() {
  return (
    <div className="border conversation">
      <BubbleChat
        message="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore odit quaerat tempore eius possimus dignissimos corrupti vitae consequuntur? Tempore facilis fuga mollitia officia incidunt quisquam aut ipsam id ex distinctio!
"
        time="16:00pm"
        type="receiver"
      />
      <BubbleChat
        message="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore odit quaerat tempore eius possimus dignissimos corrupti vitae consequuntur? Tempore facilis fuga mollitia officia incidunt quisquam aut ipsam id ex distinctio!
"
        time="16:00pm"
        type="sender"
      />
      <BubbleChat
        message="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore odit quaerat tempore eius possimus dignissimos corrupti vitae consequuntur? Tempore facilis fuga mollitia officia incidunt quisquam aut ipsam id ex distinctio!
"
        time="16:00pm"
        type="sender"
      />
    </div>
  );
}

export default ChatConversation;
