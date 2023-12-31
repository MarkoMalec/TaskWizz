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
import { UserCog } from "lucide-react";
import { buttonVariants } from "../ui/button";
import EditUserForm from "../forms/EditUserForm";
import ProfilePhoto from "./Profile/ProfilePhoto";

const EditUserDialog = ({ user }: any) => {
  return (
    <Dialog>
      <DialogTrigger className="block">
        <div className={`${buttonVariants({ variant: "default" })} w-full`}>
          <UserCog className="mr-2 w-5" />
          Edit User
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex-row gap-4">
          <ProfilePhoto userId={user.id} photo={user.image} />
          <div>
            <DialogTitle className="text-center text-sm">Edit user</DialogTitle>
            <DialogTitle className="text-center text-3xl font-bold">
              {user.name}
            </DialogTitle>
            <DialogDescription className="text-center">
              This action has to be saved after changes.
            </DialogDescription>
          </div>
        </DialogHeader>
        <Separator />
        <EditUserForm userData={user} />
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
