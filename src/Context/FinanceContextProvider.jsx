import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";
import API_ENDPOINTS from "../config/apiConfig";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "./UserContextProvider";
// import { AddIncome } from "../../../../Server/controllers/finance.controller";


const FinanceContext = createContext();


export const FinanceContextProvider = ({ children }) => {

  const { isAuthenticate, UserId } = useAuth();

  // console.log("this is userid", UserId);

  const [error, setError] = useState(null);
  const [incomeArr, setIncomeArr] = useState([]);
  const [expenseArr, setExpenseArr] = useState([]);
  const [savings, setSavings] = useState("");

  const [transactions, setTransactions] = useState([]);
  const processedTransactions = useRef(new Set());
  const isProcessing = useRef(false);
  const [showTrans, setShowTrans] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [budgetFormdata, setBudgetFormdata] = useState({});



  useEffect(() => {

    if (!showTrans || showTrans.length === 0) return; // Avoid unnecessary updates

    setRecentTransactions([...showTrans].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4));


  }, [showTrans])


  // Fetch transactions from server
  const GetTrans = async () => {
    // let userId;
    try {
      // const cookie = document.cookie.split("=")[1];
      // if (!cookie) throw new Error("No auth cookie");
      // userId = jwtDecode(cookie).userId;

      const response = await fetch(API_ENDPOINTS.GET_TRANS(UserId), {
        method: 'GET',
        credentials: "include",
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        const data = await response.json();
        setShowTrans(Array.isArray(data.Transactions) ? data.Transactions : []);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      // window.location.href = "/login";
    }
  };


  //  fetch the budget 
  const getBudget = async () => {
    try {


      const response = await fetch(API_ENDPOINTS.GET_BUDGET(UserId), {
        headers: { 'Content-Type': 'application/json', },
        method: "GET",
        credentials: "include"
      });


      const budgetData = await response.json();

      if (response.ok) {
        // console.log("Data received successfully", budgetData);
        setBudgetFormdata(budgetData.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const Totalincome = () => {
    let totalamount = 0;
    for (let index = 0; index < incomeArr.length; index++) {
      totalamount += incomeArr[index].amount;
    }
    return totalamount;
  }


  const Totalexpense = () => {
    let totalamount = 0;
    for (let index = 0; index < expenseArr.length; index++) {
      totalamount += expenseArr[index].amount;

    }
    return totalamount;
  }

  useEffect(() => {

    const saveAmount = Totalincome() - Totalexpense();
    setSavings(saveAmount);

  }, [Totalincome, Totalincome])





  const addTransactions = useCallback(async (newTransactions) => {
    if (!Array.isArray(newTransactions)) {
      newTransactions = [newTransactions];
    }

    // Filter out already processed transactions
    const transactionsToProcess = newTransactions.filter(
      txn => txn._id && !processedTransactions.current.has(txn._id)
    );

    if (transactionsToProcess.length === 0 || isProcessing.current) {
      return;
    }

    isProcessing.current = true;

    try {
      // Add to local state first
      setTransactions(prev => [...prev, ...transactionsToProcess]);

      // Send to server
      const results = await Promise.allSettled(
        transactionsToProcess.map(txn =>
          fetch(API_ENDPOINTS.ADD_TRANS, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(txn),
          })
        )
      );

      // Mark successful ones as processed
      results.forEach((result, index) => {
        if (result.status === "fulfilled" && result.value.ok) {
          processedTransactions.current.add(transactionsToProcess[index]._id);
        }
      });
    } catch (error) {
      console.error("Error processing transactions:", error);
    } finally {
      isProcessing.current = false;
    }
  }, []);



  function createMonthlySummary(incomeArr, expenseArr) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Initialize all months with 0 values
    const monthlyData = {};
    monthNames.forEach(month => {
      monthlyData[month] = {
        name: month,
        income: 0,
        expenses: 0
      };
    });

    // Process income array
    incomeArr.forEach(item => {
      try {
        const date = new Date(item.date || item.Date);
        if (isNaN(date.getTime())) {
          console.warn("Invalid date in income:", item);
          return;
        }
        const month = monthNames[date.getMonth()];
        monthlyData[month].income += Number(item.amount) || 0;
      } catch (error) {
        console.error("Error processing income item:", item, error);
      }
    });

    // Process expense array
    expenseArr.forEach(item => {
      try {
        const date = new Date(item.date || item.Date);
        if (isNaN(date.getTime())) {
          console.warn("Invalid date in expense:", item);
          return;
        }
        const month = monthNames[date.getMonth()];
        monthlyData[month].expenses += Number(item.amount) || 0;
      } catch (error) {
        console.error("Error processing expense item:", item, error);
      }
    });

    // Convert to array in correct order
    return monthNames.map(month => monthlyData[month]);
  }

  // Usage in your component:
  const monthlySummaries = createMonthlySummary(incomeArr, expenseArr);
  // console.log("Monthly Summaries:", monthlySummaries);


  const fetchIncome = async () => {

    try {
      const response = await fetch(API_ENDPOINTS.GET_INCOME(UserId), {
        method: 'GET',
        credentials: 'include',
      })
      const data = await response.json();

      if (response.ok) {
        // console.log(data)
        setIncomeArr(data.data)
      }

    } catch (error) {
      console.error('Error from finance context:', error.message);
      // setError(true)   
    }
  };


  // console.log(API_ENDPOINTS.GET_EXPENSE(userId))

  const fetchExpense = async () => {

    try {
      const response = await fetch(API_ENDPOINTS.GET_EXPENSE(UserId), {
        method: 'GET',
        credentials: 'include',
      })
      const data = await response.json();

      if (response.ok) {
        // console.log("expense", data)
        setExpenseArr(data.data)
      }

    } catch (error) {
      console.error('Error from finance context:', error.message);
      // setError(true)   
    }
  };


  const getMonthlySummaries = () => {
    return createMonthlySummary(incomeArr, expenseArr);
  };



  useEffect(() => {

    if (isAuthenticate) {
      fetchIncome();
      fetchExpense();

      // await Promise.all([fetchIncome(), fetchExpense()])
    }

  }, [isAuthenticate]);




  return (
    <FinanceContext.Provider value={{ incomeArr, setIncomeArr, expenseArr, setExpenseArr, transactions, addTransactions, Totalincome, Totalexpense, savings, fetchIncome, fetchExpense, monthlySummaries: getMonthlySummaries(), showTrans, GetTrans, recentTransactions, getBudget, budgetFormdata }}>
      {
        children
      }
    </FinanceContext.Provider>
  )
}




export const useFinance = () => {
  return useContext(FinanceContext);
};


