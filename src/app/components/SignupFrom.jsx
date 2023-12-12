"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useUserContextProvider } from "../context/UserContext";

const SignupFrom = () => {
  const { setUser } = useUserContextProvider();
  const router = useRouter();
  const [formInputs, setFormInputs] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false);

  const handdleSubmit = async (e) => {
    e.preventDefault();
    //validating the form data
    const { name, email, password, cpassword } = formInputs;
    if (!name || !email || !password || !cpassword) {
      setError(true);
      return;
    }

    //register the user
    try {
      var { data } = await axios.post(
        "http://localhost:3000/api/users",
        formInputs
      );
      if (data.success) {
        setUser({ ...data.result });
        toast.success("you have signup successfully");
        router.push("/");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error(error.message);
      console.log("error while register the user", error.message);
    }
  };

  return (
    <div className="max-w-[600px] mx-auto bg-slate-200 p-2 my-2 rounded ">
      <h2 className="heading text-center">Signup</h2>

      <form onSubmit={handdleSubmit} className="  flex flex-col gap-2 ">
        {error && !formInputs.name && (
          <p className="font-semibold px-2 text-red-500 capitalize  ">
            name is required*
          </p>
        )}
        <input
          onChange={(e) => {
            setFormInputs({ ...formInputs, name: e.target.value });
          }}
          value={formInputs.name}
          type="text"
          placeholder="enter name"
          className="field"
        />
        {error && !formInputs.email && (
          <p className="font-semibold px-2 text-red-500 capitalize  ">
            email is required*
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
        {formInputs.password && formInputs.password.length < 6 && (
          <p className="font-semibold px-2 text-red-500 capitalize  ">
            password length should be more than 6
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
        {error && !formInputs.cpassword && (
          <p className="font-semibold px-2 text-red-500 capitalize  ">
            confirm your password
          </p>
        )}
        {formInputs.cpassword &&
          formInputs.cpassword !== formInputs.password && (
            <p className="font-semibold px-2 text-red-500 capitalize  ">
              password is not matched
            </p>
          )}
        <input
          onChange={(e) => {
            setFormInputs({ ...formInputs, cpassword: e.target.value });
          }}
          value={formInputs.cpassword}
          type={showPass ? "text" : "password"}
          placeholder="confirm password"
          className="field"
        />
        <button className="btn2 max-w-[150px] w-full mx-auto">Signup</button>
        <span className="font-bold text-center">OR</span>
        <Link className="text-center capitalize font-medium   " href="/login">
          already registred
        </Link>
      </form>
    </div>
  );
};

export default SignupFrom;
