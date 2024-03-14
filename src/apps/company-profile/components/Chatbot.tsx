import { useState, createContext, useContext } from 'react';
import botIcon from '@/assets/chatbot-icon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';

interface ChatBoxTogglerContextData {
  toggleChatBox: () => void;
}

interface LiveChatContextData {
  toggleLiveChat: () => void;
}

const ChatBoxTogglerContext = createContext<ChatBoxTogglerContextData>({
  toggleChatBox: () => {},
});

const LiveChatContext = createContext<LiveChatContextData>({
  toggleLiveChat: () => {},
});

const UserChatForm = () => {
  
  return (
    <div className="d-flex flex-column">
      <p className="text-center">
        Selamat Datang di livechat Telkomsel.
        <br />
        Mohon Isi data diri anda di bawah ini:
      </p>
      <form action="">
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Nama" />
        </div>
        <div className="mb-3">
          <input type="email" className="form-control" placeholder="Email" />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Saya menyetujui ketentuan dan persyaratan
          </label>
        </div>
      </form>
      <button className="button button-primary">Mulai Livechat</button>
    </div>
  );
};

const Chat = () => {
  return <div>Chat</div>;
};

const ChatBox = () => {
  const { toggleChatBox } = useContext(ChatBoxTogglerContext);
  const [isChatStarted, setIsChatStarted] = useState(false);

  const toggleLiveChat = () => {
    setIsChatStarted((prev) => (prev ? false : true));
  };

  return (
    <div className="chatbox container shadow">
      <div className="chatbox header d-flex align-items-center justify-content-between border-bottom p-2">
        <div className="d-flex align-items-center">
          <img src={botIcon} alt="chat-bot-icon" style={{ height: '30px' }} />
          <span className="mx-2" style={{ fontWeight: 600 }}>
            TelinBot
          </span>
        </div>
        <button className="button" onClick={toggleChatBox}>
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
      <div className="chatbox content p-2">
        <LiveChatContext.Provider value={{ toggleLiveChat }}>
          {!isChatStarted ? <UserChatForm /> : <Chat />}
        </LiveChatContext.Provider>
      </div>
    </div>
  );
};

const ChatAction = () => {
  const { toggleChatBox } = useContext(ChatBoxTogglerContext);
  return (
    <button className="button chat-action shadow p-3" onClick={toggleChatBox}>
      <FontAwesomeIcon icon={faCommentDots} />
    </button>
  );
};

function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChatBox = () => {
    setIsChatOpen((prev) => (prev ? false : true));
  };

  return (
    <ChatBoxTogglerContext.Provider value={{ toggleChatBox }}>
      <div className="pop-up-chat m-4">
        {!isChatOpen ? <ChatAction /> : <ChatBox />}
      </div>
    </ChatBoxTogglerContext.Provider>
  );
}

export default Chatbot;
