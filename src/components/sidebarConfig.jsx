import {
  Home,
  CreditCard,
  Target,
  ChartNoAxesCombined,
  Clipboard,
  Settings,
  HelpCircle,
  MessageCircleMore,
  Wallet

} from 'lucide-react';
import React from 'react';

export const mainLinks = [
  { icon: <Home size={20} />, label: 'Dashboard', location: "dashboard" },
  { icon: <CreditCard size={20} />, label: 'Transactions', location: "transactions" },
  { icon: <Target size={20} />, label: 'Budgets', location:"budget" },
  { icon: <ChartNoAxesCombined size={20} />, label: 'Financial Goal' , location:'financialgoal' },
  { icon: <Clipboard size={20} />, label: 'Reports' },
  { icon: <Wallet size={20} />, label: 'Accounts' ,location:"accounts" },
  { icon: <MessageCircleMore  size={20}/>, label: 'Finance AI' },
];

export const bottomLinks = [
  { icon: <HelpCircle size={20} />, label: 'Help Center',location:'helpcenter' },
  { icon: <Settings size={20} />, label: 'Settings' , location:'settings' },
];

