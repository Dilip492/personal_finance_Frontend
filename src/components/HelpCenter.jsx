import React, { useState} from 'react'
import {
    Search,
    CreditCard,
    DollarSign,
    Shield,
    HelpCircle,
    ChevronRight,
    Wallet,
    Receipt,
    Settings,
    MessageCircle,
    Phone,
    Mail
  } from 'lucide-react';

const HelpCenter = () => {

    const [searchQuery, setSearchQuery] = useState('');

  const commonQuestions = [
    { title: 'How do I link my bank account?', category: 'Account Setup' },
    { title: 'What are the transaction limits?', category: 'Transactions' },
    { title: 'How secure is my financial data?', category: 'Security' },
    { title: 'How to set up automatic payments?', category: 'Payments' }
  ];

  const categories = [
    { icon: Wallet, title: 'Account & Banking', count: 15 },
    { icon: CreditCard, title: 'Payments & Transfers', count: 12 },
    { icon: Receipt, title: 'Bills & Statements', count: 8 },
    { icon: Shield, title: 'Security & Privacy', count: 10 },
    { icon: Settings, title: 'Account Settings', count: 6 }
  ];

    return (
        <div>
            <div className='h-[80vh] w-[80wh] ml-60  items-cente'>
                <div className="min-h-screen bg-gray-50">
                    {/* Header Section */}
                    <div className="bg-emerald-600 text-white">
                        <div className="max-w-4xl mx-auto px-4 py-12">
                            <h1 className="text-3xl font-bold mb-4">How can we help you?</h1>

                            {/* Search Bar */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search for help..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-3 pl-12 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                                />
                                <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto px-4 py-12">
                        {/* Categories Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {categories.map((category) => (
                                <button
                                    key={category.title}
                                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-start space-x-4"
                                >
                                    <category.icon className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                                    <div className="flex-1 text-left">
                                        <h3 className="font-semibold mb-1">{category.title}</h3>
                                        <p className="text-sm text-gray-500">{category.count} articles</p>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Common Questions */}
                        <div className="bg-white rounded-xl shadow-sm p-6 mb-12">
                            <h2 className="text-xl font-semibold mb-6 flex items-center">
                                <HelpCircle className="w-6 h-6 text-emerald-600 mr-2" />
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-4">
                                {commonQuestions.map((question) => (
                                    <button
                                        key={question.title}
                                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors group"
                                    >
                                        <div className="flex flex-col items-start">
                                            <span className="font-medium group-hover:text-emerald-600 transition-colors">
                                                {question.title}
                                            </span>
                                            <span className="text-sm text-gray-500">{question.category}</span>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Contact Support */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-6 flex items-center">
                                <MessageCircle className="w-6 h-6 text-emerald-600 mr-2" />
                                Still Need Help?
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <button className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-100 hover:border-emerald-100 hover:bg-emerald-50 transition-colors">
                                    <Phone className="w-5 h-5 text-emerald-600" />
                                    <div className="text-left">
                                        <p className="font-medium">Call Support</p>
                                        <p className="text-sm text-gray-500">Available 24/7</p>
                                    </div>
                                </button>
                                <button className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-100 hover:border-emerald-100 hover:bg-emerald-50 transition-colors">
                                    <Mail className="w-5 h-5 text-emerald-600" />
                                    <div className="text-left">
                                        <p className="font-medium">Email Support</p>
                                        <p className="text-sm text-gray-500">Response within 24h</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HelpCenter
