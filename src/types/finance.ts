export interface Transaction {
    id: string;
    date: Date;
    description: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
  }
  
  export interface Budget {
    id: string;
    category: string;
    limit: number;
    spent: number;
  }
  
  export interface FinancialSummary {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
    budgets: Budget[];
  }