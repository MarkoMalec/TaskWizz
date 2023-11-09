"use client";

import React from "react";
import { useMutatingFetch } from "~/lib/hooks/useMutatingFetch";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { buttonVariants } from "../ui/button";
import { Trash2 } from "lucide-react";

const DeleteUserDialog = ({ userId }: any) => {
  const { doFetch } = useMutatingFetch();

  const deleteUser = async () => {
    doFetch(
      "/api/user/delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
        }),
      },
      () => {
        toast.success("User deleted");
      },
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="block">
        <div className={buttonVariants({ variant: "destructive" })}>
          <Trash2 className="mr-2 w-5" /> Delete user
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user
            and remove data from servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteUser}>
            Delete user
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserDialog;
