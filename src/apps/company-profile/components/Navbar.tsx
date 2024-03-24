import imageLogo from '@/assets/Telkomsel_2021_icon.svg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top nav company-container">
      <div className="container-fluid" style={{ padding: 0 }}>
        <a
          className="navbar-brand text-light pb-2"
          href="/"
          style={{ paddingRight: '2rem' }}
        >
          <img
            src={imageLogo}
            alt="Logo"
            height="30px"
            className="d-inline-block align-text-top mx-1"
          />
          <span className="nav-brand">PT. Telekomunikasi Indonesia</span>
        </a>
        <button
          className="navbar-toggler button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={faBars} className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="navbar-nav">
            <a href="/" className="nav-link p-2">
              Beranda
            </a>
            <a href="/" className="nav-link p-2">
              Organisasi
            </a>
            <a href="/" className="nav-link p-2">
              Laporan
            </a>
          </div>
          <div className="nav-auth-container ms-auto">
            <div className="navbar-nav">
              <a href="/sign-in" className="login-link">
                MASUK
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
