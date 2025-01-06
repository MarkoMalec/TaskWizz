import React, { useRef } from "react";
import EditUserDialog from "../EditUserDialog";
import DeleteUserDialog from "../DeleteUserDialog";
import { TableCell, TableRow } from "~/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "~/components/ui/checkbox";
import { Button } from "../../ui/button";

import { User } from "~/lib/types";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

type UsersTableRowProps = {
  user: User;
  onCheck: (userId: string | any) => void;
  onUncheck: (userId: string | any) => void;
  isSelected: any;
};

const UsersTableRow = ({
  user,
  onCheck,
  onUncheck,
  isSelected,
}: UsersTableRowProps) => {
  const checkboxRef = useRef<HTMLButtonElement>(null);

  const simulateCheckboxClick = () => {
    const checkbox = checkboxRef.current;
    if (checkbox) {
      checkbox.click();
    }
  };

  return (
    <TableRow key={user.id} className={`${isSelected ? "bg-muted/90" : null}`}>
      <TableCell onClick={simulateCheckboxClick}>
        <Checkbox
          ref={checkboxRef}
          checked={isSelected}
          onCheckedChange={(selectedUsers) =>
            selectedUsers ? onCheck(user.id) : onUncheck(user.id)
          }
        />
      </TableCell>
      <TableCell>
        <Avatar>
          <AvatarImage src={user.image ? user.image : undefined} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell className="font-medium">{user.role}</TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              asChild
              variant="ghost"
              className="h-8 w-8 cursor-pointer p-0"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                user.email ? navigator.clipboard.writeText(user.email) : null
              }
              className="cursor-pointer"
            >
              Copy user email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link prefetch={false} href={`/users/${user.id}`}>View user</Link>
            </DropdownMenuItem>
            <div className="mt-3 flex flex-col justify-stretch gap-1">
              <EditUserDialog user={user} />
              <DeleteUserDialog userId={user.id} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default UsersTableRow;
