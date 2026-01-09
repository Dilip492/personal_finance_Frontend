import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Loader, ArrowRight, ArrowLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { redirect, useNavigate } from "react-router-dom"
import API_ENDPOINTS from '../config/apiConfig';
import { useAuth } from '../Context/UserContextProvider';

// import React, { useState, useEffect } from "react";


export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""

    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { SetisAuthenticate, fetchIncome, fetchExpense } = useAuth();
    const [accounts, setAccounts] = useState([]); // not undefined


    console.log("Sending formData:", formData);


    const navigate = useNavigate();


    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) {
            newErrors.name = 'Full name is required';
        }
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            // Simulate API call
            const response = await fetch(API_ENDPOINTS.REGISTER, {
                headers: {

                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(formData),

            })

            const data = await response.json();

            console.log(data)

            if (!response.ok) {
                toast.error(data.message);
            }
            if (response.ok) {
                toast.success(data.message)
                toast.success(data.message)
                document.cookie = `key=${data.key}`
                SetisAuthenticate(true)
                // fetchIncome();
                // fetchExpense();
                navigate("/dashboard")
            }

        } catch (error) {
            toast.error(error.message)
            console.error('Signup failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors(prevFormData => ({
                ...prevFormData,
                [name]: ''
            }));
        }
    };


    // window.google.accounts.id.initialize({
    //     client_id: "813738377889-vollisk8esem5o3acoce80bmbq3krhmp.apps.googleusercontent.com",
    //     callback: handleCredentialResponse,
    // });

    // function handleCredentialResponse(response) {
    //     // response.credential IS the ID Token (JWT)
    //     fetch("http://localhost:8000/auth/google", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ token: response.credential }),
    //     });
    // }




    // const google =()=>{
    //     window.open('http://localhost:8000/auth/google')
    // }

   useEffect(() => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: "813738377889-vollisk8esem5o3acoce80bmbq3krhmp.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large" }
      );
    } else {
      console.error("Google script not loaded yet");
    }
  }, []);

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    document.cookie = `key=${response.credential}`
    // console.log("Token in context:", token);
    
    window.location.href = "/dashboard";

    // Send token to backend for verification   
  }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
            <button onClick={() => { navigate('/') }} className="w-30 absolute top-4 left-4 gap-2 py-2.5 px-4 rounded-lg
                bg-blue-600 hover:bg-blue-700
                text-white font-medium
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                transition-colors
                flex items-center justify-center">
                <ArrowLeft size={18} />
                <span>Back</span>
            </button>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full opacity-50" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-100 rounded-full opacity-50" />

                <div className="relative">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Create account</h1>
                    <p className="text-gray-600 mb-8">Sign up to get started with your new account</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`
                    block w-full pl-10 pr-3 py-2.5 rounded-lg
                    border ${errors.name ? 'border-red-500' : 'border-gray-300'}
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    transition-colors
                  `}
                                    placeholder="Enter your full name"
                                />
                            </div>
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Email Address
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
                                    placeholder="Create a password"
                                />
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>



                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="terms"
                                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                                I agree to the{' '}
                                <button type="button" className="text-blue-600 hover:text-blue-700">
                                    Terms of Service
                                </button>{' '}
                                and{' '}
                                <button type="button" className="text-blue-600 hover:text-blue-700">
                                    Privacy Policy
                                </button>
                            </label>
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
                                    Create Account
                                    <ArrowRight size={18} className="ml-2" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* <button onClick={google}>google</button> */}

                    {/* <a href='http://localhost:8000/auth/google'>google</a> */}
                   <div id="googleSignInDiv"></div>
                    {/* <div id="googleBtn" className="mt-4">Signup with google</div> */}

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <button
                            onClick={() => navigate("/login")}
                            className="font-medium text-blue-600 hover:text-blue-700"
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}