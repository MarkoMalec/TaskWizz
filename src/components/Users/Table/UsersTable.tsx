"use client";

import React, { useState } from "react";
import { useMutatingFetch } from "~/lib/hooks/useMutatingFetch";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import UsersTableRow from "./UsersTableRow";

import { User } from "~/lib/types";

interface UserTableProps {
  users: User[];
}

const UsersTable = ({ users }: UserTableProps) => {
  const { isMutating, doFetch } = useMutatingFetch();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const onCheck = (userId: string) => {
    setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, userId]);
  };

  const onUncheck = (userId: string) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.filter((id) => id !== userId),
    );
  };

  const bulkUsersDelete = async (selectedUsers: string[]) => {
    doFetch(
      "/api/users/bulkDelete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userIds: selectedUsers,
        }),
      },
      () => {
        toast.success("Users deleted successfully");
        setSelectedUsers([]);
      },
    );
  };

  return (
    <>
      <Table>
        <TableCaption>A list of your users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead className="w-[80px]">Avatar</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>E-mail Address</TableHead>
            <TableHead className="w-[100px]">Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <UsersTableRow
              key={user.id}
              user={user}
              onCheck={onCheck}
              onUncheck={onUncheck}
              isSelected={selectedUsers.includes(user.id)}
            />
          ))}
        </TableBody>
      </Table>
      {selectedUsers.length ? (
        <Button disabled={isMutating && true} asChild>
          <button onClick={() => bulkUsersDelete(selectedUsers)}>
            {isMutating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="mr-2 w-4" />
            )}
            Delete selected users
          </button>
        </Button>
      ) : null}
    </>
  );
};

export default UsersTable;
