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
import { Button } from "../ui/button";
import { toast } from "react-hot-toast";

type TaskStatusChangeProps = {
  taskId: string;
  status: "Pending" | "In progress" | "Finished";
};

const TaskStatusChange = ({ taskId, status }: TaskStatusChangeProps) => {
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
        toast.success(status === "In progress" ? "Task started. Good luck!" : "Task finished. Great work!");
        console.log(status, "status update");
      },
    );
  };

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
