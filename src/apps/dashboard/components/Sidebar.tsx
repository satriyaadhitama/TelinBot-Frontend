import TelkomselLogo from '@/assets/Telkomsel_2021_icon.svg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import {
  faFileInvoiceDollar,
  faRightFromBracket,
  faChartSimple,
} from '@fortawesome/free-solid-svg-icons';
import { useLogoutHandler } from '@/hooks/auth';


function Sidebar() {
  const logout = useLogoutHandler()
  
  return (
    <aside id="sidebar">
      <div className="sidebar-header">
        <a href="/dashboard" className="sidebar-logo">
          <img src={TelkomselLogo} alt="" className="sidebar-logo" />
        </a>
      </div>
      <div className="sidebar-link">
        <a href="/dashboard" className="sidebar-item">
          <FontAwesomeIcon icon={faChartSimple} className="sidebar-icon" />
          <span>Aktivitas</span>
        </a>
        <a href="/dashboard/finance" className="sidebar-item">
          <FontAwesomeIcon
            icon={faFileInvoiceDollar}
            className="sidebar-icon"
          />
          <span>Keuangan</span>
        </a>
        <a href='/dashboard/frequently-asked' className="sidebar-item">
          <FontAwesomeIcon icon={faCircleQuestion} className="sidebar-icon" />
          <span>FAQ</span>
        </a>
      </div>
      <div className="sidebar-footer">
        <button className="button button-primary" onClick={logout}>
          <FontAwesomeIcon icon={faRightFromBracket} className="button-icon" />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
