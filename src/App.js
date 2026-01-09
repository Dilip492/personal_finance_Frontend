
  import { useContext, useState } from 'react';
  import './App.css';
  import Dashboard from './components/Dashboard';

  import Login from './components/Login';
  import Sidebar from './components/Sidebar';

  import Signup from './components/Signup'

  import { Routes, Route, Navigate } from 'react-router-dom';
  import TransactionForm from './components/Transactions';
  import Temp from './components/Temp';
  import Popup from './components/Popup';
  import Dash from './components/Dash';
  import Navbar from './components/Navbar';
  import Dashboard2 from './components/Dashboard2';
  import Transactions2 from './components/Transactions2';
  import Budget from './components/Budget';
  import Search from './components/Query';
  import Query from './components/Query';
  import FinancialGoal from './components/FinancialGoal';
  import MainScreen from './components/MainScreen';

  // import UserContext from './Context/UserContext';
  import Profile from './components/Profile';
  import Settings from './components/Settings';
  import HelpCenter from './components/HelpCenter';
  import { useAuth } from './Context/UserContextProvider';
  import Protected from './components/Protected';
  import Accounts from './components/Accounts';
  import LoginSuccess from './components/loginsuccess';
  import ProtectedRoute from './components/ProtectedRoute';



  function App() {
      const { isAuthenticate , loading } = useAuth();

      if(loading) {
        return <div>loading....</div>
      }

      console.log("AUTH:", isAuthenticate, "LOADING:", loading);

    
    // const ProtectedRoute = ({ children }) => {
      
    //   return isAuthenticate ? children : <Navigate to="/login" replace />;
    // };


    return (
      <>
        {
          isAuthenticate && <Sidebar />

        }
        <Routes>
          <Route path="/" element={!isAuthenticate ? <MainScreen /> : <Dashboard2 />} />
          <Route path="/login" element={isAuthenticate ? <Dashboard2 /> : <Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/protected" element={<Protected />} />
          <Route path="/login-success" element={<LoginSuccess />}/>

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard2 /></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><Transactions2 /></ProtectedRoute>} />
          <Route path="/budget" element={<ProtectedRoute><Budget /></ProtectedRoute>} />
          <Route path="/financialgoal" element={<ProtectedRoute><FinancialGoal /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/helpcenter" element={<ProtectedRoute><HelpCenter /></ProtectedRoute>} />
          <Route path="/accounts" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          {/* <Route path="/payment" element={<ProtectedRoute><Paymentsuccess /></ProtectedRoute>} /> */}


          <Route path="*" element={<Navigate to={isAuthenticate ? "/dashboard" : "/protected"} replace />} />

          {/* <Route path="*" element={<Navigate to={isAuthenticate ? "/dashboard" : "/protected"} replace />} /> */}
        </Routes>


      </>
    );
  }

  export default App;