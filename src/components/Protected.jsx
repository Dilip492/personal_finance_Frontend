import React from 'react'
import { Shield, XCircle } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

const Protected = () => {
  const navigate = useNavigate();
  return (
    <div>
       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="flex flex-col items-center">
            <div className="bg-red-100 p-3 rounded-full">
              <XCircle className="h-12 w-12 text-red-500" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Access Denied</h2>
            <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Shield className="h-4 w-4" />
              <span>Protected Content</span>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-gray-600">
              You don't have permission to access this page. Please sign in to continue.
            </p>
          </div>

          <div className="mt-6">
            <button
              onClick={() => navigate("/login") }
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go to Login
            </button>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <p className="text-xs text-gray-500">
              If you believe this is a mistake, please contact support for assistance.
            </p>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Protected
