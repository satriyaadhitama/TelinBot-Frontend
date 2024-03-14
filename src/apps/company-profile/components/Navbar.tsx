import imageLogo from '@/assets/Telkomsel_2021_icon.svg.png';

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
          <span className="nav-brand">
            PT. Telekomunikasi Indonesia
          </span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarContent"
          style={{ height: '0px' }}
        >
          <div className="navbar-nav">
            <a href="/" className="nav-link p-2">
              Beranda
            </a>
            <a href="/" className="nav-link p-2">
              Layanan
            </a>
            <a href="/" className="nav-link p-2">
              Tentang Kami
            </a>
            <a href="/" className="nav-link p-2">
              Kontak
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
