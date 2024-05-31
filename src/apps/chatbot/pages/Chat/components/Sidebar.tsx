import { useLogoutHandler } from '@/hooks/auth';
import { createNewSession, getAllChatHistory } from '@/services/chatbot';
import { RootState } from '@/types/auth/RootState';
import {
  faBars,
  faEllipsisH,
  faPencil,
  faSignOutAlt,
  faTrash,
  faUserCircle,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {
  ChangeEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface SidebarContentProps {
  isActive: boolean;
}

interface ChatHistoryData {
  id: string;
  title: string;
  scrollContainerRef: RefObject<HTMLDivElement>;
}

interface ModalActionProps {
  id: string;
  style: React.CSSProperties;
  onEditTitle: () => void;
}

const ModalAction: React.FC<ModalActionProps> = ({
  id,
  style,
  onEditTitle,
}) => {
  return (
    <div className="chat-history-modal-action" style={style}>
      <ul className="sidebar-modal">
        <li className="sidebar-modal-item" onClick={onEditTitle}>
          <FontAwesomeIcon icon={faPencil} />
          <span className="px-2">Change Title</span>
        </li>
        <li className="sidebar-modal-item">
          <FontAwesomeIcon icon={faTrash} className="text-danger" />
          <span className="text-danger px-2">Delete</span>
        </li>
      </ul>
    </div>
  );
};

const ChatHistoryBar: React.FC<ChatHistoryData> = ({
  id,
  title,
  scrollContainerRef,
}) => {
  const [isModalActionOpen, setIsModalActionOpen] = useState(false);
  const [modalStyle, setModalStyle] = useState<React.CSSProperties>({});
  const actionRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      actionRef.current &&
      !actionRef.current.contains(event.target as Node)
    ) {
      setIsModalActionOpen(false);
    }
  };

  const updateModalPosition = () => {
    if (parentRef.current && scrollContainerRef.current) {
      const parentRect = parentRef.current.getBoundingClientRect();
      const containerRect = scrollContainerRef.current.getBoundingClientRect();
      setModalStyle({
        position: 'fixed',
        top: parentRect.bottom - containerRect.top - 50,
        left: 235,
      });
    }
  };

  useEffect(() => {
    if (isModalActionOpen) {
      updateModalPosition();
      document.addEventListener('mousedown', handleClickOutside);
      scrollContainerRef.current?.addEventListener(
        'scroll',
        updateModalPosition
      );
      window.addEventListener('resize', updateModalPosition);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      scrollContainerRef.current?.removeEventListener(
        'scroll',
        updateModalPosition
      );
      window.removeEventListener('resize', updateModalPosition);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      scrollContainerRef.current?.removeEventListener(
        'scroll',
        updateModalPosition
      );
      window.removeEventListener('resize', updateModalPosition);
    };
  }, [isModalActionOpen]);

  const toggleModal = () => {
    setIsModalActionOpen(!isModalActionOpen);
  };

  const handleEditTitle = () => {
    setIsEditingTitle(true);
    setIsModalActionOpen(false); // Close the modal when editing starts
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleTitleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsEditingTitle(false);
      // Optionally update title in parent component or state if needed
    }
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    // Optionally update title in parent component or state if needed
  };

  return (
    <div
      ref={parentRef}
      className="d-flex justify-content-between align-items-center w-100 chat-history-container"
    >
      <a href={`/chatbot/${id}`} className="text-limit w-100">
        {isEditingTitle ? (
          <input
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            onKeyDown={handleTitleKeyDown}
            onBlur={handleTitleBlur} // Handle click outside input
            style={{ marginLeft: 50 }}
            autoFocus
          />
        ) : (
          <p className="text-start">{newTitle}</p>
        )}
      </a>
      <button className="button action-chat-history px-3" onClick={toggleModal}>
        <FontAwesomeIcon icon={faEllipsisH} />
      </button>
      {isModalActionOpen && (
        <div ref={actionRef}>
          <ModalAction
            id={id}
            style={modalStyle}
            onEditTitle={handleEditTitle}
          />
        </div>
      )}
    </div>
  );
};

const ChatHistory = () => {
  const { id } = useSelector((state: RootState) => state.auth.user);

  const [data, setData] = useState<ChatHistoryData[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getAllChatHistory(id);
      setData(responseData);
    };

    fetchData();
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="overflow-y-scroll"
      style={{ height: 660, msOverflowStyle: 'none', scrollbarWidth: 'none' }}
    >
      {data.map((item) => {
        return (
          <div className="mb-4" key={item.id}>
            <ChatHistoryBar
              id={item.id}
              title={item.title}
              scrollContainerRef={scrollContainerRef}
            />
          </div>
        );
      })}
    </div>
  );
};

const SidebarContent: React.FC<SidebarContentProps> = ({ isActive }) => {
  const { id, first_name, last_name } = useSelector(
    (state: RootState) => state.auth.user
  );

  const handleNewChatSession = async () => {
    const responseData = await createNewSession(id);
    const sessionId = await responseData.detail.session_id;

    navigate(`/chatbot/${sessionId}`);
    window.location.reload();
  };

  const logout = useLogoutHandler();

  return (
    <div
      className={`d-flex flex-column chatbot-sidebar-content px-4 py-2 ${isActive ? 'active' : ''}`}
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
      <div className="w-100 mb-4">
        <ChatHistory />
      </div>
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="text-light"
            style={{ fontSize: 28 }}
          />
          <p
            className="text-light px-3 fst-italic"
            style={{ fontSize: 18, fontWeight: 600 }}
          >
            {first_name} {last_name}
          </p>
        </div>
        <button className="button d-flex align-items-center" onClick={logout}>
          <FontAwesomeIcon
            icon={faSignOutAlt}
            className="text-light"
            style={{ fontSize: 18, marginRight: 5 }}
          />
          <span className="text-light">Sign Out</span>
        </button>
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
      >
        asd
      </div>
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
