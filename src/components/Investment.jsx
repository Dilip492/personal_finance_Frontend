import React from "react";
import { TrendingUp, BarChart, DollarSign, HandCoins } from "lucide-react";

export function Investment() {
  const investments = [
    { name: "Stocks", amount: 5000, icon: <TrendingUp className="text-blue-500" /> },
    { name: "Real Estate", amount: 12000, icon: <BarChart className="text-green-500" /> },
    { name: "Crypto", amount: 3500, icon: <DollarSign className="text-orange-500" /> },
    { name: "Mutual Fund", amount: 4500, icon: <HandCoins className="text-yellow-400" /> },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-[20wh]">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        Investments
      </h2>
      <ul className="space-y-3">
        {investments.map((investment) => (
          <li
            key={investment.name}
            className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm hover:shadow-md transition-shadow border"
          >
            <div className="flex items-center gap-3">
              {investment.icon}
              <span className="font-medium text-gray-700">{investment.name}</span>
            </div>
            <span className="font-semibold text-gray-800">${investment.amount.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
