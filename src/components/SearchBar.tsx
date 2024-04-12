import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchBar() {
  return (
    <div className="d-flex">
      <input type="text" className="form-control" placeholder="Search..." />
      <button className="button" style={{ marginLeft: '8px' }}>
        <FontAwesomeIcon icon={faSearch} className="fs-4" />
      </button>
    </div>
  );
}

export default SearchBar;
