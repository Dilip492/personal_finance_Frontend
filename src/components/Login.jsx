import React, { useContext, useState } from 'react';
import { Mail, Lock, Loader, ArrowRight , ArrowLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, redirect, useNavigate } from 'react-router-dom'
// import { MyContextProvider } from '../Context/MyContextProvider';
// import UserContext from '../Context/UserContext';
import API_ENDPOINTS from '../config/apiConfig';
import { useAuth } from '../Context/UserContextProvider';
import { useFinance } from '../Context/FinanceContextProvider';
export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  console.log("sending data", formData)
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();

  const { SetisAuthenticate } = useAuth();
  const { fetchIncome, fetchExpense } = useFinance();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {

      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(formData),

      })

      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        toast.error(data.message)
      }

      if (response.ok) {
        toast.success(data.message)
        // document.cookie = `key=${data.key}`
        window.location.reload();
        SetisAuthenticate(true)
        fetchIncome();
        fetchExpense();
        navigate("/dashboard")



      }

    } catch (error) {
      toast.error(error.message)
      console.error('Signup failed:', error);

    }
    setIsLoading(false);
    // Handle successful login here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div>

   
<button onClick={()=>{navigate('/')}} className="w-30 absolute top-4 left-4 gap-2 py-2.5 px-4 rounded-lg
                bg-blue-600 hover:bg-blue-700
                text-white font-medium
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                transition-colors
                flex items-center justify-center">
  <ArrowLeft size={18} />
  <span>Back</span>
</button>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="bg-white rounded-2xl shadow-xl  max-w-md p-8 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full opacity-50" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-100 rounded-full opacity-50" />

        <div className="relative">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Login</h1>
          <p className="text-gray-600 mb-8 text-sm">Please enter your details to sign in</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`
                    block w-full pl-10 pr-3 py-2.5 rounded-lg
                    border ${errors.email ? 'border-red-500' : 'border-gray-300'}
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    transition-colors
                  `}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`
                    block w-full pl-10 pr-3 py-2.5 rounded-lg
                    border ${errors.password ? 'border-red-500' : 'border-gray-300'}
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    transition-colors
                  `}
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <Link to="/" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full py-2.5 px-4 rounded-lg
                bg-blue-600 hover:bg-blue-700
                text-white font-medium
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                transition-colors
                flex items-center justify-center
                ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}
              `}
            >
              {isLoading ? (
                <Loader className="animate-spin" size={20} />
              ) : (
                <>
                  Sign in
                  <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-700">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}