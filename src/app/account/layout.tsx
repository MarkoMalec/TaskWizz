import React from "react";
import Account from "./page";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { UserPen } from "lucide-react";

const AccountLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-5">
      <aside className="flex flex-col gap-5">
        <Button variant="ghost" asChild>
          <Link href="/account" prefetch={true}>
            <UserPen /> Account
          </Link>
        </Button>
      </aside>
      {children}
    </div>
  );
};

export default AccountLayout;
