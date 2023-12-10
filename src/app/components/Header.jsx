import Link from "next/link";
import React from "react";
import { UserLoginSignupBtns } from "./Clients";

const Header = () => {
  return (
    <header className="bg-slate-300">
      <div className="container flex justify-between items-center gap-2">
        <Link className="text-[max(2.5vw,1.5rem)] font-semibold " href="/">LOGO</Link>

        <div className="flex gap-2 items-center uppercase font-semibold menuLinks">
          <Link href="/">Home</Link>
          <Link href="/contact">contact</Link>
          <Link href="/notes">Notes</Link>
        </div>

        <div className="flex gap-2 items-center">
         <UserLoginSignupBtns/>
        </div>
      </div>
    </header>
  );
};

export default Header;
