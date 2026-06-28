
import type { User } from "../../types";
import "./Sidebar.css";

import brandLogo from "../../assets/logo.svg";

interface SidebarProps {
  user: User;
  activePage: string;
  onNavigate: (page: string) => void;
}

const DashboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="1" y="1" width="7" height="7" rx="1.5" fill="currentColor" />
    <rect x="10" y="1" width="7" height="7" rx="1.5" fill="currentColor" />
    <rect x="1" y="10" width="7" height="7" rx="1.5" fill="currentColor" />
    <rect x="10" y="10" width="7" height="7" rx="1.5" fill="currentColor" />
  </svg>
);

const AccountsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="1" y="3" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M1 7h16" stroke="currentColor" strokeWidth="1.5" />
    <rect x="3" y="10" width="4" height="2" rx="0.5" fill="currentColor" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M2 14l4-5 3 3 4-6 3 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.22 3.22l1.41 1.41M13.37 13.37l1.41 1.41M3.22 14.78l1.41-1.41M13.37 4.63l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const HelpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6.5 6.5a2.5 2.5 0 015 0c0 2-2.5 2-2.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="9" cy="13" r="0.75" fill="currentColor" />
  </svg>
);

const GearIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="3" stroke="#4E61F6" strokeWidth="1.5" />
    <path d="M11 2v2M11 18v2M2 11h2M18 11h2M4.22 4.22l1.41 1.41M16.37 16.37l1.41 1.41M4.22 17.78l1.41-1.41M16.37 5.63l1.41-1.41" stroke="#4E61F6" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M7 3H3a1 1 0 00-1 1v10a1 1 0 001 1h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 5l4 4-4 4M16 9H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: DashboardIcon },
  { id: "accounts", label: "Accounts", badge: 3, icon: AccountsIcon },
  { id: "analytics", label: "Analytics", icon: AnalyticsIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ user, activePage, onNavigate }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img
          src={brandLogo}
          alt="PocketSync"
          className="sidebar-brand-logo"
        />
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ id, label, badge, icon: Icon }) => (
          <button
            key={id}
            className={`nav-item ${activePage === id ? "nav-item--active" : ""}`}
            onClick={() => onNavigate(id)}
          >
            <Icon />
            <span>{label}</span>
            {badge && <span className="nav-badge">{badge}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-promo">
        <div className="promo-icon">
          <GearIcon />
        </div>
        <p className="promo-title">Manage Your Accounts</p>
        <p className="promo-desc">
          You can disconnect any account anytime. Your data is protected with bank-level security.
        </p>
        <a href="#" className="promo-link">Security Settings →</a>
      </div>

      <div className="sidebar-bottom">
        <button
          className={`nav-item ${activePage === "settings" ? "nav-item--active" : ""}`}
          onClick={() => onNavigate("settings")}
        >
          <SettingsIcon />
          <span>Settings</span>
        </button>
        <button
          className={`nav-item ${activePage === "help" ? "nav-item--active" : ""}`}
          onClick={() => onNavigate("help")}
        >
          <HelpIcon />
          <span>Help</span>
        </button>
      </div>

      <div className="sidebar-user">
        <div className="user-avatar">
          {user.name.charAt(0)}
        </div>
        <div className="user-info">
          <p className="user-name">{user.name}</p>
          <p className="user-email">{user.email}</p>
        </div>
        <button className="logout-btn" title="Log out">
          <LogoutIcon />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
