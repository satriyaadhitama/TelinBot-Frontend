import React, { useEffect, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import ContentWrapper from '@/apps/dashboard/components/ContentWrapper';
import { getUsers } from '@/services/auth';
import { UserData } from '@/types/auth/User';
import { PaginatedNumberResponse } from '@/types/api/PaginatedNumberResponse';

type ActiveButtonState = 'allUsers' | 'online' | 'offline';

interface OnlineStatusProps {
  isOnline?: boolean;
  lastLogin: string | null;
}

const OnlineStatus: React.FC<OnlineStatusProps> = ({ isOnline, lastLogin }) => {
  if (isOnline) {
    return <div className="text-success">Online</div>;
  }
  return <div className="text-danger">Offline</div>;
};

function UsersTable() {
  const [data, setData] = useState<PaginatedNumberResponse<UserData[]>>();
  const [activeButton, setActiveButton] =
    useState<ActiveButtonState>('allUsers');
  const [page, setPage] = useState(1);

  const handleButtonClick = (buttonName: ActiveButtonState) => {
    setActiveButton(buttonName);
  };

  const nextPage = () => {
    if (data?.next) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (data?.previous) {
      setPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const statusMap = {
      online: true,
      offline: false,
      allUsers: undefined,
    };

    const fetchUsers = async () => {
      const isOnline = statusMap[activeButton]; // Directly use mapping, undefined if not matched
      const responseData = await getUsers(isOnline);
      setData(responseData);
    };

    fetchUsers();
  }, [activeButton]);

  return (
    <ContentWrapper title="USERS TABLE">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <button
            onClick={() => handleButtonClick('allUsers')}
            className={`button button-primary-1 mx-2 ${activeButton === 'allUsers' ? 'active' : ''}`}
          >
            All Users
          </button>
          <button
            onClick={() => handleButtonClick('online')}
            className={`button button-primary-1 mx-2 ${activeButton === 'online' ? 'active' : ''}`}
          >
            Online
          </button>
          <button
            onClick={() => handleButtonClick('offline')}
            className={`button button-primary-1 mx-2 ${activeButton === 'offline' ? 'active' : ''}`}
          >
            Offline
          </button>
        </div>
        <div style={{ maxWidth: '15rem' }}>
          <SearchBar />
        </div>
      </div>
      <div className="table-container mb-3">
        <table className="table" style={{ minWidth: '50rem' }}>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Position</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.results.map((item) => {
              return (
                <tr key={item.id} className="table-row">
                  <td>{item.last_name}</td>
                  <td>{item.position}</td>
                  <td>{item.email}</td>
                  <td>{item.phone_number}</td>
                  <td>
                    <OnlineStatus
                      isOnline={item.is_online}
                      lastLogin={item.last_login}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-start">
        <div className="d-flex align-content-center align-items-center">
          <button className="button button-rounded-light" onClick={prevPage}>
            <FontAwesomeIcon icon={faChevronLeft} fontSize={14} />
          </button>
          <div className="mx-3" style={{ padding: '7px 0px' }}>
            <span className="fw-bold" style={{ fontSize: 18 }}>
              {page}
            </span>
          </div>
          <button className="button button-rounded-light" onClick={nextPage}>
            <FontAwesomeIcon icon={faChevronRight} fontSize={14} />
          </button>
          <p className="mx-3 fst-italic">
            Page {page} of {data?.max_pages}
          </p>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default UsersTable;
