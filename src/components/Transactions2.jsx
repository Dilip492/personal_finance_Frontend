// import React, { useEffect, useState, useRef } from "react";
// import {
//   Download,
//   ListFilter,
//   CreditCard,
//   Search,
//   ArrowUpRight,
//   ArrowDownRight,
//   Calendar,
//   DollarSign,
//   X,
//   ChevronLeft,
//   ChevronRight
// } from "lucide-react";
// import { useFinance } from "../Context/FinanceContextProvider";
// import API_ENDPOINTS from "../config/apiConfig";
// import { jwtDecode } from "jwt-decode";

// const Transactions2 = () => {
//   const { transactions } = useFinance();
//   const [show, setShow] = useState(false);
//   const [filterData, setFilterData] = useState({ date: "", amount: "" }); // Use lowercase "date"
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showTrans, setShowTrans] = useState([]);
//   // const sentTransactions = useRef(new Set()); // Track sent transactions
//   const lastTransactionId = useRef(null); // Track the last sent transaction ID

//   console.log(transactions)

//   const filteredTransactions = showTrans.filter((trans) => {
//     const matchesSearch = trans?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       trans?.category?.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesDate = !filterData.date || trans?.date <= filterData.date;
//     const matchesAmount = !filterData.amount || Math.abs(trans?.amount) <= Math.abs(Number(filterData.amount));

//     return matchesSearch && matchesDate && matchesAmount;
//   }) || [];

//   const itemsPerPage = 5;
//   const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const displayTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFilterData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   let userId;
//   const cookie = document.cookie.split("=")[1];

//   if (!cookie) {
//     console.error("No cookie in the browser");
//     //Redirect to login page
//     window.location.href = "/login";
//   } else {
//     try {
//       userId = jwtDecode(cookie).userId;
//     } catch (error) {
//       console.error("Invalid cookie:", error);
//       //Redirect to login page
//       window.location.href = "/login";
//     }
//   }
//   const sentTransactions = useRef(new Set(JSON.parse(localStorage.getItem('sentTransactions')) || []));

//   useEffect(() => {
//     localStorage.setItem('sentTransactions', JSON.stringify(Array.from(sentTransactions.current)));
//   }, [sentTransactions.current]);

//   const AddTransactions = async () => {
//     try {
//       if (transactions.length === 0) return;

//       const newTransactions = transactions.filter(trans => !sentTransactions.current.has(trans.id));

//       if (newTransactions.length === 0) {
//         console.log("No new transactions to send.");
//         return;
//       }

//       for (const trans of newTransactions) {
//         const response = await fetch(API_ENDPOINTS.ADD_TRANS, {
//           method: "POST",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(trans),
//         });

//         const data = await response.json();

//         if (response.ok) {
//           console.log("Transaction added successfully:", data);
//           sentTransactions.current.add(trans.id);
//         } else {
//           console.error("Failed to send transaction:", data);
//         }
//       }

//     } catch (error) {
//       console.error("Error adding transaction:", error);
//     }
//   };


//   const GetTrans = async () => {
//     try {
//       const response = await fetch(API_ENDPOINTS.GET_TRANS(userId), {
//         method: 'GET',
//         credentials: "include",
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });

//       const data = await response.json();

