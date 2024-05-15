import { createNewSession, getAllChatHistory } from '@/services/chatbot';
import { RootState } from '@/types/auth/RootState';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface SidebarContentProps {
  isActive: boolean;
}

interface ChatHistoryData {
  id: string;
  title: string;
}

const ChatHistoryBar: React.FC<ChatHistoryData> = ({ id, title }) => {
  return (
    <a href={`/chatbot/${id}`} className="button w-100 chat-history-container">
      <p className=" text-start">{title}</p>
    </a>
  );
};

const ChatHistory = () => {
  const { id } = useSelector((state: RootState) => state.auth.user);

  const [data, setData] = useState<ChatHistoryData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getAllChatHistory(id);
      setData(responseData);
    };

    fetchData();
  }, []);

  return (
    <>
      {data.map((item) => {
        return (
          <div className="mb-3" key={item.id}>
            <ChatHistoryBar id={item.id} title={item.title} />
          </div>
        );
      })}
    </>
  );
};

const SidebarContent: React.FC<SidebarContentProps> = ({ isActive }) => {
  const { id } = useSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();

  const handleNewChatSession = async () => {
    const responseData = await createNewSession(id);
    const sessionId = await responseData.detail.session_id;

    navigate(`/chatbot/${sessionId}`);
    window.location.reload();
  };

  return (
    <div
      className={`chatbot-sidebar-content px-3 py-2 ${isActive ? 'active' : ''}`}
    >
      <div className="mb-5">
        <button
          className="button text-light w-100"
          style={{ fontSize: 22 }}
          onClick={handleNewChatSession}
        >
          + New Chat
        </button>
      </div>
      <div>
        <p className="text-light mb-4">History</p>
        <div className="w-100">
          <ChatHistory />
        </div>
      </div>
    </div>
  );
};

function Sidebar() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const activateSidebar = () => {
    setIsSidebarActive(true);
  };
  const deactivateSidebar = () => {
    setIsSidebarActive(false);
  };

  return (
    <div
      className={`d-flex chatbot-sidebar-container ${isSidebarActive ? 'active' : ''}`}
    >
      <SidebarContent isActive={isSidebarActive} />
      <div
        className={`chatbot-sidebar-overlay ${isSidebarActive ? 'active' : ''}`}
        onClick={deactivateSidebar}
      ></div>
      <div className="sidebar-button-active-container">
        {!isSidebarActive ? (
          <button
            className="button"
            onClick={activateSidebar}
            style={{ padding: '0.8rem' }}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        ) : (
          <button
            className="button"
            onClick={deactivateSidebar}
            style={{ padding: '0.8rem' }}
          >
            <FontAwesomeIcon icon={faX} className="text-light" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
