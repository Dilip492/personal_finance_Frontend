import React, { createContext, useState, useContext, useEffect } from 'react'
import API_ENDPOINTS from '../config/apiConfig';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isAuthenticate, SetisAuthenticate] = useState(null)
  const [loading, setLoading] = useState(false)

  const [UserId , setUserId]  = useState(null);

  console.log(UserId);

  // console.log("api url", API_ENDPOINTS.PROTECTED)


  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 2. Set loading to true while request is in flight
        setLoading(true);
        const res = await fetch(API_ENDPOINTS.PROTECTED, {
          credentials: "include",
        });

        const data = await res.json();
        console.log(data)

        SetisAuthenticate(res.ok);
        setUserId(data.user.userId);
      } catch (error) {
        console.error("Auth check failed:", error);
        SetisAuthenticate(false);
      } finally {
        // 3. ALWAYS set loading to false when finished (success or fail)
        setLoading(false);
      }
    };

    checkAuth();

  }, []);


  if (isAuthenticate === null) return null;



  return (
    <UserContext.Provider value={{ isAuthenticate, SetisAuthenticate, loading , UserId }}>
      {
        children
      }
    </UserContext.Provider>

  )
}


export const useAuth = () => {
  return useContext(UserContext);
};

