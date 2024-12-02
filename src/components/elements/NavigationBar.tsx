import React from "react";
import { DesktopMenu } from "./DesktopMenu";
import { ThemeSwitcher } from "./ThemeSwitcher/ThemeSwitcher";

import UserHeader from "./Header/UserHeader";
import { useMediaQuery } from "~/lib/hooks/useMediaQuery";
import MobileMenu from "./Header/MobileMenu";

type NavigationBarProps = {
  admin: true | false;
};

const NavigationBar = ({ admin }: NavigationBarProps) => {
  const isMobile = useMediaQuery("(max-width: 756px)");

  console.log(isMobile);

  return (
    <nav className="w-full">
      <div className="container flex justify-end gap-10 py-5">
        {isMobile ? (
          <MobileMenu admin={admin} />
        ) : (
          <>
            <DesktopMenu admin={admin} />
            <div className="flex items-center gap-4">
              <UserHeader />
              <ThemeSwitcher />
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;