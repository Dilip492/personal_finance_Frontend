import React from 'react';
  



export function TransactionList() {

  const transactions  = [
    {
      id: '1',
      date: new Date('2023-12-29'),
      description: 'Salary',
      amount: 5000,
      type: 'income',
      category: 'Salary'
    },
    {
      id: '2',
      date: new Date('2023-12-28'),
      description: 'Groceries',
      amount: 150,
      type: 'expense',
      category: 'Food'
    },
    {
      id: '3',
      date: new Date('2023-12-27'),
      description: 'Internet Bill',
      amount: 80,
      type: 'expense',
      category: 'Utilities'
    }
  ];
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recent Transactions</h2>
        
      </div>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div 
            key={transaction.id}
            className="flex justify-between items-center p-4 border rounded-lg"
          >
            <div>
              <p className="font-semibold">{transaction.description}</p>
              <p className="text-sm text-gray-500">
                {transaction.date.toLocaleDateString()} • {transaction.category}
              </p>
            </div>
            <p className={`font-bold ${
              transaction.type === 'income' 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}