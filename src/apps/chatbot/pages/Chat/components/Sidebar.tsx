import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

interface SidebarContentProps {
  isActive: boolean;
}

interface ChatHistoryBarProps {
  id: number;
  title: string;
}

const ChatHistoryBar: React.FC<ChatHistoryBarProps> = ({ id, title }) => {
  return (
    <button className="button w-100 chat-history-container">
      <p className=" text-start">{title}</p>
    </button>
  );
};

const ChatHistory = () => {
  return (
    <>
      <div className="mb-3">
        <ChatHistoryBar id={1} title="What is CDN?" />
      </div>
      <div className="mb-3">
        <ChatHistoryBar id={2} title="Keuntungan Bulan Ini" />
      </div>
    </>
  );
};

const SidebarContent: React.FC<SidebarContentProps> = ({ isActive }) => {
  return (
    <div
      className={`chatbot-sidebar-content px-3 py-2 ${isActive ? 'active' : ''}`}
    >
      <div className="mb-5">
        <button className="button text-light w-100" style={{ fontSize: 22 }}>
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
    <div className="d-flex chatbot-sidebar-container">
      <SidebarContent isActive={isSidebarActive} />
      <div
        className={`chatbot-sidebar-overlay ${isSidebarActive ? 'active' : ''}`}
        onClick={deactivateSidebar}
      ></div>
      <div
        className={`sidebar-button-active-container ${isSidebarActive ? 'active' : ''}`}
      >
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
