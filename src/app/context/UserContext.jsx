"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { currentUser } from "../services/userService";
import { toast } from "react-toastify";

const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [loading, setLoading] = useState({
    user: false,
    addNote: false,
    showNote: false,
    deleteNote: false,
  });
  const [user, setUser] = useState({});

  //we are set the user in state while he login or signup but when he reload the website his data from the state user has been removed that's why we created this new current user api which will give us the data of the user while the user token is already stored in the cookie otherwise he needs to login or signup
  const fetchCurrentUser = async () => {
    try {
      const data = await currentUser();
      if (data.success) {
        setUser({ ...data.result });
      } else {
        setUser({});
        throw new Error(data.msg);
      }
    } catch (error) {
      console.log("error on userContext", error.message);
      // toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);
  return (
    <userContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </userContext.Provider>
  );
};

export const useUserContextProvider = () => {
  return useContext(userContext);
};
