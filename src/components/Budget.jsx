
import React, { useEffect, useState } from 'react';
import { PlusCircle, Pencil, Trash2, AlertCircle } from 'lucide-react';
import Popup from './Popup';
import Tooltip from './Tooltip';
import API_ENDPOINTS from '../config/apiConfig';

import { useFinance } from '../Context/FinanceContextProvider';

const Budget = () => {

  const { budgetFormdata , getBudget} = useFinance();
  const [show, setShow] = useState(false);
  
  const [editMode, setEditMode] = useState(false);
  const [currentBudget, setCurrentBudget] = useState(null);

  const handleClose = () => {
    setShow(false);
    setEditMode(false);
    setCurrentBudget(null);
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

  // let userId;
  // const cookie = document.cookie.split("=")[1];
  
  // if (!cookie) {
  //   console.error("No cookie in the browser");
  // } else {
  //   userId = jwtDecode(cookie).userId;
  // }

  

  const handleFormSubmit = async (data) => {
    setShow(false);
    
    try {
      if (editMode && currentBudget) {
        // Update existing budget
        const response = await fetch(API_ENDPOINTS.UPDATE_BUDGET(currentBudget._id), {
          headers: { 'Content-Type': 'application/json' },
          method: "PUT",
          credentials: 'include',
          body: JSON.stringify(data)
        });

        const updatedBudget = await response.json();

        if (response.ok) {
          console.log("Budget updated successfully", updatedBudget);
          setEditMode(false);
          setCurrentBudget(null);
          getBudget();
        }
      } else {
        // Add new budget
        const response = await fetch(API_ENDPOINTS.ADD_BUDGET, {
          headers: { 'Content-Type': 'application/json' },
          method: "POST",
          credentials: 'include',
          body: JSON.stringify(data)
        });

        const budgetData = await response.json();

        if (response.ok) {
          console.log("Budget data added successfully", budgetData);
          getBudget();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  
  const handleDelete = (Budget_id) => {
    if (window.confirm("Are you sure you want to delete this budget?")) {
      deleteBudget(Budget_id);
    }
  };

  const deleteBudget = async (Budget_id) => {

    console.log("URL",API_ENDPOINTS.DELETE_BUDGET(Budget_id))
    try {
      const response = await fetch(API_ENDPOINTS.DELETE_BUDGET(Budget_id), {
        headers: { 'Content-Type': 'application/json' },
        method: "DELETE",
        credentials: "include"
      });

      if (response.ok) {
        console.log("Budget deleted successfully");
        getBudget(); // Refresh the budget list
      } else {
        console.error("Failed to delete budget");
      }
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  useEffect(() => {
    getBudget();
  }, []);

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

  const handleUpdate = (budget) => {
    setCurrentBudget(budget);
    setEditMode(true);
    setShow(true);
  };

  // Format date for input field (YYYY-MM-DD)
  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  console.log("budget data " , budgetFormdata)

  return (
    <div className="min-h-screen bg-gray-50">
      {show && (
        <Popup
          onclose={handleClose}
          title={editMode ? "Update Budget" : "Add Budget"}
          fields={[
            { 
              id: "type", 
              type: "text", 
              label: "Budget Name", 
              placeholder: "Enter Budget Name",
              defaultValue: editMode && currentBudget ? currentBudget.type : ""
            },
            { 
              id: "amount", 
              type: "number", 
              label: "Amount", 
              placeholder: "Enter amount",
              defaultValue: editMode && currentBudget ? currentBudget.amount : ""
            },
            { 
              id: "startDate", 
              type: "date", 
              label: "Start Date", 
              placeholder: "Select Start date",
              defaultValue: editMode && currentBudget ? formatDateForInput(currentBudget.startDate) : ""
            },
            { 
              id: "endDate", 
              type: "date", 
              label: "End Date", 
              placeholder: "Select End date",
              defaultValue: editMode && currentBudget ? formatDateForInput(currentBudget.endDate) : ""
            },
          ]}
          buttonText={editMode ? "Update Budget" : "Add Budget"}
          onSubmit={handleFormSubmit}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ml-60">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Budget Tracker</h1>
          <button
            onClick={() => {
              setEditMode(false);
              setCurrentBudget(null);
              setShow(true);
            }}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors duration-200"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add New Budget
          </button>
        </div>

        {budgetFormdata.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No budgets found</h3>
            <p className="text-gray-500 mb-6">Start by creating your first budget to track your expenses.</p>
            <button
              onClick={() => {
                setEditMode(false);
                setCurrentBudget(null);
                setShow(true);
              }}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors duration-200"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Create Budget
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              Array.isArray(budgetFormdata) ? (

             
            
            budgetFormdata.map((item, index) => {
              const progress = calculateProgress(item.startDate, item.endDate);
              const progressColor = getProgressColor(progress);
              const status = getStatusText(progress);

              return (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-1">{item.type}</h2>
                        <p className="text-3xl font-bold text-indigo-600">
                        ₹{item.amount.toLocaleString("en-IN", { minimumFractionDigits: 0 })}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Tooltip text="Edit">
                          <button 
                            onClick={() => handleUpdate(item)} 
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                          >
                            <Pencil className="w-4 h-4 text-gray-600" />
                          </button>
                        </Tooltip>
                        <Tooltip text="Delete">
                          <button 
                            onClick={() => handleDelete(item._id)} 
                            className="p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </Tooltip>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm font-semibold text-gray-900">{progress.toFixed(0)}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${progressColor}`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex items-center mt-2 text-sm">
                        <AlertCircle className={`w-4 h-4 ${progress < 50 ? 'text-red-500' : 'text-green-500'} mr-1`} />
                        <span className={`font-medium ${progress < 50 ? 'text-red-500' : 'text-green-500'}`}>
                          {status}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center text-gray-600">
                        <span>Start Date</span>
                        <span className="font-medium text-gray-900">{new Date(item.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-600">
                        <span>End Date</span>
                        <span className="font-medium text-gray-900">{new Date(item.endDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }) ) : (
              <p>Loading.....</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Budget;