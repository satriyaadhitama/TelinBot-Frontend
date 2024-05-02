import { faBars, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function Header() {
  return (
    <div className="fixed-top chatbot-header">
      <div className="d-flex border-bottom border-2 px-4 py-2 justify-content-between">
        <div className="flex-grow-1 d-flex justify-content-center">
          <h4>Telinbot</h4>
        </div>
      </div>
    </div>
  );
}

export default Header;
