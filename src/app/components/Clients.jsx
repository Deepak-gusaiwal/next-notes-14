"use client";
import Link from "next/link";
import { useUserContextProvider } from "../context/UserContext";
export const UserLoginSignupBtns = () => {
  const { user, setUser } = useUserContextProvider();

  const logoutHanddler = () => {
    alert("logout");
  };
  return (
    <>
      {user.id ? (
        <button onClick={logoutHanddler} className="btn2">
          logout
        </button>
      ) : (
        <>
          <Link className="btn1" href="/signup">
            signup
          </Link>
          <Link className="btn2" href="/login">
            login
          </Link>
        </>
      )}
    </>
  );
};

export const TodoButtons = ({id}) => {
  return (
    <>
      <button className="btn1">Delete</button>
      <button className="btn2">Update</button>
    </>
  );
};
