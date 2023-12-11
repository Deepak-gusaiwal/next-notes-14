"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const nutrilizingTheLocalUserData = () => {
    localStorage.removeItem("user");
  };

  //we are set the userdetails while he login or signup but when he reload the website his data from the state user has been removed that's why we created this new current user api which will give us the data of the user while the user token is already stored in the cookie otherwise he needs to login or signup
  const fetchCurrentUser = async () => {
    const locallyStoredUserData = localStorage.getItem("user");
    const localUserData = JSON.parse(locallyStoredUserData);
    if (localUserData) {
      setUser(localUserData);
      return;
    }
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/users/current"
      );
      if (data.success) {
        setUser({ ...data.result });
        console.log("fetch user api is called");
      } else {
        setUser({});
      }
    } catch (error) {
      console.log("error on userContext", error.message);
    }
  };
  useEffect(() => {
    fetchCurrentUser();
  }, []);
  return (
    <userContext.Provider
      value={{ user, setUser, nutrilizingTheLocalUserData }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUserContextProvider = () => {
  return useContext(userContext);
};