//       if (response.ok) {
//         console.log("transactions received:", data);
//         if (Array.isArray(data.Transactions)) {
//           setShowTrans(data.Transactions);
//         } else {
//           console.error("Expected an array but received:", data);
//           setShowTrans([]);
//         }
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (transactions.length > 0) {
//       AddTransactions();
//     }
//   }, [transactions]); // Runs when transactions change

//   useEffect(() => {
//     GetTrans();
//   }, []);


//   return (
//     <div>
//       <div className="h-[80vh] w-[80wh] ml-60 ">
//         <div className="min-h-screen bg-gray-50 p-6">
//           <div className="max-w-6xl mx-auto">
//             <div className="mb-8">
//               <h1 className="text-2xl font-bold text-gray-800 mb-6">Transactions Overview</h1>
//               <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//                 <div className="relative flex-1">
//                   <input
//                     type="text"
//                     placeholder="Search transactions..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                   />
//                   <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                 </div>

//                 <div className="flex gap-3">
//                   <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//                     <Download className="h-5 w-5 text-gray-600" />
//                     <span className="text-sm font-medium text-gray-600">Export</span>
//                   </button>

//                   <button
//                     onClick={() => setShow(true)}
//                     className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
//                   >
//                     <ListFilter className="h-5 w-5" />
//                     <span className="text-sm font-medium">Filter</span>
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//               <div className="px-6 py-4 border-b border-gray-100">
//                 <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
//               </div>

//               <div className="divide-y divide-gray-100">
//                 {!transactions && <div>Loading...</div>}
//                 {displayTransactions.map((trans, index) => (
//                   <div
//                     key={index}
//                     className="px-6 py-4 hover:bg-gray-50 transition-colors"
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-4">
//                         <div className={`h-10 w-10 rounded-full flex items-center justify-center ${trans.category === "income" ? 'bg-emerald-100' : 'bg-red-100'
//                           }`}>
//                           <CreditCard className={`h-5 w-5 ${trans.category === "income" ? 'text-emerald-600' : 'text-red-500'
//                             }`} />
//                         </div>
//                         <div>
//                           <h3 className="font-medium text-gray-800">{trans.name}</h3>
//                           <div className="flex items-center gap-2 mt-1">
//                             <span className="text-sm text-gray-500">{trans.date?.split("T")[0]}</span>
//                             <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
//                               {trans.category}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                       <p className={`text-lg font-semibold ${trans.category === "income" ? 'text-emerald-600' : 'text-red-500'
//                         }`}>
//                         {trans.category === "income" ? '+' : '-'}{trans.amount.toFixed(2)}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
//                 <p className="text-sm text-gray-500">
//                   Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
//                 </p>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                     disabled={currentPage === 1}
//                     className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <ChevronLeft className="h-5 w-5 text-gray-600" />
//                   </button>
//                   <button
//                     onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                     disabled={currentPage === totalPages}
//                     className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <ChevronRight className="h-5 w-5 text-gray-600" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {show && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//               <div className="bg-white rounded-xl p-6 w-full max-w-md">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-lg font-semibold text-gray-800">Filter Transactions</h3>
//                   <button
//                     onClick={() => setShow(false)}
//                     className="p-2 hover:bg-gray-100 rounded-full"
//                   >
//                     <X className="h-5 w-5 text-gray-500" />
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Date Range
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="date"
//                         name="date"
//                         value={filterData.date}
//                         onChange={handleChange}
//                         className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                       />
//                       <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Maximum Amount
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="number"
//                         name="amount"
//                         value={filterData.amount}
//                         onChange={handleChange}
//                         placeholder="Enter amount"
//                         className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                       />
//                       <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => setShow(false)}
//                     className="w-full py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
//                   >
//                     Apply Filters
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Transactions2;




import React, { useEffect, useState, useRef, useCallback } from "react";
import { CreditCard, Search, X, ChevronLeft, ChevronRight, Calendar, DollarSign, Download, ListFilter } from "lucide-react";
import { useFinance } from "../Context/FinanceContextProvider";
import API_ENDPOINTS from "../config/apiConfig";
import { jwtDecode } from "jwt-decode";

const Transactions2 = () => {
  // State and Refs
  const { transactions, showTrans, GetTrans } = useFinance();
  const [show, setShow] = useState(false);
  const [filterData, setFilterData] = useState({ date: "", amount: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");







  // Filtering logic
  const filteredTransactions = showTrans.filter((trans) => {
    const matchesSearch = trans?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trans?.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = !filterData.date || trans?.date <= filterData.date;
    const matchesAmount = !filterData.amount || Math.abs(trans?.amount) <= Math.abs(Number(filterData.amount));

    return matchesSearch && matchesDate && matchesAmount;

  }) || [];




  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  useEffect(() => {
    GetTrans();
  }, []);

  const handleDelete = ()=>{

  }

  const handleEdit = ()=>{}

  return (
    <div>
      <div className="h-[80vh] w-[80wh] ml-60 ">
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Transactions Overview</h1>
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>

                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">Export</span>
                  </button>

                  <button
                    onClick={() => setShow(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <ListFilter className="h-5 w-5" />
                    <span className="text-sm font-medium">Filter</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
              </div>

              <div className="divide-y divide-gray-100">
                {!transactions && <div>Loading...</div>}
                {displayTransactions.map((trans, index) => (
                  <div
                    key={index}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      {/* Left Section */}
                      <div className="flex items-center space-x-4">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${trans.type === "income" ? "bg-emerald-100" : "bg-red-100"
                            }`}
                        >
                          <CreditCard
                            className={`h-5 w-5 ${trans.type === "income" ? "text-emerald-600" : "text-red-500"
                              }`}
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{trans.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-gray-500">
                              {trans.date?.split("T")[0]}
                            </span>
                            <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                              {trans.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Section */}
                      <div className="flex items-center gap-4">
                        <p
                          className={`text-lg font-semibold ${trans.type === "income" ? "text-emerald-600" : "text-red-500"
                            }`}
                        >
                          {trans.type === "income" ? "+" : "-"}
                          {trans.amount.toFixed(2)}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(trans)}
                            className="px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(trans._id)}
                            className="px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>


              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {show && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-xl p-6 w-full max-w-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Filter Transactions</h3>
                  <button
                    onClick={() => setShow(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date Range
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="date"
                        value={filterData.date}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                      <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Maximum Amount
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="amount"
                        value={filterData.amount}
                        onChange={handleChange}
                        placeholder="Enter amount"
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                      <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <button
                    onClick={() => setShow(false)}
                    className="w-full py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions2;