export interface Account {
  id: string;
  bankName: string;
  lastFour: string;
  availableBalance: number;
  logoColor: string;
  logoText: string;
  logoTextColor?: string;
}

export interface Transaction {
  id: string;
  description: string;
  bank: string;
  date: string;
  amount: number;
  type: "income" | "transfer" | "expense" | "fund";
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
}
