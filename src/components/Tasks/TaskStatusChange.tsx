import React from "react";
import { useMutatingFetch } from "~/lib/hooks/useMutatingFetch";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

type TaskStatusChangeProps = {
  admin?: boolean;
  taskId: string;
  status: "Pending" | "In progress" | "Finished";
};

const TaskStatusChange = ({ admin, taskId, status }: TaskStatusChangeProps) => {
  const { isMutating, doFetch } = useMutatingFetch();

  const updateStatusOnServer = async (status: any) => {
    doFetch(
      "/api/task/edit",
      {
        method: "PATCH",
        body: JSON.stringify({ id: taskId, status }),
        headers: {
          "Content-Type": "application/json",
        },
      },
      () => {
        !admin
          ? toast.success(
              status === "In progress"
                ? "Task started. Good luck!"
                : "Task finished. Great work!",
            )
          : toast.success("Task updated successfully.");
      },
    );
  };

  if (admin) {
    return (
      <Select onValueChange={(value) => updateStatusOnServer(value)}>
        {isMutating ? (
          <div className="my-2 flex w-full justify-center">
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
          </div>
        ) : (
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
        )}

        <SelectContent>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="In progress">In progress</SelectItem>
          <SelectItem value="Finished">Finished</SelectItem>
        </SelectContent>
      </Select>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="block">
        <Button>{status === "Pending" ? "Start task" : "Finish task"}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Do you want to {status === "Pending" ? "start" : "finish"} the task?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Make sure you double checked if this action is correct.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(update) =>
              updateStatusOnServer(
                status === "Pending" ? "In progress" : "Finished",
              )
            }
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TaskStatusChange;
