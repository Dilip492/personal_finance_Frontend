import React, { useEffect, useState } from 'react';
import { AlertCircle, DollarSign, PiggyBank, CreditCard, MoreHorizontal, ArrowUpRight, ArrowDownRight, PlusCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';
import API_ENDPOINTS from '../config/apiConfig';
import toast, { Toaster } from 'react-hot-toast';
import { useFinance } from '../Context/FinanceContextProvider';





const pieData = [
  { name: 'Housing', value: 35 },
  { name: 'Food', value: 25 },
  { name: 'Transport', value: 20 },
  { name: 'Entertainment', value: 15 },
  { name: 'Others', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];


const Dashboard2 = () => {
  const { addTransactions, Totalincome, Totalexpense, fetchExpense, fetchIncome, savings, expenseArr, incomeArr, monthlySummaries, GetTrans, recentTransactions, budgetFormdata, getBudget } = useFinance();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showCategoryPopup, setshowCategoryPopup] = useState(false);


  const [popupType, setPopupType] = useState("");



  console.log("income", incomeArr);
  console.log("expense", expenseArr);

  console.log("recent transactions array", recentTransactions)


  // const handleformsubmitincome = async (data) => {

  //   console.log(data)
  //   setShowPopup(false)

  //   try {
  //     const response = await fetch(API_ENDPOINTS.ADD_INCOME, {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       method: "POST",
  //       credentials: 'include',
  //       body: JSON.stringify(data),

  //     },)

  //     const dataincome = await response.json();

  //     if (response.ok) {
  //       // console.log(reicevedata)
  //       toast.success(dataincome.message)
  //       addTransactions(dataincome.data);
  //       fetchIncome();

  //     } else {
  //       toast.error("Not added income due to some error occurs...")
  //     }

  //   } catch (error) {
  //     console.log(error)
  //     toast.error(error)
  //   }



  // }

  // const handleformsubmitexpense = async (data) => {

  //   console.log("expense data ", data)
  //   setShowPopup(false)
  //   try {
  //     const response = await fetch(API_ENDPOINTS.ADD_EXPENSE, {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       method: 'POST',
  //       credentials: 'include',
  //       body: JSON.stringify(data)
  //     });

  //     const dataExpense = await response.json();

  //     if (response.ok) {
  //       toast.success(dataExpense.message);
  //       addTransactions(dataExpense.data);
  //       fetchExpense();

  //     } else {
  //       toast.error("Not added expense due to some error occurs !")
  //     }

  //   } catch (error) {
  //     console.log(error)
  //     toast.error(error)

  //   }

  // }




  const [categories, setCategories] = useState([]);
  const [reloadCategories, setReloadCategories] = useState(false);


  useEffect(() => {
    fetch(API_ENDPOINTS.GET_CATEGORY,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        credentials: "include",
      }
    )
      .then(res => res.json())
      .then(data => setCategories(data));



  }, [reloadCategories]);

  console.log("show categories", categories)

  const handleformsubmit = async (data) => {
    console.log("Form Data:", data);
    setShowPopup(false);

    try {
      // Decide API endpoint based on type
      const endpoint =
        data.type === "income"
          ? API_ENDPOINTS.ADD_INCOME
          : API_ENDPOINTS.ADD_EXPENSE;

      const response = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success(responseData.message);

        // Update transactions list
        addTransactions(responseData.data);

        // Call respective fetch function
        if (data.type === "income") {
          fetchIncome();
        } else {
          fetchExpense();
        }
      } else {
        toast.error("Not added due to some error occurs...");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };



  const calculateProgress = (startDate, endDate) => {
    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();
    const currentTime = Date.now();

    if (isNaN(startTime) || isNaN(endTime)) {
      console.error("Invalid date format");
      return 0;
    }

    if (endTime <= startTime) {
      console.error("End date must be after start date");
      return 0;
    }

    if (currentTime < startTime) return 0;
    if (currentTime > endTime) return 100;

    const progress = ((currentTime - startTime) / (endTime - startTime)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const getProgressColor = (progress) => {
    if (progress < 20) return 'bg-red-500';
    if (progress < 50) return 'bg-yellow-500';
    if (progress < 80) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStatusText = (progress) => {
    if (progress < 20) return 'At Risk';
    if (progress < 50) return 'Behind Schedule';
    if (progress < 80) return 'On Track';
    return 'Completed';
  };



  const handleclose = () => {
    setShowPopup(false)
    setshowCategoryPopup(false)
  }

  const handleclick = () => {
    // setPopupType(type)
    setShowPopup(true)

  }

  const handleCategoryclick = () => { setshowCategoryPopup(true) }

  const handleCategorySubmit = async (data) => {

    setshowCategoryPopup(false)

    try {

      const response = await fetch(API_ENDPOINTS.ADD_CATEGORY, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success("category added successfully");

        // Update transactions list
        // addTransactions(responseData.data);

        // showCategoryPopup(false)

        setReloadCategories(prev => !prev);

      } else {
        toast.error("Not added due to some error occurs...");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }


  }



  useEffect(() => {
    GetTrans();
    getBudget();
  }, [])

  return (

    <>

     {/* it is show for the mobile  */}

      <div className="flex flex-col items-center justify-center h-screen p-6 text-center md:hidden">
        <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl  border border-gray-100 dark:border-gray-600">
          <div className="text-6xl mb-4">🖥️</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Desktop View Recommended
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Our financial dashboard contains complex charts and data tables optimized for larger screens.
            Please switch to a laptop or PC for the full experience.
          </p>
        </div>
      </div>
      <div className='h-[80vh] w-[80wh] ml-60  '>

        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        {
          showPopup && <Popup
            onclose={handleclose}
            title="Add Transaction"
            fields={[
              { id: "type", type: "select", label: "Type", options: ["income", "expense"] },
              { id: "source", type: "text", label: "Source (for income)", placeholder: "Enter Source Name" },
              { id: "description", type: "text", label: "Description (for expense)", placeholder: "Enter Description" },
              { id: "amount", type: "number", label: "Amount", placeholder: "Enter amount" },
              { id: "category", type: "select", label: "Category", options: categories }, // backend categories
              { id: "date", type: "date", label: "Date", placeholder: "Select Date" },
            ]}
            buttonText="Add"
            onSubmit={handleformsubmit} // single handler for both
          />
        }

        {showCategoryPopup && (
          <Popup
            onclose={handleclose}
            title="Add Category"
            fields={[
              { id: "name", type: "text", label: "Category Name", placeholder: "Enter category name" },
              { id: "type", type: "select", label: "Type", options: ["income", "expense"] },
            ]}
            buttonText="Add Category"
            onSubmit={handleCategorySubmit}
          />
        )}


        <div className="hidden md:block min-h-screen dark:bg-gray-800 bg-gray-50">




          {/* Header */}


          <main className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-end mb-6">
              {/* <button
                onClick={() => { handleclick("income") }}
                className="flex items-center px-4 py-2 mx-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Add Income
              </button>
              <button
                onClick={() => { handleclick("expense") }}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Add Expense
              </button>
              */}
              <button

                onClick={handleclick}
                className="flex items-center px-4 py-2 mx-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Add Transactions
              </button>
              <button

                onClick={handleCategoryclick}
                className="flex items-center px-4 py-2 mx-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Add category
              </button>

            </div>




            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-black hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <span className="flex items-center text-green-600 text-sm font-medium">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    12%
                  </span>
                </div>
                <h3 className="text-gray-500 dark:text-gray-300 text-sm font-medium">Total Income</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1 dark:text-white  ">₹{Totalincome().toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">Compared to ₹21,890 last month</p>
              </div>

              <div className="bg-white dark:bg-gray-700 dark:border-black rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <CreditCard className="h-6 w-6 text-red-600" />
                  </div>
                  <span className="flex items-center text-red-600 text-sm font-medium">
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                    5%
                  </span>
                </div>
                <h3 className="text-gray-500 dark:text-gray-300 text-sm font-medium">Total Expenses</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white  mt-1">₹{Totalexpense().toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
                <p className="text-sm text-gray-500  dark:text-gray-300 mt-2">Compared to ₹4,290 last month</p>
              </div>

              <div className="bg-white dark:bg-gray-700 dark:border-black rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <PiggyBank className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="flex items-center text-blue-600 text-sm font-medium">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    8%
                  </span>
                </div>
                <h3 className="text-gray-500 dark:text-gray-300 text-sm font-medium">Total Savings</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">₹{savings.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">Compared to ₹18,990 last month</p>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Chart Section */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-700 dark:border-black rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white ">Income vs Expenses</h2>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <MoreHorizontal className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlySummaries} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="name" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="income"
                          stroke="#10B981"
                          fillOpacity={1}
                          fill="url(#colorIncome)"
                        />
                        <Area
                          type="monotone"
                          dataKey="expenses"
                          stroke="#EF4444"
                          fillOpacity={1}
                          fill="url(#colorExpenses)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white rounded-xl shadow-sm p-6 border dark:bg-gray-700 dark:border-black border-gray-100 mt-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold dark:text-gray-50 text-gray-900">Recent Transactions</h2>
                    <button className="text-sm text-blue-600 hover:text-blue-700 " onClick={() => navigate("/transactions")}>View All</button>
                  </div>
                  <div className="space-y-4">
                    {Array.isArray(recentTransactions) ? (
                      recentTransactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-lg ₹{transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                              {transaction.type === "income" ? (
                                <ArrowUpRight className="h-5 w-5 text-green-600" />
                              ) : (
                                <ArrowDownRight className="h-5 w-5 text-red-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{transaction.name}</p>
                              <p className="text-sm text-gray-500">{transaction.category}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-medium ₹{transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.type === "income" ? '+' : ''}{transaction.amount.toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">{transaction.date?.split("T")[0]}</p>
                          </div>
                        </div>
                      ))) : (
                      <p>Loading transactions...</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-8">
                {/* Expense Distribution */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 ">Expense Distribution</h2>

                  <div className="h-[150px] m-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-₹{index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-6 space-y-2">
                    {pieData.map((item, index) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></div>
                          <span className="text-sm text-gray-600">{item.name}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Budget Tracker */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Budget Tracker</h2>
                  <div className="space-y-6">

                    {
                      Array.isArray(budgetFormdata) ? (

                        budgetFormdata.map((item, index) => {
                          const progress = calculateProgress(item.startDate, item.endDate);
                          const progressColor = getProgressColor(progress);
                          const status = getStatusText(progress);
                          return (
                            <div key={index}>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">{item.type}</span>
                                <span className="text-sm text-gray-600">₹{item.amount}</span>
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full">
                                <div className={`h-2 rounded-full  ${progressColor}`} style={{ width: `${progress}%` }}></div>
                              </div>
                              <div className="flex items-center mt-2 text-sm">
                                <AlertCircle className={`w-4 h-4 ${progress < 50 ? 'text-red-500' : 'text-green-500'} mr-1`} />
                                <span className={`font-medium ${progress < 50 ? 'text-red-500' : 'text-green-500'}`}>
                                  {status}
                                </span>
                              </div>
                            </div>
                          )
                        }).slice(0, 4)) : (
                        <p>Loading...</p>
                      )
                    }

                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

    </>
  );
}

export default Dashboard2
