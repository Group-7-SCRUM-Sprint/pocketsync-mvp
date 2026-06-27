import type { Account, Transaction, User } from "../types";

export const currentUser: User = {
  name: "Olamide",
  email: "Olamide.e@901.ui",
};

export const accounts: Account[] = [
  {
    id: "1",
    bankName: "GT Bank",
    lastFour: "3440",
    availableBalance: 255000,
    logoColor: "#E85D04",
    logoText: "GTBank",
    logoTextColor: "#fff",
  },
  {
    id: "2",
    bankName: "Access bank",
    lastFour: "3114",
    availableBalance: 125000,
    logoColor: "#E8B923",
    logoText: "access",
    logoTextColor: "#fff",
  },
  {
    id: "3",
    bankName: "OPay",
    lastFour: "3210",
    availableBalance: 70680.5,
    logoColor: "#4CAF50",
    logoText: "OPay",
    logoTextColor: "#fff",
  },
];

export const transactions: Transaction[] = [
  {
    id: "1",
    description: "Transfer to Sarah Johnson",
    bank: "GTBank",
    date: "Jun 24",
    amount: -15000,
    type: "transfer",
  },
  {
    id: "2",
    description: "Salary Payment",
    bank: "GTBank",
    date: "Jun 23",
    amount: 250000,
    type: "income",
  },
  {
    id: "3",
    description: "Grocery Shopping",
    bank: "Opay",
    date: "Jun 22",
    amount: -8500,
    type: "transfer",
  },
  {
    id: "4",
    description: "Refund From Store",
    bank: "Access",
    date: "Jun 21",
    amount: 5000,
    type: "fund",
  },
  {
    id: "5",
    description: "Refund From Store",
    bank: "Access",
    date: "Jun 21",
    amount: 5000,
    type: "fund",
  },
];
