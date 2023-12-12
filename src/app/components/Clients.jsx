"use client";
import Link from "next/link";
import { useUserContextProvider } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

//1. logout and login buttons component for header
export const UserLoginSignupBtns = () => {
  const { user, setUser } = useUserContextProvider();
  const router = useRouter();
  const logoutHanddler = async () => {
    // call logout api
    try {
      const { data } = await axios.post("http://localhost:3000/api/logout");
      if (data.success) {
        setUser({});
        toast.success(data.msg);
        router.push("/login");
        console.log("logout user data is", data);
      } else {
        throw new Error("something went wrong while logout! refresh the page");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <button
        onClick={() => {
          router.push("/contact");
        }}
        className="btn2"
      >
        redirection
      </button>
      {user._id ? (
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
//2. protected rouets menu links for header
export const ProtectedMenuLinks = () => {
  const { user } = useUserContextProvider();
  return (
    <>
      {user._id && (
        <>
          <Link href="/">Home</Link>
          <Link href="/notes">Notes</Link>
        </>
      )}
    </>
  );
};
export const TodoButtons = ({ id }) => {
  return (
    <>
      <button className="btn1">Delete</button>
      <button className="btn2">Update</button>
    </>
  );
};
