import React, { useState } from "react";
import Sidebar from "./Sidebar";
import BalanceCard from "./BalanceCard";
import AccountCard, { LinkAccountCard } from "./AccountCard";
import TransactionItem from "./TransactionItem";
import { accounts, transactions, currentUser } from "../../data/mockData";
import type { Account } from "../../types";
import "./Dashboard.css";

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RequestIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M17 7L7 17M7 17h10M7 17V7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TransferIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const totalBalance = accounts.reduce((sum, a) => sum + a.availableBalance, 0);

const Dashboard: React.FC = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const handleAccountClick = (account: Account) => {
    setNotification(`Viewing ${account.bankName} (••••${account.lastFour})`);
    setTimeout(() => setNotification(null), 2500);
  };

  const handleAction = (action: string) => {
    setNotification(`${action} flow coming soon!`);
    setTimeout(() => setNotification(null), 2500);
  };

  const filteredTransactions = transactions.filter((t) =>
    t.description.toLowerCase().includes(search.toLowerCase()) ||
    t.bank.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-shell">
      <Sidebar user={currentUser} activePage={activePage} onNavigate={setActivePage} />

      <main className="dashboard-main">
        {/* Topbar */}
        <header className="dashboard-topbar">
          <div className="search-bar">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ color: "#9b9bb4" }}>
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.8" />
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Placeholder"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <button className="bell-btn" aria-label="Notifications">
            <BellIcon />
            <span className="bell-dot" />
          </button>
        </header>

        {/* Toast notification */}
        {notification && (
          <div className="toast">{notification}</div>
        )}

        <div className="dashboard-content">
          {/* Greeting + actions */}
          <div className="dashboard-hero">
            <div>
              <p className="hero-greeting">{getGreeting()}</p>
              <h1 className="hero-name">Hello, {currentUser.name}</h1>
            </div>
            <div className="hero-actions">
              <button className="action-btn action-btn--outline" onClick={() => handleAction("Request")}>
                <RequestIcon /> Request
              </button>
              <button className="action-btn action-btn--outline" onClick={() => handleAction("Transfer")}>
                <TransferIcon /> Transfer
              </button>
              <button className="action-btn action-btn--icon" onClick={() => handleAction("More options")}>
                <PlusIcon />
              </button>
            </div>
          </div>

          {/* Balance card */}
          <BalanceCard
            totalBalance={totalBalance}
            monthlyChange={255000}
            linkedAccounts={accounts.length}
            lastSynced="Just now"
          />

          {/* Bottom grid */}
          <div className="dashboard-grid">
            {/* Accounts */}
            <section className="accounts-section">
              <div className="section-header">
                <h2 className="section-title">My Accounts</h2>
                <button className="section-link" onClick={() => setActivePage("accounts")}>
                  Manage all
                </button>
              </div>
              <div className="accounts-grid">
                {accounts.map((account) => (
                  <AccountCard
                    key={account.id}
                    account={account}
                    onClick={handleAccountClick}
                  />
                ))}
                <LinkAccountCard onLink={() => setShowLinkModal(true)} />
              </div>
            </section>

            {/* Transactions */}
            <section className="transactions-section">
              <div className="section-header">
                <h2 className="section-title">Recent Activity</h2>
                <button className="section-link" onClick={() => handleAction("View All")}>
                  View All
                </button>
              </div>
              <div className="transactions-list">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((t) => (
                    <TransactionItem key={t.id} transaction={t} />
                  ))
                ) : (
                  <p className="no-results">No transactions match "{search}"</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Link Account Modal */}
      {showLinkModal && (
        <div className="modal-overlay" onClick={() => setShowLinkModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Link a New Account</h3>
            <p className="modal-desc">
              Connect your Nigerian bank account securely via open banking.
            </p>
            <div className="modal-banks">
              {["GT Bank", "Access Bank", "Zenith Bank", "First Bank", "UBA", "OPay"].map((bank) => (
                <button
                  key={bank}
                  className="modal-bank-btn"
                  onClick={() => {
                    setShowLinkModal(false);
                    setNotification(`Linking ${bank}... (demo mode)`);
                    setTimeout(() => setNotification(null), 2500);
                  }}
                >
                  {bank}
                </button>
              ))}
            </div>
            <button className="modal-close" onClick={() => setShowLinkModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
