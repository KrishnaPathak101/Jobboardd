// context/StateContext.js
'use client'
import { createContext, useContext, useEffect, useState } from "react";

// Create a context
export const StateContext = createContext();

// StateProvider component to wrap the app with context
export const StateProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const [userId, setUserId] = useState(null); // User ID state
  const [jobs, setJobs] = useState([]); // Jobs state
  // Login function that sets the user and optionally userId
  const login = (name, id) => {
    setUser({ name });
    setUserId(id); // Set user ID when logging in
  };

  // Logout function that resets both user and userId
  const logout = () => {
    setUser(null);
    setUserId(null); // Clear user ID on logout
  };
  
  useEffect(() => {
    const getJobs = async () => {
      try {
        const resopnse = await fetch('/api/job')

        const data = await resopnse.json();
        console.log(data);
        setJobs(data);
        console.log(jobs)
      } catch (error) {
        console.log(error);

      }
    }

    getJobs();
  }, [userId])

  return (
    <StateContext.Provider value={{ setUserId,user,jobs, userId, login, logout }}>
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use the state context
