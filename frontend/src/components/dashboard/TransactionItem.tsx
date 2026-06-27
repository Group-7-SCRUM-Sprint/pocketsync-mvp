import React from "react";
import type { Transaction } from "../../types";
import "./TransactionItem.css";

interface TransactionItemProps {
  transaction: Transaction;
}

const OutArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M17 7L7 17M7 17h10M7 17V7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const typeConfig: Record<Transaction["type"], { bg: string; color: string; label: string; isOut: boolean }> = {
  transfer: { bg: "#fff0f0", color: "#e53e3e", label: "Transfer", isOut: true },
  income: { bg: "#f0fff4", color: "#38a169", label: "Income", isOut: false },
  expense: { bg: "#fff0f0", color: "#e53e3e", label: "Expense", isOut: true },
  fund: { bg: "#f0fff4", color: "#38a169", label: "Fund", isOut: false },
};

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const config = typeConfig[transaction.type];
  const isPositive = transaction.amount > 0;
  const formatted = `${isPositive ? "+" : "-"}₦${Math.abs(transaction.amount).toLocaleString("en-NG")}.00`;

  return (
    <div className="txn-item">
      <div
        className="txn-item__icon"
        style={{ background: config.bg, color: config.color }}
      >
        {config.isOut ? <OutArrow /> : <InArrow />}
      </div>
      <div className="txn-item__info">
        <p className="txn-item__desc">{transaction.description}</p>
        <p className="txn-item__meta">{transaction.bank} • {transaction.date}</p>
      </div>
      <div className="txn-item__right">
        <span
          className="txn-item__amount"
          style={{ color: isPositive ? "#38a169" : "#e53e3e" }}
        >
          {formatted}
        </span>
        <span className="txn-item__type">{config.label}</span>
      </div>
    </div>
  );
};

export default TransactionItem;
