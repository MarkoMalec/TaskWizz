import React from "react";
import { ThemeSwitcher } from "./ThemeSwitcher/ThemeSwitcher";

import UserHeader from "./Header/UserHeader";

type NavigationBarProps = {
  admin: true | false;
};

const NavigationBar = ({ admin }: NavigationBarProps) => {
  return (
    <nav className="w-full">
      <div className="container flex justify-end gap-10 py-2">
        <div className="flex items-center gap-4">
          <UserHeader />
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
