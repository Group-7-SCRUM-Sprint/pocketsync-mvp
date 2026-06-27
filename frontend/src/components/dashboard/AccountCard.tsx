import React from "react";
import type { Account } from "../../types";
import "./AccountCard.css";

interface AccountCardProps {
  account: Account;
  onClick: (account: Account) => void;
}

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AccountCard: React.FC<AccountCardProps> = ({ account, onClick }) => {
  const formatBalance = (amount: number) =>
    `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="account-card" onClick={() => onClick(account)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onClick(account)}>
      <div className="account-card__header">
        <div className="account-card__logo" style={{ background: account.logoColor }}>
          <span style={{ color: account.logoTextColor || "#fff", fontSize: "9px", fontWeight: 800 }}>
            {account.logoText}
          </span>
        </div>
        <div className="account-card__info">
          <p className="account-card__bank">{account.bankName}</p>
          <p className="account-card__last4">•••• {account.lastFour}</p>
        </div>
        <ChevronRight />
      </div>
      <div className="account-card__balance-row">
        <span className="account-card__balance-label">Available Balance</span>
        <span className="account-card__balance">{formatBalance(account.availableBalance)}</span>
      </div>
    </div>
  );
};

interface LinkAccountCardProps {
  onLink: () => void;
}

export const LinkAccountCard: React.FC<LinkAccountCardProps> = ({ onLink }) => (
  <div className="account-card account-card--link" onClick={onLink} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onLink()}>
    <div className="link-account__icon">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 5v14M5 12h14" stroke="#5B5FC7" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
    <p className="link-account__label">Link Account</p>
  </div>
);

export default AccountCard;
