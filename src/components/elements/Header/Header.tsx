"use client";

import React from "react";
import UserHeader from "./UserHeader";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import Link from "next/link";
import NavigationBar from "../NavigationBar";
import { User } from "~/lib/types";

type HeaderProps = {
  user: User | null;
};

const Header = ({ user }: HeaderProps) => {
  const userRole = user && user.role === "admin" ? true : false;
  return (
    <header className="relative sticky top-0 z-10 w-full border-b-2 backdrop-blur ">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <h2 className="text-[3rem] font-extrabold tracking-tight text-white">
            <span className="text-[hsl(280,100%,70%)]">T3</span>
          </h2>
        </Link>
        <NavigationBar admin={userRole} />
        <div className="flex w-fit gap-2">
          <UserHeader
            username={user?.name}
            avatar={user?.image}
            role={user?.role}
          />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
