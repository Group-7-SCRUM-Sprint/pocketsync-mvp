export interface Account {
  id: string;
  bankName: string;
  logo: string;
  lastFour: string;
  availableBalance: number;
}

export interface Transaction {
  id: string;
  description: string;
  bank: string;
  logo: string;
  date: string;
  amount: number;
  type: "income" | "transfer" | "expense" | "fund";
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
}
