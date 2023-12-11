import Link from "next/link";
import React from "react";
import { ProtectedMenuLinks, UserLoginSignupBtns } from "./Clients";

const Header = () => {
  return (
    <header className="bg-slate-300">
      <div className="container flex justify-between items-center gap-2">
        <Link className="text-[max(2.5vw,1.5rem)] font-semibold " href="/">
          LOGO
        </Link>

        <div className="flex gap-2 items-center uppercase font-semibold menuLinks">
          <ProtectedMenuLinks />
          <Link href="/contact">contact</Link>
        </div>

        <div className="flex gap-2 items-center">
          <UserLoginSignupBtns />
        </div>
      </div>
    </header>
  );
};

export default Header;
