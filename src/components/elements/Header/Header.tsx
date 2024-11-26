"use client";

import React from "react";
import Link from "next/link";
import NavigationBar from "../NavigationBar";
import { SessionContext } from "~/lib/session";

const Header = ({}: any) => {
  const session = React.useContext(SessionContext);

  const userRole = session && session.user.role === "admin" ? true : false;

  return (
    <header className="relative sticky top-0 z-10 w-full border-b backdrop-blur">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <h2 className="text-[3rem] font-extrabold tracking-tight text-white">
            <span className="text-[hsl(280,100%,70%)]">TW</span>
          </h2>
        </Link>
        {session ? <NavigationBar admin={userRole} /> : null}
      </div>
    </header>
  );
};

export default Header;
