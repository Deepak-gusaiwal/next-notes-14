import Link from "next/link";
import React from "react";
import SignupFrom from "../components/SignupFrom";

export const metadata = {
  title: "Notes:Signup yourself here!",
};

const SignupPage = () => {
  return (
    <>
      <SignupFrom />
    </>
  );
};

export default SignupPage;
