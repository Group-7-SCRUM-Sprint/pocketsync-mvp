import React, { useState } from "react";
import "./BalanceCard.css";

interface BalanceCardProps {
  totalBalance: number;
  monthlyChange: number;
  linkedAccounts: number;
  lastSynced: string;
}

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <line
      x1="1"
      y1="1"
      x2="23"
      y2="23"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle
      cx="12"
      cy="12"
      r="3"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
);

const TrendUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <polyline
      points="23 6 13.5 15.5 8.5 10.5 1 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="17 6 23 6 23 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <polyline
      points="12 6 12 12 16 14"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const formatCurrency = (
  amount: number,
  hidden: boolean
): string => {
  if (hidden) return "₦ ••••••••";

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const BalanceCard: React.FC<BalanceCardProps> = ({
  totalBalance,
  monthlyChange,
  linkedAccounts,
  lastSynced,
}) => {
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);

  return (
    <div className="balance-card">
      <div className="balance-card__header">
        <span className="balance-card__label">Total Balance</span>

        <button
          className="balance-card__toggle"
          onClick={() => setIsBalanceHidden((prev) => !prev)}
          aria-label={
            isBalanceHidden ? "Show balance" : "Hide balance"
          }
        >
          {isBalanceHidden ? <EyeIcon /> : <EyeOffIcon />}
        </button>

        <div className="balance-card__stat">
          <span className="balance-card__stat-label">
            This Month
          </span>

          <span className="balance-card__stat-value positive">
            <TrendUpIcon />
            {isBalanceHidden
              ? "+₦ ••••••"
              : `+${new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(monthlyChange)}`}
          </span>
        </div>

        <div className="balance-card__stat">
          <span className="balance-card__stat-label">
            Accounts
          </span>

          <span className="balance-card__stat-value accounts">
            {linkedAccounts} linked
          </span>
        </div>
      </div>

      <div className="balance-card__amount">
        {formatCurrency(totalBalance, isBalanceHidden)}
      </div>

      <div className="balance-card__footer">
        <ClockIcon />
        <span>Last synced: {lastSynced}</span>
      </div>
    </div>
  );
};

export default BalanceCard;