import SearchBar from '@/components/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';

function Header() {
  return (
    <div className="dashboard-header">
      <div>
        <SearchBar />
      </div>
      <div className="d-flex align-items-center">
        <FontAwesomeIcon
          icon={faBell}
          className="icon-rounded fs-4 me-2"
        />
        <FontAwesomeIcon
          icon={faUser}
          className="icon-rounded bg-color-primary me-3"
        />
        <div className="d-flex flex-column">
          <span className="fs-rg">
            <strong>John Doe</strong>
          </span>
          <span className="fs-md-1 text-secondary">Admin</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
