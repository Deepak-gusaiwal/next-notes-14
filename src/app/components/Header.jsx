import Link from "next/link";
import React from "react";
import { LogoComp, ProtectedMenuLinks, UserLoginSignupBtns } from "./Clients";

const Header = () => {
  return (
    <header className="bg-slate-300">
      <div className="container flex justify-between items-center gap-2">
        <LogoComp />

        <div className="flex gap-2 items-center uppercase font-semibold menuLinks order-1 md:order-none sm:order-3">
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
