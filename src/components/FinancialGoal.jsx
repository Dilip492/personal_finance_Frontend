import React, { useEffect, useState } from 'react';
import { PlusCircle, PenBox, Trash2, Target, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import Popup from './Popup';
import API_ENDPOINTS from '../config/apiConfig';
import { jwtDecode } from 'jwt-decode';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../Context/UserContextProvider';

const FinancialGoal = () => {

  const { UserId } = useAuth();
  const [show, setShow] = useState(false);
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentFinanceGoal, setCurrentFinanceGoal] = useState(null);

  const handleClose = () => {
    setShow(false);
    setSelectedGoal(null);
  };

  // let userId;
  // const cookie = document.cookie.split("=")[1];

  // if (!cookie) {
  //   console.error("No cookie in the browser");
  // } else {
  //   userId = jwtDecode(cookie).userId;
  // }

  const handleSubmit = async (data) => {
    setShow(false);
    try {

      if (editMode && currentFinanceGoal) {
        const response = await fetch(API_ENDPOINTS.UPDATE_FGOAL(currentFinanceGoal._id), {
          headers: {
            'Content-Type': 'application/json'
          },
          method: "PUT",
          credentials: "include",
          body: JSON.stringify(data)

        });
        const update_Fgoal = await response.json();

        if (response.ok) {
          console.log("update the financial goal");
          toast.success("Financial Goal Updated successfully");
          setEditMode(false)
          setCurrentFinanceGoal(null)
          getFinancialGoals();
        }

      } else {

        const response = await fetch(API_ENDPOINTS.ADD_FGOAL, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: "POST",
          credentials: "include",
          body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (response.status === 401 || response.status === 400) {
          toast.error(responseData.message);
          return;
        }

        if (response.ok) {
          toast.success("Financial Goal added successfully");
          getFinancialGoals();
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again!");
    }
  };

  const getFinancialGoals = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.GET_FGOAL(UserId), {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        setGoals(data.FinancialGoal);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again!");
    }
  };

  const deletefinancialgoal = async (fid) => {

    try {
      const response = await fetch(API_ENDPOINTS.DELETE_FGOAL(fid), {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'DELETE',
        credentials: 'include'
      });

      const deleteBudget = await response.json();
      if (response.ok) {
        console.log("financial goal delete successfuly");
        toast.success("Financial Goal Deleted successfully");
        getFinancialGoals();

      }

      if (response === 400 && response === 404) {
        toast.error("Financial Goal not deleted")
      }

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again!");
    }


  }

  useEffect(() => {
    getFinancialGoals();
  }, []);

  const getProgressColor = (progress) => {
    if (progress < 20) return 'from-red-500 to-red-600';
    if (progress < 50) return 'from-yellow-500 to-yellow-600';
    if (progress < 80) return 'from-blue-500 to-blue-600';
    return 'from-green-500 to-green-600';
  };

  const getProgressStatus = (progress) => {
    if (progress < 20) return 'At Risk';
    if (progress < 50) return 'Behind';
    if (progress < 80) return 'On Track';
    return 'Almost There';
  };

  const handleupdate = (goal) => {
    setEditMode(true)
    setCurrentFinanceGoal(goal);
    setShow(true)
  }

  const handleDelete = (fid) => {

    deletefinancialgoal(fid)

  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {show && (
        <Popup
          onclose={handleClose}
          title={editMode ? "Update financial Goal " : "Add Financial Goal"}
          fields={[
            { id: "name", type: "text", label: "Goal Name", placeholder: "Enter your financial goal" },
            { id: "targetAmount", type: "number", label: "Target Amount", placeholder: "Enter target amount" },
            { id: "savedAmount", type: "number", label: "Saved Amount", placeholder: "Enter saved amount" },
            { id: "deadline", type: "date", label: "Deadline", placeholder: "Select deadline" },
          ]}
          buttonText={editMode ? "Update Goal" : "Create Goal"}
          onSubmit={handleSubmit}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ml-60">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Financial Goals</h1>
            <p className="mt-1 text-sm text-gray-500">Track and manage your financial objectives</p>
          </div>
          <button
            onClick={() => setShow(true)}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors duration-200"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            New Goal
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <div
              key={goal._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">{goal.name}</h2>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Target className="w-4 h-4 mr-1" />
                      <span>Target: ₹{goal.targetAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedGoal(goal);
                        setShow(true);
                        handleupdate(goal)

                      }}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    >
                      <PenBox className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this goal?')) {
                          handleDelete(goal._id)
                        } else {
                          window.alert("Not delete")
                        }
                      }}
                      className="p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-semibold text-gray-900">{goal.progress.toFixed(0)}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-2 bg-gradient-to-r ${getProgressColor(goal.progress)} transition-all duration-300`}
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center text-sm">
                      <TrendingUp className={`w-4 h-4 ${goal.progress < 50 ? 'text-red-500' : 'text-green-500'} mr-1`} />
                      <span className={`font-medium ${goal.progress < 50 ? 'text-red-500' : 'text-green-500'}`}>
                        {getProgressStatus(goal.progress)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ₹{goal.savedAmount.toLocaleString()} saved
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Due by {new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span>
                      ₹{(goal.targetAmount - goal.savedAmount).toLocaleString()} remaining
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialGoal;