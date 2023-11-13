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
import { AlarmClock } from "lucide-react";
import { buttonVariants } from "../ui/button";
import AddTaskForm from "./Forms/AddTaskForm";

const AddTaskDialog = ({ user }: any) => {
  return (
    <Dialog>
      <DialogTrigger
        className={`${buttonVariants()} my-8 flex items-center gap-2 font-semibold`}
      >
        <AlarmClock className="w-5" />
        New assignment
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] w-[100%] max-w-[850px] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl">
            Add new assignment
          </DialogTitle>
          <DialogDescription className="text-center">
            This action has to be saved after changes.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <AddTaskForm user={user} />
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
