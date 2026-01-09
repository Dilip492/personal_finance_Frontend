import React, { useEffect, useState } from 'react'
import { Bell, Shield, CreditCard, DollarSign, Globe, Moon, Sun, ChevronRight, ToggleLeft as Toggle, Mail, Smartphone, Eye, EyeOff } from 'lucide-react';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    transactions: true
  });


  useEffect(()=>{
    const root = window.document.documentElement;
    if(darkMode){
      root.classList.add("dark");
    }else{
      root.classList.remove("dark")
    }
  },[darkMode])

  return (
    <div>
      <div className='h-[80vh] w-[80wh] ml-60  items-center'>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
          <div className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-2xl font-bold mb-8 dark:text-white ">Settings</h1>

            {/* Appearance */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm mb-6 divide-y divide-gray-100">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4 dark:text-white">Appearance</h2>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {darkMode ? <Moon className="w-5 h-5 text-gray-600 dark:text-white" /> : <Sun className="w-5 h-5 text-gray-600" />}
                    <span className='dark:text-white'>Dark Mode</span>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-12 h-6 rounded-full p-1 transition-colors ${darkMode ? 'bg-emerald-500' : 'bg-gray-200'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : ''}`}></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm mb-6">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold dark:text-white">Notifications</h2>
                  <Bell className="w-5 h-5 text-gray-500 dark:text-white" />
                </div>
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        {key === 'email' && <Mail className="w-5 h-5 text-gray-500 dark:text-white" />}
                        {key === 'push' && <Smartphone className="w-5 h-5 text-gray-500 dark:text-white" />}
                        {key === 'transactions' && <DollarSign className="w-5 h-5 text-gray-500 dark:text-white" />}
                        <span className="capitalize dark:text-white">{key} Notifications</span>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, [key]: !value })}
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${value ? 'bg-emerald-500' : 'bg-gray-200'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${value ? 'translate-x-6' : ''}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-xl shadow-sm mb-6 dark:bg-gray-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold dark:text-white">Security</h2>
                  <Shield className="w-5 h-5 text-gray-500 dark:text-white" />
                </div>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between py-2 hover:bg-gray-50 dark:hover:bg-black  rounded-lg transition-colors px-3">
                    <div className="flex items-center space-x-3">
                      <Eye className="w-5 h-5 text-gray-500 dark:text-white" />
                      <span className='dark:text-white'>Change Password</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 dark:text-white" />
                  </button>
                  <button className="w-full flex items-center justify-between py-2 hover:bg-gray-50 dark:hover:bg-black rounded-lg transition-colors px-3">
                    <div className="flex items-center space-x-3">
                      <Toggle className="w-5 h-5 text-gray-500 dark:text-white" />
                      <span className='dark:text-white'>Two-Factor Authentication</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 dark:text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow-sm mb-6 dark:bg-gray-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold dark:text-white">Payment Methods</h2>
                  <CreditCard className="w-5 h-5 text-gray-500 dark:text-white" />
                </div>
                <button className="w-full flex items-center justify-between py-2 hover:bg-gray-50 dark:hover:bg-black rounded-lg transition-colors px-3">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-gray-500 dark:text-white" />
                    <div className="flex flex-col items-start">
                      <span className='dark:text-white'>•••• •••• •••• 4242</span>
                      <span className="text-sm text-gray-500 dark:text-white">Expires 12/24</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 dark:text-white" />
                </button>
              </div>
            </div>

            {/* Region */}
            <div className="bg-white rounded-xl shadow-sm dark:bg-gray-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold dark:text-white">Region</h2>
                  <Globe className="w-5 h-5 text-gray-500 dark:text-white" />
                </div>
                <button className="w-full flex items-center justify-between py-2 hover:bg-gray-50 dark:hover:bg-black rounded-lg transition-colors px-3">
                  <div className="flex items-center space-x-3">
                    {/* <I className="w-5 h-5 text-gray-500" /> */}
                    <span className='dark:text-white'>India (INR)</span>

                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>


              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Settings
