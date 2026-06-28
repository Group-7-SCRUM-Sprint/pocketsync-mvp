import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import BalanceCard from "./BalanceCard";
import AccountCard, { LinkAccountCard } from "./AccountCard";
import TransactionItem from "./TransactionItem";
import { accounts, transactions, currentUser } from "../../data/mockData";
import type { Account } from "../../types";
import "./Dashboard.css";

import brandLogo from "../../assets/logo.svg";


import gtbank from "../../assets/banks/gtbank.png";
import access from "../../assets/banks/access.png";
import fcmb from "../../assets/banks/fcmb.png";
import firstbank from "../../assets/banks/firstbank.png";
import uba from "../../assets/banks/uba.png";
import kuda from "../../assets/banks/kuda.png";
import providus from "../../assets/banks/providus.png";



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

const bankLogos: Record<string, string> = {
  "GTBank": gtbank,
  "Access Bank": access,
  "Fcmb": fcmb,
  "First Bank": firstbank,
  "UBA": uba,
  "Kuda": kuda,
  "Providus": providus,
};

// Resolve bank logo by exact or fuzzy match; fallback to app brand logo
const getLogoForBank = (name?: string) => {
  if (!name) return brandLogo;
  if (bankLogos[name]) return bankLogos[name];
  const lower = name.toLowerCase();
  for (const key in bankLogos) {
    const k = key.toLowerCase();
    if (k.includes(lower) || lower.includes(k)) {
      return bankLogos[key];
    }
  }
  return brandLogo;
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");
  const [search, setSearch] = useState("");
  
  // Dynamic State for Mock Data
  const [user, setUser] = useState(currentUser);
  const [allAccounts, setAllAccounts] = useState(accounts);
  const [allTransactions, setAllTransactions] = useState(transactions);
  
  // Navigation & Modals Toggles
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  
  // Filters, Confirmations & Drawer
  const [selectedAccountFilter, setSelectedAccountFilter] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [accountToUnlink, setAccountToUnlink] = useState<Account | null>(null);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "GT Bank connected successfully.", time: "1 hour ago", read: false },
    { id: 2, text: "Opay account balance synced.", time: "3 hours ago", read: true },
    { id: 3, text: "Salary payment of ₦250,000 received.", time: "1 day ago", read: true }
  ]);

  // Bank Linking Wizard State
  const [linkStep, setLinkStep] = useState(1); // 1: Credentials, 2: OTP
  const [selectedBankName, setSelectedBankName] = useState("");
  const [linkAppId, setLinkAppId] = useState("");
  const [linkPin, setLinkPin] = useState("");
  const [linkOtp, setLinkOtp] = useState("");

  // Transfer Form State
  const [transferSource, setTransferSource] = useState("");
  const [transferTargetBank, setTransferTargetBank] = useState("GT Bank");
  const [transferAccountNumber, setTransferAccountNumber] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [transferNarration, setTransferNarration] = useState("");
  const [recipientName, setRecipientName] = useState("");

  // Request Form State
  const [requestAmount, setRequestAmount] = useState("");
  const [requestTargetAccount, setRequestTargetAccount] = useState("");
  const [generatedRequestLink, setGeneratedRequestLink] = useState("");

  // FAQ Accordion State
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  // Settings State
  const [settingsName, setSettingsName] = useState(user.name);
  const [settingsEmail, setSettingsEmail] = useState(user.email);
  const [settingsMfa, setSettingsMfa] = useState(true);
  const [settingsAlerts, setSettingsAlerts] = useState(true);
  const [authorizedApps, setAuthorizedApps] = useState([
    { name: "PocketSync Mobile App", scope: "Read & Write" },
    { name: "Mono Open Banking Interface", scope: "Read Only" }
  ]);

  // Support Form State
  const [supportSubject, setSupportSubject] = useState("");
  const [supportMessage, setSupportMessage] = useState("");

  const triggerToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const totalBalance = allAccounts.reduce((sum, a) => sum + a.availableBalance, 0);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const handleAccountClick = (account: Account) => {
    if (selectedAccountFilter === account.bankName) {
      setSelectedAccountFilter(null);
      triggerToast("Cleared account filter");
    } else {
      setSelectedAccountFilter(account.bankName);
      triggerToast(`Filtering by ${account.bankName}`);
    }
  };

  const handleAction = (action: string) => {
    if (action === "Transfer") {
      if (allAccounts.length === 0) {
        triggerToast("Please link an account first to make a transfer.");
        return;
      }
      setTransferSource(allAccounts[0].id);
      setShowTransferModal(true);
    } else if (action === "Request") {
      if (allAccounts.length === 0) {
        triggerToast("Please link an account first to receive funds.");
        return;
      }
      setRequestTargetAccount(allAccounts[0].id);
      setShowRequestModal(true);
    } else if (action === "View All") {
      setShowAllTransactions(true);
    } else if (action === "Notifications") {
      setShowNotifications(!showNotifications);
    } else {
      triggerToast(`${action} flow coming soon!`);
    }
  };

  const handleAccountNumberChange = (val: string) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 10);
    setTransferAccountNumber(cleaned);
    
    if (cleaned.length === 10) {
      const mockNames = [
        "Chinedu Okeke", "Olumide Awosika", "Fatima Abubakar", 
        "Tunde Folawiyo", "Sarah Adeleke", "Emeka Nwosu"
      ];
      const index = parseInt(cleaned.slice(-1)) % mockNames.length;
      setRecipientName(mockNames[index]);
    } else {
      setRecipientName("");
    }
  };

  const executeTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(transferAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      triggerToast("Please enter a valid amount.");
      return;
    }
    
    const sourceAcc = allAccounts.find(a => a.id === transferSource);
    if (!sourceAcc) return;
    
    if (sourceAcc.availableBalance < amountNum) {
      triggerToast("Insufficient funds in selected account.");
      return;
    }
    
    // Deduct balance
    setAllAccounts(prev => prev.map(acc => {
      if (acc.id === transferSource) {
        return { ...acc, availableBalance: acc.availableBalance - amountNum };
      }
      return acc;
    }));
    
    // Add transaction
    const newTx = {
      id: String(allTransactions.length + 1),
      description: `Transfer to ${recipientName || transferAccountNumber} (${transferTargetBank})`,
      bank: sourceAcc.bankName,
      logo: sourceAcc.logo,
      date: "Today",
      amount: -amountNum,
      type: "transfer" as const,
    };
    
    setAllTransactions(prev => [newTx, ...prev]);
    
    // Add system notification
    const newNotification = {
      id: Date.now(),
      text: `Debit of ₦${amountNum.toLocaleString()} from ${sourceAcc.bankName} successful.`,
      time: "Just now",
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
    
    setShowTransferModal(false);
    triggerToast("Transfer completed successfully!");
    
    setTransferAmount("");
    setTransferAccountNumber("");
    setTransferNarration("");
    setRecipientName("");
  };

  const generateRequestLink = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(requestAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      triggerToast("Please enter a valid amount.");
      return;
    }
    
    const targetAcc = allAccounts.find(a => a.id === requestTargetAccount);
    if (!targetAcc) return;
    
    const mockId = Math.random().toString(36).substring(2, 8);
    const link = `https://pocketsync.ng/pay/req_${mockId}`;
    setGeneratedRequestLink(link);
    triggerToast("Payment request link generated!");
  };

  const startLinkBank = (bankName: string) => {
    setSelectedBankName(bankName);
    setLinkStep(1);
    setLinkAppId("");
    setLinkPin("");
    setLinkOtp("");
  };

  const executeBankCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkAppId || !linkPin) {
      triggerToast("Please enter your Bank App ID and PIN.");
      return;
    }
    setLinkStep(2);
    triggerToast("OTP code sent to your registered phone number!");
  };

  const executeBankOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkOtp) {
      triggerToast("Please enter the verification OTP.");
      return;
    }
    
    const bankLogo = getLogoForBank(selectedBankName);
    
    const randomBalance = Math.floor(Math.random() * 450000) + 50000;
    const randomLastFour = Math.floor(Math.random() * 9000) + 1000;
    
    const newAccount: Account = {
      id: String(allAccounts.length + 1),
      bankName: selectedBankName,
      logo: bankLogo || brandLogo,
      lastFour: String(randomLastFour),
      availableBalance: randomBalance,
    };
    
    setAllAccounts(prev => [...prev, newAccount]);
    
    const newTx = {
      id: String(allTransactions.length + 1),
      description: "Account Linked Balance Sync",
      bank: selectedBankName,
      logo: newAccount.logo,
      date: "Today",
      amount: randomBalance,
      type: "income" as const,
    };
    setAllTransactions(prev => [newTx, ...prev]);
    
    const newNotification = {
      id: Date.now(),
      text: `${selectedBankName} account ending in ••••${randomLastFour} successfully linked.`,
      time: "Just now",
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
    
    setSelectedBankName("");
    setLinkStep(1);
    setShowLinkModal(false);
    triggerToast(`${newAccount.bankName} linked successfully!`);
  };

  const executeUnlinkAccount = () => {
    if (!accountToUnlink) return;
    
    setAllAccounts(prev => prev.filter(acc => acc.id !== accountToUnlink.id));
    setAllTransactions(prev => prev.filter(tx => tx.bank !== accountToUnlink.bankName));
    
    if (selectedAccountFilter === accountToUnlink.bankName) {
      setSelectedAccountFilter(null);
    }
    
    const newNotification = {
      id: Date.now(),
      text: `Disconnected ${accountToUnlink.bankName} account ending in ••••${accountToUnlink.lastFour}.`,
      time: "Just now",
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
    
    triggerToast(`Disconnected ${accountToUnlink.bankName} successfully.`);
    setAccountToUnlink(null);
  };

  const executeSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name: settingsName,
      email: settingsEmail
    }));
    triggerToast("Profile updated successfully!");
  };

  const handleMfaToggle = () => {
    setSettingsMfa(!settingsMfa);
    triggerToast(`Multi-Factor Authentication ${!settingsMfa ? "enabled" : "disabled"}`);
  };

  const handleAlertsToggle = () => {
    setSettingsAlerts(!settingsAlerts);
    triggerToast(`Transaction alerts ${!settingsAlerts ? "enabled" : "disabled"}`);
  };

  const handleRevokeApp = (appName: string) => {
    setAuthorizedApps(prev => prev.filter(app => app.name !== appName));
    triggerToast(`Revoked access for ${appName}`);
  };

  const executeSubmitSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportSubject || !supportMessage) {
      triggerToast("Please fill out all fields.");
      return;
    }
    triggerToast("Support ticket sent! We will contact you soon.");
    setSupportSubject("");
    setSupportMessage("");
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    triggerToast("All notifications marked as read");
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getFilteredTransactions = () => {
    let list = allTransactions;
    if (selectedAccountFilter) {
      list = list.filter(t => t.bank.toLowerCase() === selectedAccountFilter.toLowerCase());
    }
    if (search) {
      list = list.filter(t => 
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.bank.toLowerCase().includes(search.toLowerCase())
      );
    }
    return list;
  };

  const filteredAccounts = allAccounts.filter((a) =>
    a.bankName.toLowerCase().includes(search.toLowerCase())
  );

  // Subview Layout Renderers
  const renderDashboardView = () => {
    const dashboardTxs = getFilteredTransactions().slice(0, 5);
    const dashboardAccs = allAccounts.slice(0, 4);
    
    return (
      <>
        {/* Greeting + actions */}
        <div className="dashboard-hero">
          <div>
            <p className="hero-greeting">{getGreeting()}</p>
            <h1 className="hero-name">Hello, {user.name}</h1>
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
          linkedAccounts={allAccounts.length}
          lastSynced="Just now"
        />

        {/* Selected filter tag */}
        {selectedAccountFilter && (
          <div className="filter-badge">
            <span>Showing only <strong>{selectedAccountFilter}</strong> activity</span>
            <button onClick={() => setSelectedAccountFilter(null)} className="filter-badge__clear">✕</button>
          </div>
        )}

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
              {dashboardAccs.map((account) => (
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
              {dashboardTxs.length > 0 ? (
                dashboardTxs.map((t) => (
                  <TransactionItem key={t.id} transaction={t} />
                ))
              ) : (
                <p className="no-results">No transactions found</p>
              )}
            </div>
          </section>
        </div>
      </>
    );
  };

  const renderAccountsView = () => {
    return (
      <div className="accounts-view-container">
        <div className="view-header">
          <h1 className="view-title">Linked Accounts</h1>
          <p className="view-desc">Add or remove connections to your Nigerian banking and fintech platforms.</p>
        </div>

        <div className="accounts-detailed-list">
          {filteredAccounts.map((account) => (
            <div key={account.id} className="account-row-card">
              <div className="account-row-card__logo">

            <img
              src={account.logo}
              alt={account.bankName}
              className="bank-logo"
            />
          </div>

              <div className="account-row-card__info">
                <h3 className="account-row-card__bank">{account.bankName}</h3>
                <p className="account-row-card__number">•••• {account.lastFour} • Savings</p>
              </div>
              <div className="account-row-card__balance">
                <span className="account-row-card__balance-label">Available Balance</span>
                <h2 className="account-row-card__balance-amount">
                  ₦{account.availableBalance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                </h2>
              </div>
              <div className="account-row-card__actions">
                <button 
                  className="unlink-btn"
                  onClick={() => setAccountToUnlink(account)}
                >
                  Disconnect
                </button>
              </div>
            </div>
          ))}

          <div className="account-row-card link-new-row" onClick={() => setShowLinkModal(true)}>
            <div className="link-new-row__icon">+</div>
            <div className="link-new-row__text">
              <h3>Link a New Financial Account</h3>
              <p>Secure connection to GTBank, Access, Opay, Kuda, Moniepoint & more.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAnalyticsView = () => {
    return (
      <div className="analytics-view-container">
        <div className="view-header">
          <h1 className="view-title">Spending Analytics</h1>
          <p className="view-desc">Understand your cash flow and spending distribution across all accounts.</p>
        </div>

        <div className="analytics-grid">
          {/* Cash Flow Card */}
          <div className="analytics-card chart-card">
            <h3 className="card-subtitle">Monthly Cash Flow</h3>
            <div className="mock-bar-chart">
              <div className="chart-bar-group">
                <div className="chart-bar-container">
                  <div className="chart-bar income animate-height" style={{ height: "80%" }}>
                    <span className="bar-val">₦250k</span>
                  </div>
                  <div className="chart-bar expense animate-height" style={{ height: "45%" }}>
                    <span className="bar-val">₦115k</span>
                  </div>
                </div>
                <span className="bar-label">Jun</span>
              </div>
              <div className="chart-bar-group">
                <div className="chart-bar-container">
                  <div className="chart-bar income animate-height" style={{ height: "65%" }}>
                    <span className="bar-val">₦210k</span>
                  </div>
                  <div className="chart-bar expense animate-height" style={{ height: "55%" }}>
                    <span className="bar-val">₦140k</span>
                  </div>
                </div>
                <span className="bar-label">May</span>
              </div>
              <div className="chart-bar-group">
                <div className="chart-bar-container">
                  <div className="chart-bar income animate-height" style={{ height: "90%" }}>
                    <span className="bar-val">₦280k</span>
                  </div>
                  <div className="chart-bar expense animate-height" style={{ height: "30%" }}>
                    <span className="bar-val">₦95k</span>
                  </div>
                </div>
                <span className="bar-label">Apr</span>
              </div>
            </div>
            <div className="chart-legend">
              <span className="legend-item"><span className="legend-dot income"></span> Income</span>
              <span className="legend-item"><span className="legend-dot expense"></span> Spending</span>
            </div>
          </div>

          {/* Breakdown Card */}
          <div className="analytics-card breakdown-card">
            <h3 className="card-subtitle">Spending by Category</h3>
            <div className="categories-breakdown">
              <div className="category-row">
                <div className="category-meta">
                  <span>Transfers & Remittance</span>
                  <strong>₦65,000 (56%)</strong>
                </div>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill fill-transfers" style={{ width: "56%" }}></div>
                </div>
              </div>
              <div className="category-row">
                <div className="category-meta">
                  <span>Food & Groceries</span>
                  <strong>₦25,000 (22%)</strong>
                </div>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill fill-food" style={{ width: "22%" }}></div>
                </div>
              </div>
              <div className="category-row">
                <div className="category-meta">
                  <span>Airtime & Utilities</span>
                  <strong>₦15,000 (13%)</strong>
                </div>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill fill-utilities" style={{ width: "13%" }}></div>
                </div>
              </div>
              <div className="category-row">
                <div className="category-meta">
                  <span>Subscriptions & Entertainment</span>
                  <strong>₦10,000 (9%)</strong>
                </div>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill fill-subs" style={{ width: "9%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insights Panel */}
        <div className="analytics-insight-banner">
          <div className="insight-icon">💡</div>
          <div className="insight-text">
            <strong>Spending Alert:</strong> You spent 12% less on Food & Groceries compared to May. However, your Transfers category remains high due to recent peer-to-peer transfers.
          </div>
        </div>
      </div>
    );
  };

  const renderSettingsView = () => {
    return (
      <div className="settings-view-container">
        <div className="view-header">
          <h1 className="view-title">Settings</h1>
          <p className="view-desc">Configure your personal information, security options, and connected APIs.</p>
        </div>

        <div className="settings-grid">
          {/* Edit Profile */}
          <div className="settings-card">
            <h3 className="settings-card-title">Personal Profile</h3>
            <form onSubmit={executeSaveProfile} className="settings-form">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  value={settingsName} 
                  onChange={(e) => setSettingsName(e.target.value)} 
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  value={settingsEmail} 
                  onChange={(e) => setSettingsEmail(e.target.value)} 
                  className="form-input"
                  required
                />
              </div>
              <button type="submit" className="save-btn">Save Profile Changes</button>
            </form>
          </div>

          {/* Security & Alerts */}
          <div className="settings-card">
            <h3 className="settings-card-title">Security & Alerts</h3>
            <div className="toggles-list">
              <div className="toggle-row">
                <div className="toggle-info">
                  <strong>Multi-Factor Authentication (MFA)</strong>
                  <p>Require verification codes on login attempts.</p>
                </div>
                <label className="switch">
                  <input type="checkbox" checked={settingsMfa} onChange={handleMfaToggle} />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="toggle-row">
                <div className="toggle-info">
                  <strong>Transaction SMS/Email Alerts</strong>
                  <p>Send instant notifications for any balance changes.</p>
                </div>
                <label className="switch">
                  <input type="checkbox" checked={settingsAlerts} onChange={handleAlertsToggle} />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Connected Apps */}
          <div className="settings-card full-width-card">
            <h3 className="settings-card-title">Authorized Apps & Integrations</h3>
            <div className="apps-list">
              {authorizedApps.map((app) => (
                <div key={app.name} className="app-item">
                  <div className="app-item__details">
                    <strong>{app.name}</strong>
                    <p>Permissions: {app.scope}</p>
                  </div>
                  <button className="revoke-btn" onClick={() => handleRevokeApp(app.name)}>Revoke Access</button>
                </div>
              ))}
              {authorizedApps.length === 0 && (
                <p className="no-apps-text">No apps currently authorized.</p>
              )}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="settings-card full-width-card danger-zone">
            <h3 className="settings-card-title text-danger">Danger Zone</h3>
            <p className="danger-desc">Logging out or deleting your dashboard configuration will reset all mock data syncs.</p>
            <div className="danger-actions">
              <button className="logout-action-btn" onClick={() => navigate("/")}>Log Out</button>
              <button 
                className="delete-data-btn" 
                onClick={() => {
                  setAllAccounts([]);
                  setAllTransactions([]);
                  setSelectedAccountFilter(null);
                  triggerToast("Deleted all synced data.");
                }}
              >
                Reset Synced Data
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHelpView = () => {
    const faqs = [
      { q: "Is PocketSync secure?", a: "Yes, PocketSync uses secure, read-only mock integrations simulating bank-level OAuth/Open Banking protocols. We never store actual bank login passwords." },
      { q: "How do I sync multiple bank accounts?", a: "Go to the 'Accounts' tab, click 'Link a New Financial Account', select your Nigerian bank (GTBank, Zenith, Opay, etc.), and verify with a simulated OTP." },
      { q: "Can I perform transfers between mock accounts?", a: "Yes! Click the 'Transfer' button on the main Dashboard to perform mock peer-to-peer transfers that dynamically adjust your account balance." },
      { q: "How often are transaction logs updated?", a: "Transactions are updated in real-time as you complete mock transfers or link new financial accounts." }
    ];

    return (
      <div className="help-view-container">
        <div className="view-header">
          <h1 className="view-title">Help & Support</h1>
          <p className="view-desc">Find answers to common questions about PocketSync or contact support.</p>
        </div>

        <div className="help-grid">
          {/* FAQs Accordion */}
          <div className="help-card faqs-card">
            <h3 className="card-subtitle">Frequently Asked Questions</h3>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div key={index} className={`faq-item ${faqOpenIndex === index ? "open" : ""}`}>
                  <button className="faq-question" onClick={() => setFaqOpenIndex(faqOpenIndex === index ? null : index)}>
                    <span>{faq.q}</span>
                    <span className="faq-arrow">{faqOpenIndex === index ? "▲" : "▼"}</span>
                  </button>
                  {faqOpenIndex === index && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="help-card contact-card">
            <h3 className="card-subtitle">Send a message to Support</h3>
            <form onSubmit={executeSubmitSupport} className="help-contact-form">
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input 
                  type="text" 
                  value={supportSubject} 
                  onChange={(e) => setSupportSubject(e.target.value)} 
                  className="form-input"
                  placeholder="How can we help you?"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Message Details</label>
                <textarea 
                  value={supportMessage} 
                  onChange={(e) => setSupportMessage(e.target.value)} 
                  className="form-textarea"
                  placeholder="Explain your inquiry in detail..."
                  rows={4}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-support-btn">Submit Inquiry</button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-shell">
      <Sidebar user={user} activePage={activePage} onNavigate={setActivePage} />

      <main className="dashboard-main">
        {/* Mobile Header */}
        <div className="mobile-header">
          <div className="mobile-header__logo">
            <img
              src={brandLogo}
              alt="PocketSync"
              className="mobile-brand-logo"
            />
          </div>
          <div className="mobile-header__actions">
            <button className="mobile-header__btn" onClick={() => handleAction("Notifications")} aria-label="Notifications">
              <BellIcon />
              {unreadCount > 0 && <span className="bell-dot" />}
            </button>
            <div className="mobile-header__avatar">
              {user.name.charAt(0)}
            </div>
          </div>
        </div>

        {/* Topbar */}
        <header className="dashboard-topbar">
          <div className="search-bar">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ color: "#9b9bb4" }}>
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.8" />
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search transactions or banks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <button className="bell-btn" onClick={() => handleAction("Notifications")} aria-label="Notifications">
            <BellIcon />
            {unreadCount > 0 && <span className="bell-dot" />}
          </button>

          {showNotifications && (
            <div className="notifications-dropdown">
              <div className="notifications-header">
                <strong>Notifications</strong>
                {unreadCount > 0 && (
                  <button onClick={handleMarkAllRead} className="mark-read-btn">Mark all read</button>
                )}
              </div>
              <div className="notifications-dropdown-list">
                {notifications.map(n => (
                  <div key={n.id} className={`notification-item ${n.read ? "read" : "unread"}`}>
                    <p className="notification-text">{n.text}</p>
                    <span className="notification-time">{n.time}</span>
                  </div>
                ))}
                {notifications.length === 0 && (
                  <p className="no-notifications">No new updates.</p>
                )}
              </div>
            </div>
          )}
        </header>

        {/* Toast notification */}
        {notification && (
          <div className="toast">{notification}</div>
        )}

        <div className="dashboard-content">
          {activePage === "dashboard" && renderDashboardView()}
          {activePage === "accounts" && renderAccountsView()}
          {activePage === "analytics" && renderAnalyticsView()}
          {activePage === "settings" && renderSettingsView()}
          {activePage === "help" && renderHelpView()}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-nav">
        <button
          className={`mobile-nav__item ${activePage === "dashboard" ? "mobile-nav__item--active" : ""}`}
          onClick={() => setActivePage("dashboard")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
          </svg>
          <span>Dashboard</span>
        </button>
        <button
          className={`mobile-nav__item ${activePage === "accounts" ? "mobile-nav__item--active" : ""}`}
          onClick={() => setActivePage("accounts")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
          <span>Accounts</span>
        </button>
        <button
          className={`mobile-nav__item ${activePage === "analytics" ? "mobile-nav__item--active" : ""}`}
          onClick={() => setActivePage("analytics")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 20V10M12 20V4M6 20v-6" />
          </svg>
          <span>Analytics</span>
        </button>
        <button
          className={`mobile-nav__item ${activePage === "settings" ? "mobile-nav__item--active" : ""}`}
          onClick={() => setActivePage("settings")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          <span>Settings</span>
        </button>
      </nav>

      {/* Link Account Modal Wizard */}
      {showLinkModal && (
        <div className="modal-overlay" onClick={() => {
          setShowLinkModal(false);
          setSelectedBankName("");
          setLinkStep(1);
        }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {!selectedBankName ? (
              <>
                <h3 className="modal-title">Link a New Account</h3>
                <p className="modal-desc">
                  Connect your Nigerian bank account securely via open banking.
                </p>
                <div className="modal-banks">
                  {["GT Bank", "Access Bank", "Zenith Bank", "First Bank", "UBA", "OPay", "Kuda", "Moniepoint"].map((bank) => (
                    <button
                      key={bank}
                      className="modal-bank-btn"
                      onClick={() => startLinkBank(bank)}
                    >
                      {bank}
                    </button>
                  ))}
                </div>
                <button className="modal-close" onClick={() => setShowLinkModal(false)}>
                  Cancel
                </button>
              </>
            ) : linkStep === 1 ? (
              <form onSubmit={executeBankCredentialsSubmit} className="link-credentials-form">
                <h3 className="modal-title">Connect {selectedBankName}</h3>
                <p className="modal-desc">Enter your Mobile Number or App ID and PIN.</p>
                <div className="form-group">
                  <label className="form-label">Bank App ID / Mobile Number</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 08012345678" 
                    value={linkAppId} 
                    onChange={(e) => setLinkAppId(e.target.value)} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">PIN</label>
                  <input 
                    type="password" 
                    className="form-input" 
                    maxLength={6} 
                    placeholder="••••••" 
                    value={linkPin} 
                    onChange={(e) => setLinkPin(e.target.value)} 
                    required 
                  />
                </div>
                <div className="modal-actions-grid">
                  <button type="button" className="modal-back-btn" onClick={() => setSelectedBankName("")}>Back</button>
                  <button type="submit" className="modal-submit-btn">Send OTP Code</button>
                </div>
              </form>
            ) : (
              <form onSubmit={executeBankOtpSubmit} className="link-otp-form">
                <h3 className="modal-title">Verify OTP</h3>
                <p className="modal-desc">A verification OTP has been sent to your phone. (Enter <strong>1234</strong> for demo).</p>
                <div className="form-group">
                  <label className="form-label">One-Time Password (OTP)</label>
                  <input 
                    type="text" 
                    className="form-input text-center font-bold tracking-widest" 
                    maxLength={4} 
                    placeholder="0000" 
                    value={linkOtp} 
                    onChange={(e) => setLinkOtp(e.target.value)} 
                    required 
                  />
                </div>
                <div className="modal-actions-grid">
                  <button type="button" className="modal-back-btn" onClick={() => setLinkStep(1)}>Back</button>
                  <button type="submit" className="modal-submit-btn confirm-connect-btn">Verify & Connect</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Transfer Modal */}
      {showTransferModal && (
        <div className="modal-overlay" onClick={() => setShowTransferModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Make a Transfer</h3>
            <form onSubmit={executeTransfer} className="transfer-form">
              <div className="form-group">
                <label className="form-label">Source Account</label>
                <select 
                  className="form-select"
                  value={transferSource}
                  onChange={(e) => setTransferSource(e.target.value)}
                  required
                >
                  {allAccounts.map(acc => (
                    <option key={acc.id} value={acc.id}>
                      {acc.bankName} (•••• {acc.lastFour}) - ₦{acc.availableBalance.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Destination Bank</label>
                <select 
                  className="form-select"
                  value={transferTargetBank}
                  onChange={(e) => setTransferTargetBank(e.target.value)}
                  required
                >
                  {["GT Bank", "Access Bank", "Zenith Bank", "First Bank", "UBA", "OPay", "Kuda", "Moniepoint"].map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Account Number (10 digits)</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="0123456789"
                  value={transferAccountNumber}
                  onChange={(e) => handleAccountNumberChange(e.target.value)}
                  required
                />
              </div>
              {recipientName && (
                <div className="recipient-preview-badge">
                  Recipient Name: <strong>{recipientName}</strong>
                </div>
              )}
              <div className="form-group">
                <label className="form-label">Amount (₦)</label>
                <input 
                  type="number" 
                  className="form-input"
                  placeholder="0.00"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Narration (Optional)</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="Rent, utilities, family sync..."
                  value={transferNarration}
                  onChange={(e) => setTransferNarration(e.target.value)}
                />
              </div>
              <div className="modal-actions-grid">
                <button type="button" className="modal-back-btn" onClick={() => setShowTransferModal(false)}>Cancel</button>
                <button type="submit" className="modal-submit-btn confirm-transfer-btn">Confirm Transfer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Request Payment Modal */}
      {showRequestModal && (
        <div className="modal-overlay" onClick={() => {
          setShowRequestModal(false);
          setGeneratedRequestLink("");
          setRequestAmount("");
        }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Request Payment</h3>
            <p className="modal-desc">Create a payment request link that can be shared to receive funds into your account.</p>
            <form onSubmit={generateRequestLink} className="request-form">
              <div className="form-group">
                <label className="form-label">Deposit Account</label>
                <select 
                  className="form-select"
                  value={requestTargetAccount}
                  onChange={(e) => setRequestTargetAccount(e.target.value)}
                  required
                >
                  {allAccounts.map(acc => (
                    <option key={acc.id} value={acc.id}>
                      {acc.bankName} (•••• {acc.lastFour})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Amount to Request (₦)</label>
                <input 
                  type="number" 
                  className="form-input"
                  placeholder="0.00"
                  value={requestAmount}
                  onChange={(e) => setRequestAmount(e.target.value)}
                  required
                />
              </div>
              {!generatedRequestLink ? (
                <button type="submit" className="confirm-request-btn">Generate Payment Link</button>
              ) : (
                <div className="generated-link-box">
                  <p className="generated-link-label">Your Shareable Payment Request Link:</p>
                  <input type="text" className="link-textbox" value={generatedRequestLink} readOnly />
                  <button 
                    type="button" 
                    className="copy-link-btn"
                    onClick={() => {
                      navigator.clipboard.writeText(generatedRequestLink);
                      triggerToast("Payment link copied to clipboard!");
                    }}
                  >
                    Copy Link
                  </button>
                </div>
              )}
              <button type="button" className="modal-close" onClick={() => {
                setShowRequestModal(false);
                setGeneratedRequestLink("");
                setRequestAmount("");
              }} style={{ marginTop: "12px" }}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Unlink Confirmation Modal */}
      {accountToUnlink && (
        <div className="modal-overlay" onClick={() => setAccountToUnlink(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title text-danger">Disconnect Account</h3>
            <p className="modal-desc" style={{ marginBottom: "16px" }}>
              Are you sure you want to disconnect your <strong>{accountToUnlink.bankName}</strong> account ending in ••••{accountToUnlink.lastFour}? This will hide your balance and filter its transactions.
            </p>
            <div className="modal-actions-grid">
              <button className="modal-back-btn" onClick={() => setAccountToUnlink(null)}>Cancel</button>
              <button className="confirm-delete-btn" onClick={executeUnlinkAccount}>Disconnect</button>
            </div>
          </div>
        </div>
      )}

      {/* View All Transactions Modal */}
      {showAllTransactions && (
        <div className="modal-overlay" onClick={() => setShowAllTransactions(false)}>
          <div className="modal transactions-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <h3 className="modal-title">Recent Activity History</h3>
              <button className="close-x-btn" onClick={() => setShowAllTransactions(false)}>✕</button>
            </div>
            <div className="modal-transactions-scroll">
              {getFilteredTransactions().length > 0 ? (
                getFilteredTransactions().map((t) => (
                  <TransactionItem key={t.id} transaction={t} />
                ))
              ) : (
                <p className="no-results">No transactions found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
