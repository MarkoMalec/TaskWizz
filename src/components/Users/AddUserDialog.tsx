import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Separator } from "../ui/separator";
import { UserPlus2 } from "lucide-react";
import { buttonVariants } from "../ui/button";
import AddUserForm from "../forms/AddUserForm";

const AddUserDialog = () => {
  return (
    <Dialog>
      <DialogTrigger
        className={`${buttonVariants()} my-8 flex items-center gap-2 font-semibold`}
      >
        <UserPlus2 className="w-5" />
        New user
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Add new user
          </DialogTitle>
          <DialogDescription className="text-center">
            This action has to be saved after changes.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <AddUserForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
