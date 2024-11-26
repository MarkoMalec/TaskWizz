"use client";

import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import CredentialLoginForm from "~/components/forms/CredentialLoginForm";
import { SessionContext } from "~/lib/session";

const UserHeader = () => {
  const session = React.useContext(SessionContext);

  const username = session?.user.name;
  const avatar = session?.user.image;
  const role = session?.user.role;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={avatar}
            alt={username ? `${username}'s avatar` : "User avatar"}
          />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <h3 className="-mb-[5px]">{username ? username : "My Account"}</h3>
          <span className="text-[10px] font-light">{role ? role : null}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {username || avatar ? (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="/account">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/account/settings">Settings</Link>
              </DropdownMenuItem>
              {role === "admin" && (
                <DropdownMenuItem>
                  <Link href="/admin">Admin dashboard</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
            <Button
              onClick={() => signOut()}
              variant="destructive"
              className="mt-4 w-full"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <CredentialLoginForm />
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserHeader;
