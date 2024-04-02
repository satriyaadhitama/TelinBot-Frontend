import { useState } from 'react';
import TelkomselLogo from '@/assets/Telkomsel_2021_icon.svg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons/faBarsStaggered';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import {
  faFileInvoiceDollar,
  faRightFromBracket,
  faChartSimple,
} from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
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
        <a href="/dashboard/keuangan" className="sidebar-item">
          <FontAwesomeIcon
            icon={faFileInvoiceDollar}
            className="sidebar-icon"
          />
          <span>Keuangan</span>
        </a>
        <a href='/dashboard/faq' className="sidebar-item">
          <FontAwesomeIcon icon={faCircleQuestion} className="sidebar-icon" />
          <span>FAQ</span>
        </a>
      </div>
      <div className="sidebar-footer">
        <button className="button button-primary">
          <FontAwesomeIcon icon={faRightFromBracket} className="button-icon" />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
