"use client";

import React from "react";
import { SessionContext } from "~/lib/session";
import BreadcrumbNavigation from "~/lib/breadcrumbs-nav";
import { SidebarTrigger } from "~/components/ui/sidebar";

const Header = () => {
  const session = React.useContext(SessionContext);

  if (!session) return null;

  return (
    <header className="fixed top-0 z-20 w-full border-b backdrop-blur">
      <div className=" flex items-center">
        <SidebarTrigger className="rounded-none border-r px-8 py-8" />
        <BreadcrumbNavigation className="ml-7" />
      </div>
    </header>
  );
};

export default Header;
