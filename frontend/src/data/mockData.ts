import type { Account, Transaction, User } from "../types";
import gtbank from "../assets/banks/GTBank.png";
import access from "../assets/banks/Access.png";
import fcmb from "../assets/banks/FCMB.png";
import firstbank from "../assets/banks/FirstBank.png";
import uba from "../assets/banks/UBA.png";
import kuda from "../assets/banks/Kuda.png";
import providus from "../assets/banks/Providus.png";

export const currentUser: User = {
  name: "Olamide",
  email: "Olamide.e@901.ui",
};

export const accounts: Account[] = [
  {
    id:"1",
    bankName:"GTBank",
    logo: gtbank,
    lastFour:"4521",
    availableBalance:250000,
  },
  {
    id:"2",
    bankName:"Access Bank",
    logo: access,
    lastFour:"9821",
    availableBalance:185000,
  },
  {
    id:"3",
    bankName:"Fcmb",
    logo: fcmb,
    lastFour:"1184",
    availableBalance:450000,
  },
  {
    id:"4",
    bankName:"First Bank",
    logo: firstbank,
    lastFour:"9032",
    availableBalance:120000,
  },
  {
    id:"5",
    bankName:"UBA",
    logo: uba,
    lastFour:"7762",
    availableBalance:82000,
  },
  {
    id:"6",
    bankName:"Kuda",
    logo: kuda,
    lastFour:"9824",
    availableBalance:175000,
  },
  {
    id:"7",
    bankName:"Providus",
    logo: providus,
    lastFour:"6621",
    availableBalance:93000,
  }
];

export const transactions: Transaction[] = [
  {
    id: "1",
    description: "Salary Payment",
    bank: "GTBank",
    logo: gtbank,
    date: "Today",
    amount: 250000,
    type: "income"
  },
  {
    id: "2",
    description: "Transfer to Sarah",
    bank: "GTBank",
    logo: gtbank,
    date: "Yesterday",
    amount: -25000,
    type: "transfer"
  },
  {
    id: "3",
    description: "Transfer to Sarah Johnson",
    bank: "Kuda",
    logo: kuda,
    date: "Jun 23",
    amount: -25000,
    type: "transfer"
  },
  {
    id: "4",
    description: "Grocery Shopping",
    bank: "Providus",
    logo: providus,
    date: "Jun 22",
    amount: -25000,
    type: "transfer"
  },
  {
    id: "5",
    description: "Grocery Shopping",
    bank: "Access",
    logo: access,
    date: "Jun 21",
    amount: 232000,
    type: "fund"
  }
];
