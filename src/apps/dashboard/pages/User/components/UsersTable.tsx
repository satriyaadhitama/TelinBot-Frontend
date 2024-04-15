import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import ContentWrapper from '@/apps/dashboard/components/ContentWrapper';

type ActiveButtonState = 'allUsers' | 'online';

function UsersTable() {
  const [activeButton, setActiveButton] =
    useState<ActiveButtonState>('allUsers');
  const handleButtonClick = (buttonName: ActiveButtonState) => {
    setActiveButton(buttonName);
  };

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
            <tr className="table-row">
              <td>Mark</td>
              <td>Developer</td>
              <td>mark@email.com</td>
              <td>+628155013121</td>
              <td>Online</td>
            </tr>
            <tr className="table-row">
              <td>Mark</td>
              <td>Developer</td>
              <td>mark@email.com</td>
              <td>+628155013121</td>
              <td>Online</td>
            </tr>
            <tr className="table-row">
              <td>Mark</td>
              <td>Developer</td>
              <td>mark@email.com</td>
              <td>+628155013121</td>
              <td>
                <span className=" d-block ">Last Seen</span>
                <span>30d ago</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-end">
        <div className="d-flex align-content-center">
          <button className="button button-square-light">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div className="mx-3" style={{ padding: '7px 0px' }}>
            <span>1 of 10</span>
          </div>
          <button className="button button-square-light">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default UsersTable;
