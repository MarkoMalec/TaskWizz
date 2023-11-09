import React from "react";
import { NavigationMenuDemo } from "./Navigation";

type NavigationBarProps = {
  admin: true | false;
}

const NavigationBar = ({ admin }: NavigationBarProps) => {
  return (
    <nav className="w-full">
      <div className="container py-5">
        <NavigationMenuDemo admin={admin} />
      </div>
    </nav>
  );
};

export default NavigationBar;
