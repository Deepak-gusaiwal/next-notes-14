"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useUserContextProvider } from "../context/UserContext";

// to get the cookie value from the serverside

const LoginForm = () => {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false);
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
  });
  const { user, setUser } = useUserContextProvider();
  const handdleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formInputs;
    if (!email || !password) {
      setError(true);
      return;
    }

    //call login user api
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/users/login",
        formInputs
      );

      if (data.success) {
        setUser({ ...data.result });
        //set data inside the localStorage
        localStorage.setItem("user",JSON.stringify({ ...data.result }))
        toast.success(data.msg);
        router.push("/");

        //store the userDetails in the context Api
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="max-w-[600px] mx-auto bg-slate-200 p-2 my-2 rounded ">
      <h2 className="heading text-center">login</h2>

      <form onSubmit={handdleSubmit} className="flex flex-col gap-2 ">
        {error && !formInputs.email && (
          <p className="font-semibold px-2 text-red-500 capitalize  ">
            Email is required*
          </p>
        )}
        <input
          onChange={(e) => {
            setFormInputs({ ...formInputs, email: e.target.value });
          }}
          value={formInputs.email}
          type="email"
          placeholder="enter email"
          className="field"
        />

        {error && !formInputs.password && (
          <p className="font-semibold px-2 text-red-500 capitalize  ">
            password is required*
          </p>
        )}
        <div className="inputBox relative">
          <input
            onChange={(e) => {
              setFormInputs({ ...formInputs, password: e.target.value });
            }}
            value={formInputs.password}
            type={showPass ? "text" : "password"}
            placeholder="enter password"
            className="field"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowPass(!showPass);
            }}
            className="bg-blue-300 capitalize font-semibold py-0 px-2 rounded absolute right-1 top-[50%]  translate-y-[-50%] "
          >
            {showPass ? "Hide" : "show"}
          </button>
        </div>
        <button className="btn2 max-w-[150px] w-full mx-auto">Login</button>
        <span className="font-bold text-center">OR</span>
        <Link className="text-center capitalize font-medium   " href="/signup">
          new user
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
